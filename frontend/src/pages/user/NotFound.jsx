import React from 'react'
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-500 mb-4">404 Not Found</h1>
    <p className="text-lg text-gray-900 dark:text-white mb-4">
      The page you're looking for doesn't exist!
    </p>
    <Link
      to="/"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Go to Home
    </Link>
  </div>
  )
}

export default NotFound