import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectCurrentToken, logOut, setCredentials } from '../../Redux/auth/authSlice';
import { uploadImage,getUserDetails } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-4xl font-bold text-blue-700 dark:text-blue-500 mb-4">
          Loading...
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await uploadImage(file, token);
        console.log('File uploaded successfully');

        // Fetch updated user details after file upload
        const response = await getUserDetails(token);
        const { data } = response;


        const cleanData = {
          email:data.email,
          first_name:data.first_name,
          id:data.id,
          last_name:data.last_name,
          phone_number:data.phone_number,
          profile_pic: data.profile.profile_pic
        };
        
        dispatch(setCredentials({ user: cleanData, accessToken: token })); 
      } catch (error) {
        console.error('Error uploading file', error);
      }
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pt-10 pb-10">
          <div
            className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 group cursor-pointer"
            onClick={handleIconClick}
          >
            {user.profile_pic ? (
              <img src={user.profile_pic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
              </span>
            )}
            <i className="fa-solid fa-camera absolute bottom-8.5 right-15 bg-black bg-opacity-50 text-white rounded-full p-1 hidden group-hover:block transition-opacity duration-500 ease-in-out"></i>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.first_name} {user.last_name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.phone_number}
          </span>
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
            <button
              onClick={() => navigate('/edit-profile')}
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
