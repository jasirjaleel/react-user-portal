import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { setCredentials } from "../../Redux/auth/authSlice";
import { ACCESS_TOKEN, updateUserToken } from "../../utils/auth";

const useSessionValidation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const IsSessionValid = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigate("/login");
      return false;
    }

    try {
      const decode = jwtDecode(token);
      const tokenExpiration = decode.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        const newToken = await updateUserToken();
        if (newToken) {
          localStorage.setItem(ACCESS_TOKEN, newToken);
          dispatch(setCredentials({ accessToken: newToken }));
          return true;
        } else {
          navigate("/login");
          return false;
        }
      } else {
        MySwal.fire({
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
          icon: "warning",
          confirmButtonText: "OK",
          customClass: {
            popup: "bg-gray-800 text-gray-100 rounded-lg border border-gray-600", // Dark background, light text, rounded corners, border
            title: "text-lg font-semibold", // Customize title font size and weight
            confirmButton: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" // Customize button appearance
          }
        }).then(() => {
          navigate("/login");
        });
        return false;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
      return false;
    }
  };

  return IsSessionValid;
};

export default useSessionValidation;
