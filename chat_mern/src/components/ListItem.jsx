import React from 'react';

const ListItem = ({user, changeRoomId}) => {

  return (
    <li className='list__user' onClick={() => changeRoomId(user._id)}>
      <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt='img' />
      {user.name}
      <br />
    </li>
  );
};

export default ListItem;