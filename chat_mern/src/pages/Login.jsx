import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const login = () => {
    try {
      axios.post('http://localhost:8000/api/users/login', {
        name, password
      })
        .then(data => {
          localStorage.setItem('user', JSON.stringify(data.data))
          navigate('/')
        })  
    } catch(e) {
      console.log(e);
    }
  }



  return (
    <div className='login'>
      <div className='login__form'>
        <input type='text' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <input type='text' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button type='button' onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Login;