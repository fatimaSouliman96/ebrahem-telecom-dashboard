import { useState } from "react";
import axios from "axios";
import { rolles } from "../../constants/data";
import clsx from "clsx";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { baseUrl } from "../../constants/baseUrl";
import CircularProgress from "@mui/material/CircularProgress";
import useClipboard from "../../hooks/useClipboard";
import MainButton from "../elements/MainButton";



export default function EditUser({ handleClose, user, rollesName, fetchData }) {

  const [submit, setSubmit] = useState(false)
  const [edituser, setEditUser] = useState(true)
  const { copySuccess, copyToClipboard, setCopySuccess } = useClipboard();

  const [errors, setErrors] = useState({
    confirm: "", password: ""
  })
  const [match, setMatch] = useState()

  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState("")

  const [userData, setUserData] = useState({
    username: user?.username,
    name: user?.name,
    roleName: user?.roles[0]?.name,
    rank: user?.rank,

  });

  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(e.target.value)

    if (passwordValue.length < 8) {
      setErrors({ ...errors, password: "يجب ان تكون كلمة السر مكونة على الاقل من 8 احرف" })
    } else {

      setErrors({ ...errors, password: "" })
    }
  };

  const handleChangeConfirm = (e) => {
    const confirm = e.target.value;

    setConfirmPassword(e.target.value)
    if (confirm !== password) {
      setErrors({ ...errors, confirm: "كلمة السر غير مطابقة" })
    } else {
      setErrors({ ...errors, confirm: "" })
    }
  };

  const handleEditUser = async (e) => {
    const token = Cookies.get('token');
    e.preventDefault()
    console.log(userData)
    setSubmit(true)
    try {
      await axios.request(
        {
          url: `${baseUrl}userUpdate/${user?.id}`,
          data: userData,
          method: "put",
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      ).
        then(res => {
          toast.success("تم تعديل المستخدم بنجاح")
          setSubmit(false)
          fetchData(1)
          handleClose()
        })
      console.log(response);
    } catch (error) {
      setSubmit(false)
      console.log(error);
    }
  };
  const changePassword = async (e) => {
    const token = Cookies.get('token');
    e.preventDefault()
    console.log(userData)
    setSubmit(true)
    try {
      await axios.request(
        {
          url: `${baseUrl}users/${user?.id}/reset-password`,
          data: {
            password: password,
            password_confirmation: confirmPassword
          },
          method: "put",
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      ).
        then(res => {
          toast.success("تم تعديل كلمة المرور بنجاح")
          setSubmit(false)
          fetchData(1)
          handleClose()
        })
      console.log(response);
    } catch (error) {
      setSubmit(false)
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex gap-4">
        <div onClick={() => setEditUser(!edituser)} className={`${edituser ? " text-blue-950" : "text-gray-400"} cursor-pointer font-bold`} >تعديل المعلومات الشخصية</div>
        <div onClick={() => setEditUser(!edituser)} className={`${edituser ? "text-gray-400" : " text-blue-950"} cursor-pointer font-bold`}>تعديل كلمة المرور</div>
      </div>
      {edituser ?
        <form className="rtl mt-16 flex flex-col gap-5" onSubmit={handleEditUser}>
          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col gap-3 w-1/2">
              <label htmlFor="username" className="text-xs font-medium">
                اسم المستخدم
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
              />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <label htmlFor="name" className="text-xs font-medium">
                الاسم
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
              />
            </div>

          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="username" className="text-xs font-medium">
              المجموعة
            </label>
            <select
              value={userData.roleName}
              className="selection w-full appearance-none pb-1 pr-2  border outline-none border-[#eeeeee] rounded-xl h-[60px] px-4 cursor-pointer"
              style={{ direction: "rtl" }}
              onChange={(e) => {
                console.log(e.target.value)
                setUserData({ ...userData, roleName: e.target.value })
              }
              }
            >
              {user?.roles[0]?.length == 0 && <option></option>}
              {
                rollesName?.map((ele, index) => [
                  <option value={ele.name} key={ele.id} className="text-sm font-extralight" >
                    {rolles[index].ar}
                  </option>
                ])
              }


            </select>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="rank" className="text-xs font-medium">
              نوع الحساب
            </label>
            <select
              value={userData.rank}
              className="selection appearance-none pb-1 pr-2  border outline-none border-[#eeeeee] rounded-xl h-[60px] px-4 cursor-pointer"
              style={{ direction: "rtl" }}
              onChange={(e) => setUserData({ ...userData, rank: e.target.value })}
              id="rank"
            >
              <option value={""} ></option>
              <option value={"wholesale"} >جملة</option>
              <option value={"retail"} >مفرق</option>
              <option value={"private "} >خاص</option>

            </select>
          </div>
          <button
            type="submit"
            style={{
              width: "274px",
              height: "44px",
            }}
            className={`bg-main-color text-white rounded-lg flex-center main-button`}
          >
            حفظ التغييرات
          </button>
         
        </form>
        :

        <form className="rtl mt-4 flex flex-col gap-2" onSubmit={changePassword} >
          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col gap-3 w-1/2">
              <label htmlFor="password" className="text-xs font-medium">
                كلمة المرور<span className="text-red-600">*</span>
              </label>
              <div className="relative w-full rounded-xl border-black/10 border px-5 py-4 focus:border-main-color transition-all duration-300">
                <input
                  required
                  type="password"
                  value={password}
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
                value={confirmPassword}
                onChange={handleChangeConfirm}
                className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
              />
              {errors.confirm && (
                <p className="text-red-600 text-base">{errors.confirm}</p>
              )}
              {match && <p className="text-green-600 text-base">{match}</p>}
            </div>
          </div>
          <MainButton title="حفظ" h="44px" w="274px" />
        </form>

      }
       <div className={
            clsx(
              'w-full h-full flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
              {
                'hidden'
                  : submit == false
              }
            )
          }>
            <CircularProgress />

          </div>
    </>
  );
}
