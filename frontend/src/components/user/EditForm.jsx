import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentUser,
  selectCurrentToken,
  setCredentials,
} from "../../Redux/auth/authSlice";
import { updateUserDetails, refreshToken } from "../../utils/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants"; // Adjust the import as needed

const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success messages

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleValidation = () => {
    const { first_name, last_name, email, phone_number } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!first_name.trim()) {
      setErrorMessage("First name is required");
      valid = false;
    } else if (!last_name.trim()) {
      setErrorMessage("Last name is required");
      valid = false;
    } else if (!email.trim()) {
      setErrorMessage("Email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      valid = false;
    } else if (!phone_number.trim()) {
      setErrorMessage("Phone number is required");
      valid = false;
    } else if (!/^\d+$/.test(phone_number)) {
      setErrorMessage("Phone number must contain only numbers");
      valid = false;
    } else if (phone_number.length !== 10) {
      setErrorMessage("Phone number must be 10 digits");
      valid = false;
    } else {
      setErrorMessage(""); // Clear any previous error messages
    }

    return valid;
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (handleValidation()) {
//       try {
//         const formDataToSend = new FormData();
//         formDataToSend.append("first_name", formData.first_name);
//         formDataToSend.append("last_name", formData.last_name);
//         formDataToSend.append("email", formData.email);
//         formDataToSend.append("phone_number", formData.phone_number);
//         if (profilePicture) {
//           formDataToSend.append("profile.profile_pic", profilePicture); // Ensure this matches the backend expectation
//         }

//         let updatedToken = token;
//         if (!updatedToken) {
//           // Check if the token is still valid; if not, refresh it
//           const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//           if (refreshToken) {
//             const newTokens = await refreshAccessToken(refreshToken);
//             if (newTokens) {
//               localStorage.setItem(ACCESS_TOKEN, newTokens.accessToken);
//               localStorage.setItem(REFRESH_TOKEN, newTokens.refreshToken); // Update refresh token if needed
//               updatedToken = newTokens.accessToken;
//               dispatch(setCredentials({ accessToken: updatedToken }));
//             } else {
//               navigate("/login");
//               return;
//             }
//           } else {
//             navigate("/login");
//             return;
//           }
//         }

//         const response = await updateUserDetails(formDataToSend, updatedToken);
//         if (response.status === 200) {
//           dispatch(
//             setCredentials({ user: response.data, accessToken: updatedToken })
//           );
//           setSuccessMessage("Update successful!"); // Set success message
//           setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
//         }
//       } catch (error) {
//         console.error("Update failed:", error.response?.data || error.message);
//         setErrorMessage("Update failed. Please try again.");
//       }
//     }
//   };
const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (handleValidation()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("first_name", formData.first_name);
        formDataToSend.append("last_name", formData.last_name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone_number", formData.phone_number);
        if (profilePicture) {
          formDataToSend.append("profile.profile_pic", profilePicture); // Ensure this matches the backend expectation
        }

        const updatedToken = localStorage.getItem(ACCESS_TOKEN); // Get the updated token
        const response = await updateUserDetails(formDataToSend, updatedToken);
        if (response.status === 200) {
          dispatch(setCredentials({ user: response.data, accessToken: updatedToken }));
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("Update failed:", error.response?.data || error.message);
        setErrorMessage("Update failed. Please try again.");
      }
    }
  };
  


  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="max-w-md min-w-80 mx-auto" onSubmit={handleSubmit}>
        {/* Profile Picture */}
        {/* <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="profile_picture"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 dark:text-gray-400 mb-2"
          >
            Profile Picture
          </label>
          <div className="relative w-24 h-24 mb-5 mx-auto">
          {user.profile_pic ? (
              <img src={user.profile_pic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
              </span>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <label htmlFor="profile_picture" className="cursor-pointer">
                <i className="fas fa-camera text-white"></i>
              </label>
              <input
                type="file"
                id="profile_picture"
                name="profile_picture"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div> */}
        {/* First Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First Name
          </label>
        </div>
        {/* Last Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last Name
          </label>
        </div>
        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {/* Phone Number */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone Number
          </label>
        </div>

        {/* Error and Success Messages */}
        {errorMessage && (
          <span className="text-red-500 text-xs text-left">{errorMessage}</span>
        )}
        {successMessage && (
          <span className="text-green-500 text-xs text-left">
            {successMessage}
          </span>
        )}

        <button
          type="submit"
          className="text-white items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-3 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditForm;
