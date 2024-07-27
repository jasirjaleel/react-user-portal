import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const API_URL = import.meta.env.VITE_API_URL;

const fetchisAdmin = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    
    try {
        const res = await axios.get(API_URL + '/user/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('Hihihihihi',res)
        return res.data.is_superuser; // Return directly from the function

    } catch (error) {
        return false;
    }
};



const isAuthAdmin = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accessToken) {
        return { 'name': null, isAuthenticated: false, isAdmin: false };
    }

    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(accessToken);

    if (decoded.exp > currentTime) {
        let checkAdmin = await fetchisAdmin(); // Await the result
        return { 'name': decoded.first_name, isAuthenticated: true, isAdmin: checkAdmin };
    } else {
        const updateSuccess = await updateAdminToken();

        if (updateSuccess) {
            let decoded = jwt_decode(accessToken);
            let checkAdmin = await fetchisAdmin(); // Await the result
            return { 'name': decoded.first_name, isAuthenticated: true, isAdmin: checkAdmin };
        } else {
            return { 'name': null, isAuthenticated: false, isAdmin: false };
        }
    }
};

export default isAuthAdmin;