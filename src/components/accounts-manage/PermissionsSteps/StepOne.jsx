import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../../constants/baseUrl";
import Cookies from 'js-cookie';

export default function StepOne({
  setStepNum,
  id,
  fetchData,
  cridet
}) {


  const [cridetBalance, setCridetBalance] = useState(cridet)
  const [submit, setSubmit] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmit(true)
    await axios.request({
      url: `${baseUrl}users/update-credit-balance/${id}`,
      method: "POST",
      data: {
        amount: cridetBalance
      },
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    })
      .then(res => {
        setSubmit(false)
        toast.success("تم التعديل بنجاح")
        fetchData()
      })
      .catch(e => {
        toast.error("فشلت العملية")
        setSubmit(false)
      })
  }
  return (
    <>
      <form  >
        <div className="flex flex-col gap-3">
          <label htmlFor="balance" className="text-xs font-medium">
            الرصيد الائتماني المسموح
          </label>
          <input
            value={cridetBalance}
            onChange={e => setCridetBalance(e.target.value)}
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />




        </div>
        <button
        onClick={(e) => handleSubmit(e) }
          type='button'
          style={{
            height: "44px",
          }}
          className={`bg-main-color mt-4 w-1/2 self-end text-white rounded-lg flex-center main-button`}
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
      </form >
     
      <div className="flex flex-col gap-6 mb-[65px]">
        <div className="flex gap-2 items-center">
          <p
            onClick={() => setStepNum(2)}
            className="underline text-[#1F43F1] w-[170px] cursor-pointer text-[16px] font-medium"
          >
            تعديل الصلاحيات
          </p>
          <ArrowBackIosNewRoundedIcon
            fontSize="10px"
            sx={{ color: "#1F43F1" }}
          />
        </div>

      </div>
    </>
  );
}
