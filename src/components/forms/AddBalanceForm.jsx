import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { baseUrl } from '../../constants/baseUrl';
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { fetchBalances } from "../../services/getBalances";
import { initialState, reducer } from "../reducers/addBalanceReducer";

const token = Cookies.get('token');



export default function AddBalanceForm({ fetchData }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}getEmployees`, {
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "SET_USERS", payload: res.data });
    } catch {
      toast.error("Faild to load data");
    }
  };


  const getBalances = async () => {
    const res = await fetchBalances();
    dispatch({ type: "SET_BALANCE", payload: res.main_balance });
    dispatch({ type: "SET_CRIDET_BALANCE", payload: res.creditBalance });
  };

  useEffect(() => {
    getBalances();
    fetchUsers();
  }, []);

  const handleChangeUser = (e) => {
    const options = Array.from(e.target.options || []);
    options.forEach((o) => {
      if (o.selected === true) {
        dispatch({ type: "SET_USER_NAME", payload: o.text });
      }
    });
    dispatch({ type: "SET_USER_ID", payload: e.target.value });
  };

  const handleChangeAmount = (e) => {
    const value = e.target.value;
  
      if (value > state.balance) {
        dispatch({ type: "SET_ERRORS", payload: { amount: `لا يوجد رصيد كافي رصيدك ${state.balance}` } });
        dispatch({ type: "SET_AMOUNT", payload: "" });
      } else {
        dispatch({ type: "SET_ERRORS", payload: { amount: "" } });
        dispatch({ type: "SET_AMOUNT", payload: value });
      }

  };

  const handleChangeAmountConf = (e) => {
    const value = e.target.value;
    dispatch({ type: "SET_AMOUNT_CONF", payload: value });
    if (value > 0) {
      if (value !== state.amount) {
        dispatch({ type: "SET_ERRORS", payload: { amountConf: "غير مطابق" } });
        dispatch({ type: "SET_MATCH", payload: { amount: "" } });
      } else {
        dispatch({ type: "SET_ERRORS", payload: { amountConf: "" } });
        dispatch({ type: "SET_MATCH", payload: { amount: "مطابق" } });
      }
    } else {
      dispatch({ type: "SET_AMOUNT_CONF", payload: "" });
    }
  };

  const handleChangeCridet = (e) => {
    const value = e.target.value;
   
      if (value > state.cridetbalance) {
        dispatch({ type: "SET_ERRORS", payload: { cridet: `لا يوجد رصيد كافي رصيدك ${state.cridetbalance}` } });
        dispatch({ type: "SET_CRIDET", payload: "" });
      } else {
        dispatch({ type: "SET_ERRORS", payload: { cridet: "" } });
        dispatch({ type: "SET_CRIDET", payload: value });
      }
 
  };

  const handleChangeCridetConf = (e) => {
    const value = e.target.value;
    dispatch({ type: "SET_CRIDET_CONF", payload: value });
    if (value > 0) {
      if (value !== state.cridet) {
        dispatch({ type: "SET_ERRORS", payload: { cridetConf: "غير مطابق" } });
        dispatch({ type: "SET_MATCH", payload: { cridet: "" } });
      } else {
        dispatch({ type: "SET_ERRORS", payload: { cridetConf: "" } });
        dispatch({ type: "SET_MATCH", payload: { cridet: "مطابق" } });
      }
    } else {
      dispatch({ type: "SET_CRIDET_CONF", payload: "" });
    }
  };

  const handleChangeNote = (e) => {
    dispatch({ type: "SET_NOTE", payload: e.target.value });
  };

// handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAmountValid = state.amount && state.amountConf && state.amount === state.amountConf;
    const isCridetValid = state.cridet && state.cridetConf && state.cridet === state.cridetConf;

    if (!state.amount && !state.amountConf && !state.cridet && !state.cridetConf && !state.note) {
      toast.error("يرجى تعبئة أحد الحقول على الأقل");
      return;
    }

    if (!isAmountValid && !isCridetValid) {
      toast.error("يرجى إدخال الرصيد وتأكيده أو الرصيد الائتماني وتأكيده بشكل صحيح");
      return;
    }

    if (
      state.errors.amount || state.errors.amountConf ||
      state.errors.cridet || state.errors.cridetConf
    ) {
      toast.error("يرجى تصحيح الأخطاء قبل الإرسال");
      return;
    }

    dispatch({ type: "SET_SUBMIT", payload: true });

    try {
      await axios.post(`${baseUrl}add_public_balance`, {
        amount: state.amount,
        confirm_amount: state.amountConf,
        creditAmount: state.cridet,
        confirm_creditAmount: state.cridetConf,
        notes: state.note,
        user_id: state.userId,
      }, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("تمت اضافة الرصيد بنجاح");
      fetchData(0);
      getBalances();

      // reset fields
      dispatch({ type: "RESET_FIELDS" });
    } catch (e) {
      toast.error("فشلت العملية");
    } finally {
      dispatch({ type: "SET_SUBMIT", payload: false });
    }
  }


  // ////////////////////////////
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="point" className="text-xs font-medium">
             الموظف
            <span className="text-red-600">*</span>
          </label>
          <select
            required
            name="point"
            id="point"
            value={state.userId}
            onChange={handleChangeUser}
            className="cursor-pointer selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          >
            <option className='text-gray-400' >اختر  موظف</option>
            {
              state.users.length > 0 ?
                state.users.map(ele => (
                  <option value={ele.id} key={ele.id}>{ele.name}</option>
                ))
                :
                <option><CircularProgress /> يتم تحميل نقاط البيع</option>
            }
          </select>
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="point" className="text-xs font-medium">كمية الرصيد  
          </label>
          <input
            
            type="number"
            name="point"
            id="point"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            value={state.amount}
            onChange={handleChangeAmount}
            placeholder={state.balance}
          />
          {state.errors.amount && <p className="text-red-500 text-base">{state.errors.amount}</p>}
        </div>

        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="ammount" className="text-xs font-medium">تأكيد كمية الرصيد 
          </label>
          <input
            
            type="number"
            name="ammount"
            id="ammount"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            value={state.amountConf}
            onChange={handleChangeAmountConf}
            placeholder={state.balance}
          />
          {state.errors.amountConf && <p className="text-red-600">{state.errors.amountConf}</p>}
          {state.match.amount && <p className="text-green-600">{state.match.amount}</p>}
        </div>
      </div>

      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="cridet" className="text-xs font-medium">رصيد ائتماني 
          </label>
          <input
            
            type="number"
            name="cridet"
            id="cridet"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            value={state.cridet}
            onChange={handleChangeCridet}
            placeholder={state.cridetbalance}
          />
          {state.errors.cridet && <p className="text-red-500 text-base">{state.errors.cridet}</p>}
        </div>

        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="cridetConf" className="text-xs font-medium">تأكيد رصيد ائتماني 
          </label>
          <input
            
            type="number"
            name="cridetConf"
            id="cridetConf"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            value={state.cridetConf}
            onChange={handleChangeCridetConf}
            placeholder={state.cridetbalance}
          />
          {state.errors.cridetConf && <p className="text-red-600">{state.errors.cridetConf}</p>}
          {state.match.cridet && <p className="text-green-600">{state.match.cridet}</p>}
        </div>

        <div className="flex flex-col gap-3 w-1/2">
          <label htmlFor="note" className="text-xs font-medium">ملاحظات</label>
          <input
            type="text"
            id="note"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            value={state.note}
            onChange={handleChangeNote}
            placeholder="ملاحظات"
          />
        </div>
      </div>

      <button
        disabled={state.submit}
        type="submit"
        className="bg-main-color w-1/4 text-white rounded-xl py-4 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submit ? <CircularProgress size={25} /> : "اضافة"}
      </button>
    </form>
  );
}


