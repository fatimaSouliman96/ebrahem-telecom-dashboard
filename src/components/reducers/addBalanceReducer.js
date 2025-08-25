export const initialState = {
  submit: false,
  amount: "",
  amountConf: "",
  cridet: "",
  cridetConf: "",
  note: "",
  userId: "",
  userName: "",
  users: [],
  errors: {
    amount: "",
    amountConf: "",
    cridet: "",
    cridetConf: ""
  },
  match: {
    amount: "",
    cridet: ""
  },
  balance: undefined,
  cridetbalance: undefined,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_SUBMIT":
      return { ...state, submit: action.payload };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_AMOUNT_CONF":
      return { ...state, amountConf: action.payload };
    case "SET_CRIDET":
      return { ...state, cridet: action.payload };
    case "SET_CRIDET_CONF":
      return { ...state, cridetConf: action.payload };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_USER_NAME":
      return { ...state, userName: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: { ...state.errors, ...action.payload } };
    case "SET_MATCH":
      return { ...state, match: { ...state.match, ...action.payload } };
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    case "SET_CRIDET_BALANCE":
      return { ...state, cridetbalance: action.payload };
    case "RESET_FIELDS":
      return {
        ...state,
        amount: "",
        amountConf: "",
        cridet: "",
        cridetConf: "",
        note: "",
        errors: {
          amount: "",
          amountConf: "",
          cridet: "",
          cridetConf: ""
        },
        match: {
          amount: "",
          cridet: ""
        }
      };
    default:
      return state;
  }
}