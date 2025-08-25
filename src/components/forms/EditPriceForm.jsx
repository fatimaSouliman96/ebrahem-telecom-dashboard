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

export default function EditPriceForm({ data, fetchData, close, bills }) {

  const [submit, setSubmit] = useState(false)
  const [description, setDescription] = useState(data.description)
  const [minimum, setMinimum] = useState(data.minimum)

  const [wholesale, setWholesale] = useState(data.wholesale)
  const [retail, setRetail] = useState(data.retail)
  const [fixedValue, setFixedValue] = useState(data.is_fixed)
  const [billType, setBillType] = useState("")
  const [unitType, setUnitType] = useState("")

  
  const SetSendBillType = () => {
    if( data.billable_type){
      console.log(data.billable_type.slice(11))
      switch (data.billable_type.slice(11)) {
        case "ApplicationPay":
          setBillType("طلب ألعاب")
          break;
        case "FixedLineBill":
          setBillType("فاتورة أرضي")
          break;
        case "TopUpRequest":
          setBillType("رصيد")
          break;
        case "InternetBill":
          setBillType("فاتورة إنترنت")
          break;
        case "ElectricityBill":
          setBillType("فاتورة كهرباء")
          break;
        case "WaterBill":
          setBillType("فاتورة مياه")
          break;
        case "CashRequest":
          setBillType("كاش")
          break;
      
        default:
          break;
      }
    } else if(data.top_up_type){
      
      switch (data.top_up_type) {
        case "lastpaid":
          setUnitType("لاحق الدفع")
          break;
        case "cash":
          setUnitType("كاش")
          break;
        case "prepaid":
          setUnitType("مسبق الدفع")
          break;      
        default:
          break;
      }
    }
  }
 
  const handleCahngeDescription = (e) => {
    setDescription(e.target.value)
    SetSendBillType()
  }
  const handleCahngeMinimum = (e) => {
    setMinimum(e.target.value)
    SetSendBillType()
  }

  const handleCahngeWholesale = (e) => {
    setWholesale(e.target.value)
    SetSendBillType()
  }
  const handleCahngeRetail = (e) => {
    setRetail(e.target.value)
    SetSendBillType()
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

    const urlUnits = `unit-prices/${data.id}/update-manually`
    const urlBills = `bill-prices/${data.id}/update-manually`

     let dataUnits = {
      description: description,
      company: data.company&&data.company,
      minimum: minimum,
      wholesale: wholesale,
      retail: retail,
      is_fixed: fixedValue,
      top_up_type: unitType
    }

   
    let dataBills = {
      description: description,
      minimum: minimum,
      wholesale: wholesale,
      retail: retail,
      is_fixed: fixedValue,
      billable_type: billType
    }
   
    await axios.request({
      url: `${baseUrl}${ bills == true ? urlBills : urlUnits}`,
      method: "PATCH",
        data: bills == true ? dataBills : dataUnits,
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
        toast.error("فشلت العملية")
        setSubmit(false)
      })
  }
  return (
    <form className="flex flex-col gap-1 w-96 h-fit" onSubmit={e => handleSubmit(e)}>
      <p className='text-xl font-semibold text-right'>تعديل الفئة</p>
      <div className="flex flex-col gap-3 w-full text-right">
        <label htmlFor="description" className="text-xs font-medium">
          الوصف
        </label>
        <input
          required
          value={description}
          onChange={e => handleCahngeDescription(e)}
          type="text"
          name="description"
          id="description"
          className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
        />
      </div>
      <div className="flex flex-col gap-3 w-full text-right">
        <label htmlFor="amount" className="text-xs font-medium">
          الحد الدنى
        </label>
        <input
          value={minimum}
          onChange={e => handleCahngeMinimum(e)}
          type="number"
          name="amount"
          id="amount"
          className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
        />
      </div>
      {/* <div className="flex flex-col gap-3 w-full text-right">
        <label htmlFor="amount" className="text-xs font-medium">
          خاص
        </label>
        <input
          valurequirede={special}
          onChange={e => handleCahngeSpecial(e)}

          type="number"
          name="amount"
          id="amount"
          className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
        />
      </div> */}
      <div className="flex flex-col gap-3 w-full text-right">
        <label htmlFor="amount" className="text-xs font-medium">
          جملة
        </label>
        <input
          required
          value={wholesale}
          onChange={e => handleCahngeWholesale(e)}
          type="number"
          name="amount"
          id="amount"
          className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
        />
      </div>
      <div className="flex flex-col gap-3 w-full text-right">
        <label htmlFor="amount" className="text-xs font-medium">
          مفرق
        </label>
        <input
          required
          value={retail}
          onChange={e => handleCahngeRetail(e)}
          type="number"
          name="amount"
          id="amount"
          className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
        />
      </div>
      <div className="flex items-center  w-full text-right">
        <label htmlFor="amount" className="text-xs font-medium">
          قيمة ثابتة
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
