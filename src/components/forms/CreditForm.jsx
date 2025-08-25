import { useEffect, useReducer } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";;
import { baseUrl } from '../../constants/baseUrl';
import { fetchBalances } from '../../services/getBalances';
import { reducer, initialState } from '../reducers/creditFormReducer'; 

const token = Cookies.get('token');

export default function CreditForm({ users, fetchData }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getBalanses = async () => {
    const res = await fetchBalances();
    dispatch({ type: 'SET_CREDIT_BALANCE', payload: res.credit_balance });
  };

  useEffect(() => {
    getBalanses();
  }, []);

  const handleChangeUser = (e) => {
    const options = Array.from(e.target.options || []);
    options.forEach((o) => {
      if (o.selected === true) {
        dispatch({ type: 'SET_USER_NAME', payload: o.text });
      }
    });
    dispatch({ type: 'SET_USER_ID', payload: e.target.value });
  };

  const handleChangeAmount = (e) => {
    const val = e.target.value;
    if (val > 0) {
      dispatch({ type: 'SET_AMOUNT', payload: val });

      if (parseInt(val) > parseInt(state.creditBalance)) {
        dispatch({
          type: 'SET_ERRORS',
          payload: { amount: `لا يوجد  رصيد كافي رصيدك  ${state.creditBalance}` },
        });
      } else {
        dispatch({ type: 'SET_ERRORS', payload: { amount: '' } });
      }
    } else {
      dispatch({ type: 'SET_AMOUNT', payload: '' });
    }
  };

  const handleChangeNotes = (e) => {
    dispatch({ type: 'SET_NOTES', payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.errors.amount !== '') {
      toast.error('يرجى تصحيح الخطأ قبل الإرسال');
      return;
    }

    dispatch({ type: 'SET_SUBMIT', payload: true });

    try {
      await axios.post(
        `${baseUrl}add_payment_creditBalance`,
        {
          customer_id: state.userId,
          amount: state.amount,
          notes: state.notes,
          customer_name: state.userName,
          order_type: 'retail',
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBalances();
      toast.success('تمت اضافة الرصيد بنجاح');
      getBalanses();
      fetchData();
      dispatch({ type: 'RESET_FORM' });
    } catch (e) {
      toast.error('فشل في الإرسال');
    } finally {
      dispatch({ type: 'SET_SUBMIT', payload: false });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col w-full ">
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="point" className="text-xs font-medium">
            نقطة البيع <span className="text-red-600">*</span>
          </label>
          <select
            required
            name="point"
            id="point"
            value={state.userId}
            onChange={handleChangeUser}
            className="selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          >
            <option></option>
            {users?.map((ele) => (
              <option value={ele.id} key={ele.id}>
                {ele.username}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="amount" className="text-xs font-medium">
            المبلغ <span className="text-red-600">*</span>
          </label>
          <input
            required
            type="text"
            name="amount"
            value={state.amount}
            placeholder={state.creditBalance}
            onChange={handleChangeAmount}
            id="amount"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
          {state.errors.amount !== '' && <p className="text-red-600">{state.errors.amount}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <label htmlFor="notes" className="text-xs font-medium">ملاحظات</label>
        <input
          type="text"
          name="notes"
          value={state.notes}
          onChange={handleChangeNotes}
          id="notes"
          className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
        />
      </div>

      <button
        type="submit"
        style={{ width: '274px', height: '44px' }}
        className="bg-main-color text-white rounded-lg flex-center main-button"
      >
        أرسل الأن
      </button>

      <div
        className={clsx(
          'w-full h-full flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
          { hidden: !state.submit }
        )}
      >
        <CircularProgress />
      </div>
    </form>
  );
}
