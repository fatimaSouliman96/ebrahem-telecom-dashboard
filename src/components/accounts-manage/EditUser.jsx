import { useState } from "react";
import axios from "axios";
import { rolles } from "../../constants/data";
import clsx from "clsx";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { baseUrl } from "../../constants/baseUrl";
import CircularProgress from "@mui/material/CircularProgress";



export default function EditUser({ handleClose, user, rollesName, fetchData }) {

  const [submit, setSubmit] = useState(false)

  const [userData, setUserData] = useState({
    username: user?.username,
    name: user?.name,
    roleName: user?.roles[0]?.name,
    rank: user?.rank,

  });

  const handleEditUser = async (e) => {
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
            Authorization: `Bearer ${Cookies.get('token')}`,
          }
        }
      ).
        then(res => {
          toast.success("تم تعديل المستخدم بنجاح")
          setSubmit(false)
          fetchData(0)
          handleClose()
        })
      console.log(response);
    } catch (error) {
      setSubmit(false)
      console.log(error);
    }
  };
  return (
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
    </form>
  );
}
