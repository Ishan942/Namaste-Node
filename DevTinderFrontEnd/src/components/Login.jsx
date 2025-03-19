import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

function LoginForm() {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: 'Ishan@gmail.com',
    password: 'Ishan@1234',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // Signup API call
        const res = await axios.post(BASE_URL + '/signUp', formData, { withCredentials: true });
        dispatch(addUser(res.data.user));
      } else {
        // Login API call
        const res = await axios.post(BASE_URL + '/login', {
          emailId: formData.emailId,
          password: formData.password
        }, { withCredentials: true });
        dispatch(addUser(res.data.user));
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center my-5">
      <form onSubmit={handleSubmit} className="w-full max-w-xs p-4 border rounded-lg">
        <h2 className="text-center text-xl font-semibold mb-4">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>

        {isSignup && (
          <>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                className="input input-bordered w-full max-w-xs"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control w-full max-w-xs mt-4">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                className="input input-bordered w-full max-w-xs"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}

        <label className="form-control w-full max-w-xs mt-4">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            name="emailId"
            placeholder="Enter Email"
            className="input input-bordered w-full max-w-xs"
            value={formData.emailId}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-control w-full max-w-xs mt-4">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="input input-bordered w-full max-w-xs"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <div className="mt-6">
          <button type="submit" className="btn btn-primary w-full">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </div>

        <p className="text-center mt-4 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="text-blue-600 hover:underline ml-1"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
