import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/api';

const AdminLoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email.trim()) {
      setErrorMessage('Email is required');
      return;
    }
  
    if (!password.trim()) {
      setErrorMessage('Password is required');
      return;
    }
  
    // Clear any previous error message
    setErrorMessage('');
  
    try {
      // Dispatch the login action
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        alert('ashdkf')
        // const { user } = resultAction.payload;
        // console.log('Login Succeeded:', resultAction.payload); 
        navigate('/admincontrol');
        // if (user) {
        //   navigate('/admincontrol');
        // } else {
        //   setErrorMessage('Access denied. Not an admin.');
        // }
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
        console.log('Error logging in:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="max-w-md w-full" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {errorMessage && (
          <span className="text-red-500 text-xs">{errorMessage}</span>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginComponent;