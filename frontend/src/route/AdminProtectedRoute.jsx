import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuthAdmin from '../utils/IsAdminAuth';

function AdminPrivateRoute({ children }) {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    isAdmin: false,
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authInfo = await isAuthAdmin();
        console.log('Auth Info:', authInfo);
        setAuthStatus({
          isAuthenticated: authInfo.isAuthenticated,
          isAdmin: authInfo.isAdmin,
        });
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching auth info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!authStatus.isAuthenticated || !authStatus.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminPrivateRoute;
