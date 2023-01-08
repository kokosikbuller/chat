import mongoose from 'mongoose';

const Message = new mongoose.Schema({
	user: { type: String, required: true },
	roomId: { type: Array },
	// sender: { type: String, required: true },
	// recipient: { type: String, required: true },
	dialog: [
		{
			user: { type: String, required: true },
			message: { type: String, required: true },
		},
	],
});

export default mongoose.model('Message', Message);
