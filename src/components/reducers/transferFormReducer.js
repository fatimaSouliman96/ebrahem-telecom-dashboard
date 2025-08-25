export const initialState = {
  submit: false,
  userId: '',
  userName: '',
  amount: '',
  transferMethod: '',
  transferNum: '',
  notes: '',
  errors: {
    amount: '',
  },
  balance: 0,
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
    case 'SET_TRANSFER_METHOD':
      return { ...state, transferMethod: action.payload };
    case 'SET_TRANSFER_NUM':
      return { ...state, transferNum: action.payload };
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: { ...state.errors, ...action.payload } };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'RESET_FORM':
      return {
        ...state,
        userId: '',
        userName: '',
        amount: '',
        transferMethod: '',
        transferNum: '',
        notes: '',
        errors: { amount: '' },
      };
    default:
      return state;
  }
}
