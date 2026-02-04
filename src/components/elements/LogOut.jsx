import axios from "axios"
import logOutImg from "../../../public/assets/logOut.svg"
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';

const token = Cookies.get('token');
export default function LogOut(props) {

  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate()
  const handelLogOut = async () => {
    setLogOut(true)

    await axios.request(
      {
        url: `${baseUrl}logout`,
        method: "post",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }

    )
      .then((res) => {
        localStorage.removeItem("token")
        localStorage.removeItem("remember")
        navigate("/")

      })
      .catch(e => {
        setLogOut(false)
        navigate("/")
      })


  }

  return (
    <>
      <div className='w-[352px] flex flex-col gap-3 items-center'>
        <img src={logOutImg} />
        <p className="text-base">هل تريد تسجيل الخروج؟</p>

        <div className="flex justify-between w-full pt-4">
          <button onClick={() => props.close()} className="p-1 text-base border text-[#282561] border-[#282561] w-[48%] h-[43px]  rounded-xl">الغاء الأمر</button>
          <button onClick={() => handelLogOut()} className=" p-1 text-base text-white bg-[#EA0234] w-[48%] h-[43px] rounded-xl">موافق</button>
        </div>

      </div>
      <div style={{ zIndex: "999" }} className={
        clsx(
          'w-screen h-screen flex justify-center items-center absolute top-[-234px] left-[-560px] bg-[#ffffff7e] rounded-[12px]',
          {
            'hidden'
              : logOut == false
          }
        )
      }>
        <CircularProgress />

      </div>
    </>
  )
}
