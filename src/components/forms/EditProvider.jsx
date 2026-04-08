import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import clsx from 'clsx'
import { useState } from 'react'
import { IOSSwitch } from '../elements/SwitchItem'
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast'
import { filterNumberInput, isValidPositiveNumber } from '../../utilits/validation.js';

export default function EditProvider({ data, fetchData, close }) {



  const id = data?.id
  const [submit, setSubmit] = useState(false)
  const [name, setName] = useState(data.name)
  const [wholesale, setWholesale] = useState((data.wholesale || '').toString())
  const [retail, setRetail] = useState((data.retail || '').toString())
  const [fixedValue, setFixedValue] = useState(data.is_fixed)
  const [isHand, setIsHand] = useState(data.is_hand)
  const [privateValue, setPrivateValue] = useState((data.private || '').toString())
  const [active, setActive] = useState(data.is_active)
  const [isFinal, setIsFinal] = useState(data.is_final)

  const [edit, setEdit] = useState(0)


  const handleCahngeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeWholesale = (e) => {
    const value = filterNumberInput(e.target.value)
    setWholesale(value)
  }
  const handleCahngeRetail = (e) => {
    const value = filterNumberInput(e.target.value)
    setRetail(value)
  }
  const handleCahngeprivate = (e) => {
    const value = filterNumberInput(e.target.value)
    setPrivateValue(value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmit(true)
    let data = {
      name: name,
      is_active: active,
      retail: retail,
      wholesale: wholesale,
      private: privateValue

    }

    await axios.request({
      url: `${baseUrl}isp/edit/${id}`,
      method: "POST",
      data: data,
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    })
      .then(res => {

        setSubmit(false)
        toast.success("تم التعديل بنجاح")
        close()
        fetchData()

      })
      .catch(e => {
        e && toast.error("فشلت العملية")
        setSubmit(false)
      })
  }
  const handleSubmitFixed = async (e) => {
    e.preventDefault()
    setSubmit(true)


    await axios.request({
      url: `${baseUrl}isp/toggle-fixed/${id}`,
      method: "PATCH",
      data: {
        is_fixed: fixedValue
      },
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    })
      .then(res => {

        setSubmit(false)
        toast.success("تم التعديل بنجاح")
        close()
        fetchData()

      })
      .catch(e => {
        e && toast.error("فشلت العملية")
        setSubmit(false)
      })
  }
  const handleSubmitHand = async (e) => {
    e.preventDefault()
    setSubmit(true)


    await axios.request({
      url: `${baseUrl}isp/toggle-hand/${id}`,
      method: "PATCH",
      data: {
        is_hand: isHand
      },
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    })
      .then(res => {

        setSubmit(false)
        toast.success("تم التعديل بنجاح")
        close()
        fetchData()

      })
      .catch(e => {
        e && toast.error("فشلت العملية")
        setSubmit(false)
      })
  }
  const handleSubmitFinal = async (e) => {
    e.preventDefault()
    setSubmit(true)


    await axios.request({
      url: `${baseUrl}isp/toggle-final/${id}`,
      method: "PATCH",
      data: {
        is_final: isFinal
      },
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    })
      .then(res => {

        setSubmit(false)
        toast.success("تم التعديل بنجاح")
        close()
        fetchData()

      })
      .catch(e => {
        e && toast.error("فشلت العملية")
        setSubmit(false)
      })
  }
  return (
    <>
      <div className='flex gap-2 items-center' >
        <p onClick={() => setEdit(0)} className={`text-md font-semibold text-right cursor-pointer ${edit == 0 ? "text-blue-800" : "text-gray-400"} `}>تعديل الفئة</p>
        <p onClick={() => setEdit(1)} className={`text-md font-semibold text-right cursor-pointer ${edit == 1 ? "text-blue-800" : "text-gray-400"} `}>تعديل نوع القيمة</p>
        <p onClick={() => setEdit(2)} className={`text-md font-semibold text-right cursor-pointer ${edit == 2 ? "text-blue-800" : "text-gray-400"} `}>تعديل طريقة الادخال</p>
        <p onClick={() => setEdit(3)} className={`text-md font-semibold text-right cursor-pointer ${edit == 3 ? "text-blue-800" : "text-gray-400"} `}>تعديل السعر النهائي</p>
      </div>
      {edit == 0 && <form className="flex flex-col gap-1 w-96 h-fit" onSubmit={e => handleSubmit(e)}>

        <div className="flex flex-col gap-3 w-full text-right">
          <label htmlFor="name" className="text-xs font-medium">
            اسم المزود
          </label>
          <input

            value={name}
            onChange={e => handleCahngeName(e)}
            type="text"
            name="name"
            id="name"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
        </div>
        <div className="flex flex-col gap-3 w-full text-right">
          <label htmlFor="wholesale" className="text-xs font-medium">
            سعر الجملة
          </label>
          <input
            value={wholesale}
            onChange={e => handleChangeWholesale(e)}
            type="text"
            name="wholesale"
            id="wholesale"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />

        </div>
        <div className="flex flex-col gap-3 w-full text-right">
          <label htmlFor="retail" className="text-xs font-medium">
            سعر المفرق
          </label>
          <input
            value={retail}
            onChange={e => handleCahngeRetail(e)}
            type="text"
            name="retail"
            id="retail"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />

        </div>
        <div className="flex flex-col gap-3 w-full text-right">
          <label htmlFor="private" className="text-xs font-medium">
            السعر الخاص
          </label>
          <input
            value={privateValue}
            onChange={e => handleCahngeprivate(e)}
            type="text"
            name="private"
            id="private"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />

        </div>

        <div className="flex items-center  w-full text-right">
          <label htmlFor="amount" className="text-xs font-medium">
            مفعل
          </label>
          {
            active == 0 ?
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch sx={{ m: 1 }} onChange={(e) => setActive(1)} />
                  }
                />

              </FormGroup>
              :
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch sx={{ m: 1 }} defaultChecked onChange={(e) => setActive(0)} />
                  }
                />

              </FormGroup>

          }
        </div>

        <button
          type='submit'
          style={{
            height: "44px",
          }}
          className={`bg-main-color w-1/2 self-end text-white rounded-lg flex-center main-button`}
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
      </form>}
      {
        edit == 1 && <form
          onSubmit={e => handleSubmitFixed(e)}
          className="flex flex-col gap-1 pt-10 w-96 h-fit" >
          <div className="flex flex-col gap-3 w-full text-right">
            <label htmlFor="fixedValue" className="text-xs font-medium">
              نوع القيمة
            </label>
            <select className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300" onChange={e => setFixedValue(e.target.value)} value={fixedValue} name="" id="fixedValue">
              <option value={2} ></option>
              <option value={1} >ثابتة</option>
              <option value={0} >نسبة</option>
            </select>
          </div>
          <button
            type='submit'
            style={{
              height: "44px",
            }}
            className={`bg-main-color w-full mt-2 self-end text-white rounded-lg flex-center main-button`}
          >
            حفظ التغييرات
          </button>
        </form>
      }
      {
        edit == 2 && <form
          onSubmit={e => handleSubmitHand(e)}
          className="flex flex-col gap-1 pt-10 w-96 h-fit" >
          {/* 'طريقة الادخال */}
          <div className="flex flex-col gap-3 w-full text-right">
            <label htmlFor="isHand" className="text-xs font-medium">
              طريقة الادخال
            </label>
            <select className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300" onChange={e => setIsHand(e.target.value)} value={isHand} name="" id="isHand">
              <option value={2} ></option>
              <option value={1} >يدوي</option>
              <option value={0} >غير يدوي</option>
            </select>
          </div>
          <button
            type='submit'
            style={{
              height: "44px",
            }}
            className={`bg-main-color w-full mt-2 self-end text-white rounded-lg flex-center main-button`}
          >
            حفظ التغييرات
          </button>
        </form>
      }
      {
        edit == 3 && <form
          onSubmit={e => handleSubmitFinal(e)}
          className="flex flex-col gap-1 pt-10 w-96 h-fit" >
          {/* السعر النهائي */}
          <div className="flex flex-col gap-3 w-full text-right">
            <label htmlFor="isFinal" className="text-xs font-medium">
              السعر النهائي
            </label>
            <select className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300" onChange={e => setIsFinal(e.target.value)} value={isFinal} name="" id="isFinal">
              <option value={2} ></option>
              <option value={1} >مفعل</option>
              <option value={0} >غير مفعل</option>
            </select>
          </div>
          <button
            type='submit'
            style={{
              height: "44px",
            }}
            className={`bg-main-color w-full mt-2 self-end text-white rounded-lg flex-center main-button`}
          >
            حفظ التغييرات
          </button>
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

  )
}