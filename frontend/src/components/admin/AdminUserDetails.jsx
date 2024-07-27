import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, deleteUser} from '../../utils/adminApi'; 
import { uploadImage } from '../../utils/api';
import { selectCurrentToken } from '../../Redux/auth/authSlice';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AdminUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserById(id, token);
        console.log(response.data)
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id, token);
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        navigate('/admincontrol');
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete user.', 'error');
        setError('Failed to delete user');
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const uploadResponse = await uploadImage(file, token);
        const profilePicUrl = uploadResponse.data.url; // Adjust based on your API response

        // Update user profile with new image URL
        const updatedUser = {
          ...user,
          profile: {
            ...user.profile,
            profile_pic: profilePicUrl
          }
        };
        setUser(updatedUser); // Update local state

        // Optionally, update user details on server
        // await updateUser(id, updatedUser, token);

      } catch (error) {
        console.error('Error uploading file', error);
        setError('Failed to upload image');
      }
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pt-10 pb-10">
          <div
            className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 group cursor-pointer"
            onClick={handleIconClick}
          >
            {user?.profile?.profile_pic ? (
              <img src={user.profile.profile_pic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
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
            {user?.first_name} {user?.last_name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user?.phone_number}
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Email: {user?.email}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Status: {user?.is_active ? 'Active' : 'Inactive'}
          </p>
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
            </button>
            <button
              onClick={() => navigate(`/admincontrol/user/update/${id}`)}
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Edit
            </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;
