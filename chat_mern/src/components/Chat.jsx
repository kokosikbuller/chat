import React from 'react';
import { useState } from 'react';
import Message from './Message';

const Chat = ({ addMessage, messages }) => {
	const [value, setValue] = useState('');

	return (
		<div className='chat__wrapper'>
			<div className='chat__message'>
				{messages.length >= 1 &&
					messages[0].dialog.map((item) => (
						<Message key={item._id} message={item} />
					))}
			</div>
			<div className='chat__form'>
				<input onChange={(e) => setValue(e.target.value)} type='text' />
				<button
					onClick={() => {
						addMessage(value);
						setValue('');
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
