import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { useReducer } from "react";
import MainButton from "../elements/MainButton";
import useClipboard from "../../hooks/useClipboard";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import toast from "react-hot-toast";
import clsx from "clsx";
import { rolles } from "../../constants/data";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";
import { initialState, reducer } from "../reducers/addUserReducer";

const token = Cookies.get("token");


export default function AddUserModal({
  handleClose,
  rollesName,
  fetchData,
  agents,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { copySuccess, copyToClipboard, setCopySuccess } = useClipboard();

  const { userData, errors, match, submit } = state;

  const handleChangePassword = (e) => {
    const password = e.target.value;
    dispatch({
      type: "SET_USER_DATA",
      payload: { password, confirm: "" },
    });
    dispatch({
      type: "SET_ERRORS",
      payload: { confirm: "كلمة السر غير مطابقة" },
    });
    dispatch({ type: "SET_MATCH", payload: "" });

    if (password.length < 8) {
      dispatch({
        type: "SET_ERRORS",
        payload: {
          password: "يجب ان تكون كلمة السر مكونة على الاقل من 8 احرف",
        },
      });
    } else {
      dispatch({ type: "SET_ERRORS", payload: { password: "" } });
    }
  };

  const handleChangeConfirm = (e) => {
    const confirm = e.target.value;
    dispatch({
      type: "SET_USER_DATA",
      payload: { confirm },
    });

    if (confirm !== userData.password) {
      dispatch({
        type: "SET_ERRORS",
        payload: { confirm: "كلمة السر غير مطابقة" },
      });
      dispatch({ type: "SET_MATCH", payload: "" });
    } else {
      dispatch({ type: "SET_ERRORS", payload: { confirm: "" } });
      dispatch({ type: "SET_MATCH", payload: "مطابقة" });
    }
  };

  const handleChangeAgent = (e) => {
    dispatch({
      type: "SET_USER_DATA",
      payload: { agent: e.target.value },
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (
      !userData.username.trim() ||
      !userData.name.trim() ||
      !userData.groupSelected.trim() ||
      !userData.password ||
      !userData.confirm
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (errors.password || errors.confirm) {
      toast.error("تأكد من صحة كلمة المرور والتأكيد");
      return;
    }

    dispatch({ type: "SET_SUBMIT", payload: true });

    try {
      await axios.request({
        url: `${baseUrl}users`,
        method: "post",
        data: {
          name: userData.name,
          username: userData.username,
          password: userData.password,
          password_confirmation: userData.confirm,
          roleName: userData.groupSelected,
          agent_id: userData.agent,
          rank: userData.rank,
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("تمت اضافة المستخدم بنجاح");
      fetchData(0);
      handleClose();
    } catch (error) {
      toast.error("حدث خطأ أثناء الإضافة");
    } finally {
      dispatch({ type: "SET_SUBMIT", payload: false });
    }
  };

  return (
    <>
      <div className="w-[859px] m-auto rounded-2xl bg-white">
        <div className="flex items-center justify-between">
          <CloseRoundedIcon
            onClick={() => handleClose()}
            className="cursor-pointer"
          />
          <h3 className="text-xl font-semibold text-black">إضافة مستخدم</h3>
        </div>
        <form className="rtl mt-4 flex flex-col gap-2" onSubmit={handleAddUser}>
          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col gap-3 w-1/2">
              <label htmlFor="username" className="text-xs font-medium">
                اسم المستخدم<span className="text-red-600">*</span>
              </label>
              <input
                required
                type="text"
                name="username"
                id="username"
                value={userData.username}
                onChange={(e) =>
                  dispatch({
                    type: "SET_USER_DATA",
                    payload: { username: e.target.value },
                  })
                }
                className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <label htmlFor="name" className="text-xs font-medium">
                الاسم<span className="text-red-600">*</span>
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                value={userData.name}
                onChange={(e) =>
                  dispatch({
                    type: "SET_USER_DATA",
                    payload: { name: e.target.value },
                  })
                }
                className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="groupSelected" className="text-xs font-medium">
              المجموعة<span className="text-red-600">*</span>
            </label>
            <select
              required
              value={userData.groupSelected}
              className="selection appearance-none pb-1 pr-2 border outline-none border-[#eeeeee] rounded-xl h-[60px] px-4 cursor-pointer"
              style={{ direction: "rtl" }}
              onChange={(e) =>
                dispatch({
                  type: "SET_USER_DATA",
                  payload: { groupSelected: e.target.value },
                })
              }
            >
              <option></option>
              {rollesName?.map((ele, index) => (
                <option key={ele.id} value={ele.name}>
                  {rolles[index].ar}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col gap-3 w-1/2">
              <label htmlFor="password" className="text-xs font-medium">
                كلمة المرور<span className="text-red-600">*</span>
              </label>
              <div className="relative w-full rounded-xl border-black/10 border px-5 py-4 focus:border-main-color transition-all duration-300">
                <input
                  required
                  type="password"
                  value={userData.password}
                  onChange={handleChangePassword}
                  name="password"
                  id="password"
                  className="w-[86%] outline-none"
                />
                <div className="absolute top-1/2 -translate-y-1/2 left-4 flex items-center gap-2">
                  {copySuccess ? (
                    <CheckSharpIcon
                      sx={{ color: "#a6a6a6", fontSize: "18px" }}
                    />
                  ) : (
                    <img
                      src="/assets/icons/copy.svg"
                      alt="copy"
                      className="cursor-pointer"
                      onClick={() => copyToClipboard(userData.password)}
                    />
                  )}
                  <img
                    src="/assets/icons/refresh.svg"
                    alt="refresh"
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch({ type: "RESET_PASSWORD" });
                      setCopySuccess(false);
                    }}
                  />
                </div>
              </div>
              {errors.password && (
                <p className="text-red-600 text-base">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 w-1/2">
              <label htmlFor="confirm" className="text-xs font-medium">
                تأكيد كلمة المرور<span className="text-red-600">*</span>
              </label>
              <input
                required
                type="password"
                name="confirm"
                id="confirm"
                value={userData.confirm}
                onChange={handleChangeConfirm}
                className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
              />
              {errors.confirm && (
                <p className="text-red-600 text-base">{errors.confirm}</p>
              )}
              {match && <p className="text-green-600 text-base">{match}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="agent" className="text-xs font-medium">
              تابع لوكيل
            </label>
            <select
              value={userData.agent}
              className="selection appearance-none pb-1 pr-2 border outline-none border-[#eeeeee] rounded-xl h-[60px] px-4 cursor-pointer"
              style={{ direction: "rtl" }}
              onChange={handleChangeAgent}
              id="agent"
            >
              <option value={""}></option>
              {agents?.map((ele) => (
                <option key={ele.id} value={ele.id}>
                  {ele.username}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="rank" className="text-xs font-medium">
              نوع الحساب
            </label>
            <select
              value={userData.rank}
              className="selection appearance-none pb-1 pr-2 border outline-none border-[#eeeeee] rounded-xl h-[60px] px-4 cursor-pointer"
              style={{ direction: "rtl" }}
              onChange={(e) =>
                dispatch({
                  type: "SET_USER_DATA",
                  payload: { rank: e.target.value },
                })
              }
              id="rank"
            >
              <option value={""}></option>
              <option value={"wholesale"}>جملة</option>
              <option value={"retail"}>مفرق</option>
              <option value={"private"}>خاص</option>
            </select>
          </div>

          <MainButton title="إضافة مستخدم" h="44px" w="274px" />
        </form>
      </div>

      <div
        className={clsx(
          "w-full h-full flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]",
          { hidden: submit === false }
        )}
      >
        <CircularProgress />
      </div>
    </>
  );
}

