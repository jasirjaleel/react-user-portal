import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from '../../route/ProtectedRoute';
import Home from './Home';
import Dashboard from '../../components/user/Dashboard';
import EditForm from '../../components/user/EditForm';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import Logout from './Logout';
import Navbar from '../../components/user/Navbar';
import NotFound from './NotFound';

function UserRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path=""
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit-profile"
          element={
            <ProtectedRoute>
              <EditForm />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default UserRoutes