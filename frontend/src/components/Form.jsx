import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";
  
  const isEmailValid = (email) => {
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleValidation = () => {
    let valid = true;

    setErrorMessage('');  
    
    if (!username.trim()) {
      setErrorMessage('Username is required');
      valid = false;
      return valid;
    }
  
    if (method !== "login") {
      if (!email.trim()) {
        setErrorMessage("Email is required");
        valid = false;
        return valid;
      } else if (!isEmailValid(email)) {
        setErrorMessage("Invalid email format");
        valid = false;
        return valid;
      }
    }

    if (!password.trim()) {
      setErrorMessage('Password is required');
      valid = false;
      return valid;
    }
  
    if (method !== 'login') {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        valid = false;
        return valid;
      }
      if (!phone.trim()) {
        setErrorMessage("Phone number cannot be null");
        valid = false;
        return valid;
      } else if (!/^\d+$/.test(phone)) {
        setErrorMessage("Phone number must contain only numbers");
        valid = false;
        return valid;
      } else if (phone.length !== 10) {
        setErrorMessage("Phone number must be 10 digits");
        valid = false;
        return valid;
      }    
    }
  
    return valid;
  };
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    
  if (handleValidation()){

    let data;
    if (method === "login") {
      data = { username, password };
    } else {
      data = {
        username,
        password,
        email,
        phone,
      };
    }

    try {
      console.log(`Submitting to ${route} with data: ${data}`);
      const res = await api.post(route, data);
      console.log("Response:", res);
      if (method === "login") {
        console.log("Login response data:", res.data);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage('Username or password is incorrect');
     
    } finally {
      setLoading(false);
    }
  }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form class="max-w-md min-w-80 mx-auto" onSubmit={handleSubmit}>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_username"
            value={username}
            onChange={(e) => {setUsername(e.target.value);handleValidation();}}
            id="floating_username"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
       {method !== "login" && <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_email"
            value={email}
            onChange={(e) => {setEmail(e.target.value);handleValidation();}}
            id="floating_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>}
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);handleValidation();}}
            id="floating_password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        
        </div>
        {method !== "login" && <>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="repeat_password"
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value);handleValidation();}}
            id="floating_repeat_password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            
          />
          <label
            for="floating_repeat_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {setPhone(e.target.value);handleValidation();}}
              name="floating_phone"
              id="floating_phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
          </div>
        </div>
        </>}
        <div className="flex flex-col  mt-3">
        {errorMessage && (
          <span className="text-red-500 text-xs text-left">{errorMessage}</span>
        )}
        <button
          type="submit"
          class="text-white items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-3 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {name}
        </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
