import { useEffect, useReducer } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import CircularProgress from "@mui/material/CircularProgress";;
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseUrl } from '../../constants/baseUrl';
import { fetchBalances } from '../../services/getBalances';
import { initialState, reducer } from '../reducers/transferFormReducer';


export default function TransferForm({ users, fetchData }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getBalanses = async () => {
    const res = await fetchBalances();
    dispatch({ type: 'SET_BALANCE', payload: res.main_balance });
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
    const newAmount = parseFloat(e.target.value);
    dispatch({ type: 'SET_AMOUNT', payload: newAmount });

    if (newAmount === 0) {
      dispatch({ type: 'SET_ERRORS', payload: { amount: 'يجب ان يكون المبلغ اكبر من 0' } });
    } else if (newAmount > state.balance) {
      dispatch({
        type: 'SET_ERRORS',
        payload: { amount: `لا يوجد  رصيد كافي رصيدك  ${state.balance}` },
      });
    } else {
      dispatch({ type: 'SET_ERRORS', payload: { amount: '' } });
    }
  };

  const handleChangeTransferMethod = (e) => {
    dispatch({ type: 'SET_TRANSFER_METHOD', payload: e.target.value });
  };

  const handleChangeTransferNum = (e) => {
    if (e.target.value > 0) {
      dispatch({ type: 'SET_TRANSFER_NUM', payload: e.target.value });
    }
  };

  const handleChangeNotes = (e) => {
    dispatch({ type: 'SET_NOTES', payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.errors.amount) {
      toast.error("يوجد خطأ في المدخلات، يرجى التحقق قبل الإرسال.");
      return;
    }

    dispatch({ type: 'SET_SUBMIT', payload: true });

    try {
      await axios.post(
        `${baseUrl}add_payment`,
        {
          customer_id: state.userId,
          amount: state.amount.toString(),
          transfer_method: state.transferMethod,
          transfer_number: state.transferNum,
          notes: state.notes,
          customer_name: state.userName,
          order_type: "retail",
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );

      toast.success("تمت  العملية بنجاح");
      fetchBalances();
      fetchData();
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      toast.error("فشلت العملية");
    } finally {
      dispatch({ type: 'SET_SUBMIT', payload: false });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="point" className="text-xs font-medium">
            نقطة البيع <span className="text-red-600">*</span>
          </label>
          <select
            required
            name="point"
            id="point"
            value={state.userId}
            onChange={handleChangeUser}
            className="cursor-pointer selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          >
            <option className="text-gray-400">اختر نقطة بيع</option>
            {users ? (
              users.map((ele) => (
                <option value={ele.id} key={ele.id}>
                  {ele.username}
                </option>
              ))
            ) : (
              <option>
                <CircularProgress /> يتم تحميل نقاط البيع
              </option>
            )}
          </select>
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="amount" className="text-xs font-medium">
            المبلغ <span className="text-red-600">*</span>
          </label>
          <input
            required
            type="number"
            name="amount"
            value={state.amount}
            placeholder={state.balance}
            onChange={handleChangeAmount}
            id="amount"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
          {state.errors.amount !== "" && <p className="text-red-600">{state.errors.amount}</p>}
        </div>
      </div>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="way" className="text-xs font-medium">
            طريقة التحويل <span className="text-red-600">*</span>
          </label>
          <input
            required
            type="text"
            name="way"
            id="way"
            value={state.transferMethod}
            onChange={handleChangeTransferMethod}
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="number" className="text-xs font-medium">
            رقم الحوالة <span className="text-red-600">*</span>
          </label>
          <input
            required
            type="number"
            name="number"
            id="number"
            value={state.transferNum}
            onChange={handleChangeTransferNum}
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
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
        style={{ width: "274px", height: "44px" }}
        className={`bg-main-color text-white rounded-lg flex-center main-button`}
      >
        أرسل الأن
      </button>
      <div
        className={clsx(
          'w-full h-full flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
          {
            hidden: !state.submit,
          }
        )}
      >
        <CircularProgress />
      </div>
    </form>
  );
}
