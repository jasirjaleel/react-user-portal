import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rehydrateState } from "./Redux/auth/authSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./route/ProtectedRoute";
import Logout from "./pages/Logout";
import Navbar from "./components/user/Navbar";
import Dashboard from "./components/user/Dashboard";
import EditForm from "./components/user/EditForm";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateState());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>            
            } />
          <Route path="/edit-profile" element={
            <ProtectedRoute>
              <EditForm />
            </ProtectedRoute>
            } />
      

        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
