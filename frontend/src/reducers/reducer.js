const INITIAL_STATE = {
  token: "",
  isAuth: false
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload.token,
        isAuth: true,
        userId: action.payload.id
      };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};