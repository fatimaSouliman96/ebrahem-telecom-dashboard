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

export default function AddProvider({ fetchData, close }) {

  const [submit, setSubmit] = useState(false)
  const [name, setName] = useState("")
  const [isHand, setIsHand] = useState(2)
  const [isFinal, setIsFinal] = useState(2)
  const [wholesale, setWholesale] = useState()
  const [retail, setRetail] = useState()

  const [privateValue, setPrivateValue] = useState()
  const [active, setActive] = useState(2)
  const [fixedValue, setFixedValue] = useState(2)

  const handleCahngeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeWholesale = (e) => {
    if (e.target.value > 0) {
      setWholesale(e.target.value)
    } else {
      null
    }
  }
  const handleCahngeRetail = (e) => {
    if (e.target.value > 0) {
      setRetail(e.target.value)
    } else {
      null
    }
  }
  const handleCahngeprivate = (e) => {
    if (e.target.value > 0) {
      setPrivateValue(e.target.value)
    } else {
      null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmit(true)
    let data = {
      name: name,
      is_active: active,
      is_hand: isHand,
      is_final: isFinal,
      retail: retail,
      wholesale: wholesale,
      private: privateValue,
      is_fixed: fixedValue
    }

    await axios.request({
      url: `${baseUrl}isp/add`,
      method: "post",
      data: data,
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    })
      .then(res => {
        setSubmit(false)
        toast.success("تم الاضافة بنجاح")
        fetchData()
        close()
      })
      .catch(e => {
        toast.error("فشلت العملية")
        setSubmit(false)
      })
  }
  return (
    <form className="flex flex-col gap-4 w-96 h-fit" onSubmit={e => handleSubmit(e)}>
      <p className='text-xl font-semibold text-right'> إضافة مزود</p>
      <div className='grid grid-cols-2 gap-1 w-full items-center' >
        <div className="flex flex-col gap-3 w-full text-right">
          <label htmlFor="name" className="text-xs font-medium">
            اسم المزود
          </label>
          <input
            required
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
            required
            value={wholesale}
            onChange={e => handleChangeWholesale(e)}
            type="number"
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
            required
            value={retail}
            onChange={e => handleCahngeRetail(e)}
            type="number"
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
            required
            value={privateValue}
            onChange={e => handleCahngeprivate(e)}
            type="number"
            name="private"
            id="private"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
        </div>
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
        {/* حالة المزود */}
        <div className="flex flex-col gap-3 w-full text-right">
          <label htmlFor="active" className="text-xs font-medium">
            حالة المزود
          </label>
          <select className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300" onChange={e => setActive(e.target.value)} value={active} name="" id="active">
            <option value={2} ></option>
            <option value={1} >مفعل</option>
            <option value={0} >غير مفعل</option>
          </select>
        </div>

      </div>




      <button
        type='submit'
        style={{
          height: "44px",
        }}
        className={`bg-main-color w-full self-end text-white rounded-lg flex-center main-button`}
      >
        إضافة المزود
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
  )
}