import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import toast from "react-hot-toast";
import clsx from "clsx";
import Cookies from 'js-cookie';
import { CircularProgress } from "@mui/material";

const token = Cookies.get('token');
export default function DeleteUser({ userName, handleClose, id, fetchData }) {
  console.log(id)
  const [submit, setSubmit] = useState(false);
  const handleDeleteUser = async (e) => {
    e.preventDefault()
    setSubmit(true)
    try {
      await axios.request(
        {
          url:`${baseUrl}userDelete/${id}`,
          method: "delete",
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${Cookies.get('token')}`,
          }}
        
      )
        .then(res => {
          toast.success("تم حذف المستخدم بنجاح")
          fetchData(0)
          handleClose()

        })

    } catch (error) {
      setSubmit(false)
      toast.error("فشلت العملية")
    }
  };
  return (
    <div
      className="rtl w-full mt-8 flex gap-16 p-24 flex-col justify-between"
      onSubmit={handleDeleteUser}
    >
      <p className="text-center font-semibold text-2xl">هل تريد حذف {userName} ؟</p>
      <div className="flex items-center justify-center gap-6 w-full">

        <button

          style={{
            width: "274px",
            height: "44px",
          }}
          onClick={(e) => handleDeleteUser(e)}
          className={`w-1/2 bg-main-color text-white rounded-lg flex-center main-button`}
        >
          تأكيد الحذف
        </button>
        <button

          style={{
            width: "274px",
            height: "44px",
          }}
          onClick={() => handleClose()}
          className={`w-1/2 border-main-color text-main-color border  rounded-lg flex-center main-button`}
        >
          الغاء
        </button>
      </div>
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
    </div>
  );
}
