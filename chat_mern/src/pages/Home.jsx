import React from 'react';
import Chat from '../components/Chat';
import ListItem from '../components/ListItem';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { notifyMe, settingsNotification } from '../utils';

let socket = null;

const Home = () => {
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const [isVisible, setIsVisible] = useState(true);
	const [roomId, setRoomID] = useState('main');
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		window.onblur = () => setIsVisible(false);
		window.onfocus = () => setIsVisible(true);
	});

	useEffect(() => {
		localStorage.setItem('isVisible', isVisible);
	}, [isVisible]);

	useEffect(() => {
		axios.get('http://localhost:8000/api/users').then(({ data }) => {
			const usersFultered = data.filter(({ name }) => name !== user.name);
			setUsers(usersFultered);
		});
		settingsNotification();
	}, []);

	useEffect(() => {
		socket = io('http://localhost:8000/', {
			query: {
				roomId,
				userCurrentId: user._id,
				userName: user.name,
			},
		});
		// socket.on('connect', () => {
		// 	console.log(socket.id);
		// });

		socket.emit('message:get');

		socket.on('update', (msg) => {
			if (localStorage.getItem('isVisible') === 'false') {
				const lastMsg = msg[0].dialog.slice(-1);
				notifyMe(lastMsg[0].message);
			}
			setMessages(msg);
		});
	}, [roomId]);

	const addMessage = (msg) => {
		const stripHtml = (str) =>
			new DOMParser().parseFromString(str, 'text/html').body.textContent || '';
		socket.emit('message:add', {
			user: user.name,
			userId: user._id,
			msg: stripHtml(msg),
		});
	};

	const changeRoomId = (id) => {
		if (id === roomId) {
			return;
		}
		setMessages([]);
		setRoomID(id);
	};

	return (
		<div className='App'>
			<div className='header'>
				<h1>Telegav</h1>
				<div>{user?.name}</div>
			</div>
			<main className='main'>
				<div className='list__users'>
					<ul className='list__users-wrapper'>
						{users?.map((user) => (
							<ListItem
								key={user._id}
								user={user}
								changeRoomId={changeRoomId}
							/>
						))}
					</ul>
				</div>
				<div className='chat'>
					<Chat addMessage={addMessage} messages={messages} user={user.name} />
				</div>
			</main>
		</div>
	);
};

export default Home;
