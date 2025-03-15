import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';

function LoginForm() {
  const [username, setUsername] = useState('Donald@gmail.com');
  const [password, setPassword] = useState('Donald@1234');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   // Handle login logic here
   try {
    const res = await axios.post(BASE_URL + '/login',{
      emailId: username,
      password
    }, { withCredentials: true });
    dispatch(addUser(res.data.user))
    return navigate("/");
   } catch (error) {
    console.log(error);
   }

  };

  return (
    <div className="flex justify-center my-10 ">
      <form onSubmit={handleSubmit} className="w-full max-w-xs p-4 border rounded-lg">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="Enter username"
            className="input input-bordered w-full max-w-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs mt-4">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Enter password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
