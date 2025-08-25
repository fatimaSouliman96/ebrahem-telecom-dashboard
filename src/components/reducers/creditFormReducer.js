
export const initialState = {
  submit: false,
  userId: '',
  userName: '',
  amount: '',
  notes: '',
  errors: {
    amount: '',
  },
  creditBalance: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_SUBMIT':
      return { ...state, submit: action.payload };
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload };
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: { ...state.errors, ...action.payload } };
    case 'SET_CREDIT_BALANCE':
      return { ...state, creditBalance: action.payload };
    case 'RESET_FORM':
      return {
        ...state,
        userId: '',
        userName: '',
        amount: '',
        notes: '',
        errors: { amount: '' },
      };
    default:
      return state;
  }
}
