import { jwtDecode } from "jwt-decode";
import { refreshToken as refreshTokenApi } from "./api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { setCredentials } from '../Redux/auth/authSlice';
import { useDispatch } from 'react-redux';



// Function to refresh access token
const updateUserToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  try {
    const res = await refreshTokenApi(refreshToken);
    if (res.status === 200) {
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      return {'user': res.data.user,isAuthenticated:true}
    } else {
      return {'user': null,isAuthenticated:false}
    }
  } catch (error) {
    console.log(error);
    return {'name':null,isAuthenticated:false}
  }
};


const IsAuthUser = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) {
    return {'user':null,isAuthenticated:false}
  }

  try {
    const decode = jwtDecode(token);
    const tokenExpiration = decode.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      return await updateUserToken();
    } else {
      return {'user':decode,isAuthenticated:true}
    }
  } catch (error) {
    console.log(error);
    return {'user':null,isAuthenticated:false}
  }
};
export { IsAuthUser, updateUserToken };
