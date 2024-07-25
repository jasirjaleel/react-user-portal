import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../Redux/auth/authSlice"; 


function ProtectedRoute({ children }) {
  const token = useSelector(selectCurrentToken);


  // console.log(token);

  // if (token === null) {
  //   return (
  //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
  //       <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-500 mb-4">
  //         Loading...
  //       </h1>
  //     </div>
  //   );
  // }

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
