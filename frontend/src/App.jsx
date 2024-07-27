import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rehydrateState } from "./Redux/auth/authSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./pages/user/NotFound";
import AdminRoutes from "./pages/admin/AdminRoutes";
import UserRoutes from "./pages/user/UserRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateState());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>

        {/* User Route */}
        <Route path="/*" element={<UserRoutes/>}/>

        {/* Admin Routes */}
        <Route path="/admincontrol/*" element={<AdminRoutes/>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
