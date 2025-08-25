

// 1. Initial State
export const initialState = {
  userData: {
    username: "",
    name: "",
    groupSelected: "",
    password: "",
    confirm: "",
    agent: 0,
    rank: ""
  },
  errors: {
    password: "",
    confirm: ""
  },
  match: "",
  submit: false
};

// 2. Reducer
export function reducer(state, action) {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: { ...state.userData, ...action.payload }
      };
    case "RESET_PASSWORD":
      return {
        ...state,
        userData: { ...state.userData, password: "", confirm: "" },
        errors: { ...state.errors, password: "", confirm: "كلمة السر غير مطابقة" },
        match: ""
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, ...action.payload }
      };
    case "SET_MATCH":
      return {
        ...state,
        match: action.payload
      };
    case "SET_SUBMIT":
      return {
        ...state,
        submit: action.payload
      };
    default:
      return state;
  }
}

