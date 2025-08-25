import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import clsx from 'clsx'
import React, { useState } from 'react'
import { IOSSwitch } from '../elements/SwitchItem'
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast'

export default function EditProvider({ data, fetchData, close }) {

  const id = data?.id
  const [submit, setSubmit] = useState(false)
  const [name, setName] = useState(data.name)

  const [fixedValue, setFixedValue] = useState(data.is_active)
 
 
 
  const handleCahngeName = (e) => {
    setName(e.target.value)
  }
  const handleFixed = (e) => {
    e.preventDefault()
    if (e.target.checked == true) {
      setFixedValue(1)
    } else {
      setFixedValue(0)
    }
    SetSendBillType()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmit(true)
     let data = {
        name: name,
        is_active: fixedValue,
  
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
        fetchData()
        close()
      })
      .catch(e => {
        e && toast.error("فشلت العملية")
        setSubmit(false)
      })
  }
  return (
    <form className="flex flex-col gap-1 w-96 h-fit" onSubmit={e => handleSubmit(e)}>
      <p className='text-xl font-semibold text-right'>تعديل الفئة</p>
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

      <div className="flex items-center  w-full text-right">
        <label htmlFor="amount" className="text-xs font-medium">
           مفعل
        </label>
        {
          fixedValue == 0 ?
            <FormGroup>
              <FormControlLabel
                control={
                  <IOSSwitch sx={{ m: 1 }} onChange={(e) => handleFixed(e)} />
                }
              />

            </FormGroup>
            :
            <FormGroup>
              <FormControlLabel
                control={
                  <IOSSwitch sx={{ m: 1 }} defaultChecked onChange={(e) => handleFixed(e)} />
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
    </form>
  )
}