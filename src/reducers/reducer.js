const INITIAL_STATE = {
  token: "",
  isAuth: false
};

export const LOGIN = "LOGIN";

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload,
        isAuth: true
      };
    default:
      return state;
  }
};
