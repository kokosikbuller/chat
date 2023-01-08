import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import de from 'dotenv';
import mongoose from 'mongoose';
import router from './router.js';
import Message from './model/Message.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://127.0.0.1:5173',
	},
});

const PORT = process.env.PORT || 8000;

de.config();
app.use(express.json());
app.use(
	cors({
		origin: process.env.CORS,
	})
);
app.use('/api', router);

const messages = {};

io.on('connection', (socket) => {
	const { roomId, userCurrentId, userName } = socket.handshake.query;

	socket.roomId = roomId;
	socket.userName = userName;
	let test = null;

	socket.on('message:get', async () => {
		try {
			const BD_messages = await Message.find({
				roomId: { $all: [roomId, userCurrentId] },
			});
			messages[BD_messages[0]._id] = BD_messages;
			test = BD_messages[0]._id.toString();
			socket.join(test);

			io.to(test).emit('update', messages[BD_messages[0]._id]);
			console.log(messages);
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('message:add', (msg) => {
		if (!messages[test]) {
			const schemaMeg = {
				user: msg.user,
				roomId: [roomId, msg.userId],
				dialog: [{ user: msg.user, message: msg.msg }],
			};

			Message.create(schemaMeg)
				.then((data) => {
					messages[data._id] = [data];
					test = data._id.toString();
					socket.join(test);
					io.to(test).emit('update', messages[test]);
				})
				.catch((e) => console.log(e));
		} else {
			Message.updateOne(
				{ roomId: { $all: [roomId, userCurrentId] } },
				{ $push: { dialog: { user: msg.user, message: msg.msg } } }
			).catch((e) => console.log(e));

			messages[test][0].dialog.push({
				user: msg.user,
				message: msg.msg,
			});

			io.to(test).emit('update', messages[test]);
		}
	});
});

function start() {
	try {
		mongoose.set('strictQuery', true);
		mongoose
			.connect(process.env.DB, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
			})
			.then(() => console.log('DB connected'));

		server.listen(PORT, () => {
			console.log(`listening on ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
}

start();
