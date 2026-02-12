
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import clsx from 'clsx'
import toast from "react-hot-toast";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import { useState } from "react";


export default function DiscountedAmount({ amount, handelClose, removeValues, url, data, app, Kazieh, fetchData, setNewBalnces, mobail }) {
  const user = JSON.parse(localStorage.getItem("user"))
  const [submit, setSubmit] = useState(false)
  const sendData = async () => {
    setSubmit(true)
    app ?
      await axios.request(
        {
          url: `${baseUrl}pay-application-pay`,
          method: "post",
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          data: data
        }
      )
        .then(res => {
          setSubmit(false)
          removeValues()
          fetchData(1)
          toast.success("تمت العملية بنجاح سوف يتم مراجعة الطلب")

        })
        .catch(e => {
          toast.error("فشلت العملية")
          setSubmit(false)
        })
      :
      Kazieh ?
        await axios
          .request({
            url: `${baseUrl}${user.roles[0].name == "pointOfSale" ? "" : "NewOutdoorOrder/"}top-up-request`,
            method: "post",
            data: data,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          })
          .then((res) => {
            toast.success("تمت العملية بنجاح");
            setNewBalnces()
            removeValues()
            setSubmit(false);
            handelClose()
            fetchData(1);
          })
          .catch((e) => {
            if (e) {
              setSubmit(false);
              toast.error("لم تنجح العملية الرجاء المحاولة لاحقا");
              toast.error("او التواصل مع الدعم التقني")
            }
          })
        :
        mobail ?
          await axios.request(
            {
              url: `${baseUrl}${user.roles[0].name == "pointOfSale" ? "" : "NewOutdoorOrder/"}top-up-request`,
              method: "post",
              data: data,
              headers: {
                "Accept": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`,
              }
            }

          )
            .then(res => {
              toast.success("تمت العملية بنجاح")
               fetchData(1)
               setSubmit(false)
               removeValues()
               handelClose()
              
            })
            .catch(e => {
              if (e) {
                setSubmit(false)
                toast.error(e.response.data.data)
              }
            })
          :
          await axios.request(
            {
              url: `${baseUrl}${user.roles[0].name === "pointOfSale" ? "" : "NewOutdoorOrder/"}${url}`,
              method: "post",
              data: data,
              headers: {
                "Accept": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`,
              }
            }

          ).then((res) => {
            toast.success("تمت  العملية بنجاح")
            removeValues()
            setSubmit(false)
            handelClose()
          })
            .catch(e => {
              console.log(e)
              e && toast.error(e.response.data.data)
              setSubmit(false)
            })


  }
  const confirmSending = () => {
    sendData()
  }


  const close = () => {
    handelClose()
    setSubmit(false)
  }

  return (
    <div className='flex flex-col items-center w-[352px] gap-3'>
      <p className='text-base font-semibold'> المبلغ الذي سيتم خصمه من حسابك</p>
      <div className='flex justify-center items-center w-[100px] h-[100px]  rounded-full'>
        <h2>{amount}</h2>
      </div>

      <div className='flex justify-between w-full gap-3'>
        <button onClick={() => close()} className='w-1/2 h-[43px] border border-main-color rounded-xl text-main-color'>الغاء الأمر</button>
        <button onClick={() => confirmSending()} className='w-1/2  h-[43px] rounded-xl text-white bg-main-color'>تأكيد</button>
      </div>
      <div className={
        clsx(
          'w-full h-full z-50 flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
          {
            'hidden'
              : submit == false
          }
        )
      }>
        <CircularProgress />
      </div>
    </div>
  )
}