import { LOGIN, LOGOUT } from "./actionTypes";
import { toast } from "react-toastify";

export const logIn = (token, id) => dispatch => {
  dispatch({ type: LOGIN, payload: { token, id } });
  toast.success("You sign successfully !", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

export const logOut = () => dispatch => {
  dispatch({ type: LOGOUT });
  toast.error("Successful logged out !", {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};
