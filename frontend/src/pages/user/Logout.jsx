import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/auth/authSlice';
import { Navigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    localStorage.clear();
    dispatch(logOut());
  }, [dispatch]);

  return <Navigate to="/login" />;
}

export default Logout;
