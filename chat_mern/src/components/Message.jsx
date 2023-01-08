import React from 'react';

const Message = ({message}) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className={message.user === user.name ? 'message__active' : ''}>
      <div className='message'>{message.message}</div>
    </div>
  );
};

export default Message;