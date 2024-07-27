import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from '../../components/admin/AdminDashboard';
import NotFound from '../user/NotFound';
import AdminPrivateRoute from '../../route/AdminProtectedRoute';
import AdminLogin from '../../components/admin/AdminLogin';
import AdminUserDetails from '../../components/admin/AdminUserDetails';
import AdminUserUpdate from '../../components/admin/AdminUpdateUser';

function AdminRoutes() {
  return (
    <Routes>
       <Route path='' element={
        <AdminPrivateRoute>
          <AdminDashboard/>
        </AdminPrivateRoute>
        } ></Route>
        <Route path="/user/:id" element={
          <AdminPrivateRoute>
            <AdminUserDetails/>
          </AdminPrivateRoute>
      } />
      <Route path="/user/update/:id" element={
        <AdminPrivateRoute>
          <AdminUserUpdate />
        </AdminPrivateRoute>
        } />
        <Route path='/login' element={<AdminLogin/>}/>
        <Route path="*" element={<NotFound />} />
    </Routes>
        
  )
}

export default AdminRoutes