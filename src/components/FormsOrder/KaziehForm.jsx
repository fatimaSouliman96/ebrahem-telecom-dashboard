import { useEffect, useState } from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import clsx from 'clsx'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import { baseUrl } from "../../constants/baseUrl";
import axios from 'axios'
import { fetchBalances } from '../../services/getBalances';
import ModalPob from '../Modals/Modal';
import DiscountedAmount from '../elements/DiscountedAmount';



export default function KaziehForm({ fetchData, kazieh }) {

  const [submit, setSubmit] = useState(false)
  const [open, setOpen] = useState(false)
  const [prices, setPrices] = useState(0)
  const [topUpType, setTopUpType] = useState("")
  const [company, setCompany] = useState("")
  const [amount, setAmount] = useState()
  const [quantity, setQuantity] = useState()
  const [code, setCode] = useState()
  const [number, setNumber] = useState()
  const [price, setPrice] = useState()
  const [isFixed, setIsFixed] = useState()
  const [isCity, setIsCity] = useState()
  const [city, setCity] = useState()
  const [errorsQuantity, setErrorsQuantity] = useState('')
  const [balanceTypes, setBalanceTypes] = useState([
    {
      value: "lastpaid",
      text: "لاحق الدفع"
    },
    {
      value: "prepaid",
      text: "مسبق الدفع"
    },
    {
      value: "cash",
      text: "كاش"
    }
  ])
  const [errors, setErrors] = useState({
    quantity: errorsQuantity,
    phone: "",
    amount: ""
  })
  const [balance, setBalance] = useState();
  const [data, setData] = useState()


  const isDecimal = (num) => num % 1 !== 0;
  const roundNumber = num => Math.ceil(num);

  const handleStateOpen = () => {
    setOpen(!open)
  }
  const getBalanses = async () => {
    const res = await fetchBalances();
    setBalance(res.main_balance);
  };
  useEffect(() => {
    getBalanses();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"))

  const handleChangeQuantity = (e) => {
    let entredAmount = parseInt(e.target.value)
    setErrors({
      quantity: "",
      phone: "",
      amount: ""
    })
    if (entredAmount == "") {
      setAmount("")
      setQuantity()
    } else {
      setQuantity(entredAmount)
      if (!quantityValdate(entredAmount)) {
        if (isFixed == 0) {

          let amountx = entredAmount * price
          let x = amountx / 100
        
          let amountValue = x + entredAmount

          if (isDecimal(amountValue)) {
            const newValue = roundNumber(amountValue)
            setAmount(newValue)
            valueBalance(newValue)
          } else {
            setAmount(amountValue)
            valueBalance(amountValue)
          }

        } else {
          let amountValue = parseInt(e.target.value) + price
          if (isDecimal(amountValue)) {
            const newValue = roundNumber(amountValue)
            setAmount(newValue)
            valueBalance(newValue)
          } else {
            setAmount(amountValue)
            valueBalance(amountValue)
          }
        }
      }
    }
  }

  const quantityValdate = (value) => {
    const minValue = parseInt(localStorage.getItem("minimum"));
    if (parseInt(value) < parseInt(localStorage.getItem("minimum"))) {

      setErrorsQuantity(`لا يمكن أقل من الحد الأدنى ${minValue}`);
      return true;
    } else if (parseInt(value) >= parseInt(localStorage.getItem("minimum"))) {
  
      setErrorsQuantity("");
      return false;
    }
  };

  const valueBalance = (value) => {


    if (parseInt(value) < parseInt(balance)) {
      
      setErrors({ ...errors, amount: `` })
    }
    else if (parseInt(value) > parseInt(balance)) {
      
      setErrors({ ...errors, amount: `لا يوجد رصيد كافي رصيدك ${balance}` })

    }
  }

  const handleChangeCode = (e) => {
    setCode(e.target.value)
  }

  const handleChangeNumber = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // فقط أرقام
    setNumber(value); // تحديث القيمة مباشرةً

    let error = "";

    if (!value) {
      error = "";
    } else if (!value.startsWith("094") &&
      !value.startsWith("095") &&
      !value.startsWith("096")) {
      error = "يجب أن يبدأ الرقم بـ 094 أو 095 أو 096";
    } else if (value.length < 10) {
      error = "الرقم قصير جدًا، يجب أن يكون 10 أرقام";
    } else if (value.length > 10) {
      error = "الرقم طويل جدًا، يجب أن يكون 10 أرقام";
    }



    setErrors({ ...errors, phone: error });
  };

  const handleChangeTopUpType = (e) => {
        setPrices(0)
    setIsFixed()
    setAmount()
    setErrors({
      quantity: "",
      phone: "",
      amount: ""
    })
    localStorage.setItem("topUpType", e.target.value)
    localStorage.setItem("minimum", "")
    setTopUpType(e.target.value)
  }

  const handleChangeCompany = (e) => {
    setPrices(0)
     setIsFixed()
       setAmount()
    setErrors({
      quantity: "",
      phone: "",
      amount: ""
    })
    localStorage.setItem("company", e.target.value)
    localStorage.setItem("minimum", "")
    setCompany(e.target.value)

  }

  const fetchPrices = async (e) => {

    if (company !== "" & topUpType !== "") {
      setPrices(2)
      e.preventDefault();
      setCode("")
      setNumber("")
      setQuantity()
      setAmount("")
      getPrices()
    } else {
      toast.error("الرجاء ملئ الحقول اولا")
    }

  }

  const getPrices = async (e) => {

    const formData = new FormData()
    // user.roles[0].name !== "pointOfSale" && formData.append("order_type", orderType)
    formData.append("_method", "get")
    await axios.request({
      url: `${baseUrl}${user.roles[0].name == "pointOfSale" ? "" : "NewOutdoorOrder/"}getRetailPricesKazieh`,
      data: formData,
      method: "post",
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    }
    )
      .then(res => {


        const selectedPrice = res.data.prices.find(ele => ele.company === company && ele.top_up_type === topUpType);
        localStorage.setItem("minimum", selectedPrice.minimum)
        setPrice(selectedPrice.price);
     
        if (selectedPrice.is_fixed == null) {
          setIsFixed(0)
        } else {
          setIsFixed(selectedPrice.is_fixed);
        }

        setPrices(1)

      })
      .catch(e => {
        if (e) {
          setPrices(0)
          toast.error("لم ينجح طلب الاسعار الرجاء المحاولة لاحقا")
        }

      })

  }

  const isErrorsEmpty = () => {
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تحقق من كود المستخدم إذا كانت الشركة MTN
    if (company === "MTN" && (!code || code.trim() === "")) {
      toast.error("يرجى إدخال كود المستخدم لأن الشركة MTN");
      return;
    }

    if (isErrorsEmpty()) {
      handleStateOpen()
      const formData = new FormData();

      formData.append("top_up_type", topUpType);
      formData.append("company", company);
      code && formData.append("code", code);
      number && formData.append("number", number);
      formData.append("quantity", quantity);
      formData.append("amount", amount);
      // user.roles[0].name !== "pointOfSale" && formData.append("order_type", orderType);
      formData.append("unit_price", amount);
      formData.append("is_city", isCity);
      formData.append("city", city);
      formData.append("source", "kazieh");
      setData(formData)


    }
  };

  const removeValues = () => {
    setTopUpType("");
    setCompany("");
    setCode("");
    setNumber("");
    setQuantity();
    setAmount("");
    setPrices(false)
  }
  const setNewBalnces = () => {
    getBalanses();
    setErrors({
      quantity: "",
      phone: "",
      amount: "",
    });
  }
  return (
    <>
      {kazieh == true ?
        <form className="flex flex-col gap-4 " onSubmit={e => handleSubmit(e)}>
          <div className="grid grid-cols-2  w-full justify-between items-center gap-4">
            {/* الشركة */}
            <div className="flex flex-col gap-3 h-[110px]">
              <label htmlFor="point" className="text-xs font-medium">
                الشركة
                <span className='text-red-600 text-xs font-medium' >*</span>
              </label>
              <select
                required
                value={company}
                onChange={e => handleChangeCompany(e)}
                type="text"
                name="order"
                id="point"
                className="selection appearance-none  rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
              >
                <option > </option>
                <option value={"Syriatel"}>سيرياتيل</option>
                <option value={"MTN"}>MTN</option>
                <option value={"Wafa"}>وفا</option>
              </select>
            </div>
            {/* نوع الرصيد */}
            <div className="flex flex-col gap-3 h-[110px]">
              <label htmlFor="point" className="text-xs font-medium">
                نوع الرصيد
                <span className='text-red-600 text-xs font-medium' >*</span>
              </label>
              <select
                required
                value={topUpType}
                onChange={e => handleChangeTopUpType(e)}
                type="text"
                name="order"
                id="point"
                className="selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
              >
                <option value={""} ></option>
                {
                  balanceTypes?.map((ele, index) => {
                    return <option key={index} value={ele.value} >{ele.text}</option>
                  })
                }
              </select>
            </div>

            {/* نوع الطلب
            {user.roles[0].name !== "pointOfSale" && <div className="flex flex-col gap-3 col-span-1 h-[110px]">
              <label htmlFor="point" className="text-xs font-medium">
                نوع الطلب
                <span className='text-red-600 text-xs font-medium' >*</span>
              </label>
              <select
                required
                value={orderType}
                onChange={e => handleChangeOrderType(e)}
                type="text"
                name="order"
                id="point"
                className="selection appearance-none  rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
              >
                <option></option>
                <option value={"retail"}>مفرق</option>
                <option value={"wholesale"}>جملة</option>
              </select>
            </div>} */}

            <div
              onClick={e => fetchPrices(e)}
              style={{
                width: "274px",
                height: "44px",
              }}
              className={`col-span-2 flex items-center justify-center cursor-pointer bg-main-color text-white rounded-lg flex-center main-div`}
            >
              التالي
            </div>


            {prices == 1 ?
              <>
                {/* الكمية */}
                {

                  <div className="flex flex-col gap-3 h-[110px] ">
                    <label htmlFor="name" className="text-xs font-medium">
                      الكمية
                      <span className='text-red-600 text-xs font-medium'>*</span>
                    </label>
                    <input
                      required
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={quantity}
                      onChange={e => handleChangeQuantity(e)}
                      className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                    />
                    {errorsQuantity !== "" && <p className='text-red-600 text-base'>{errorsQuantity}</p>}
                  </div>

                }
                <div className="flex flex-col gap-3 h-[110px]">
                  <label htmlFor="name" className="text-xs font-medium">
                    المدينة
                    <span className='text-red-600 text-xs font-medium'>*</span>
                  </label>
                  <select
                    required
                    name="city"
                    id="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="rounded-xl  border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300">
                    <option value={""} ></option>
                    <option value={"دمشق"} >دمشق</option>
                    <option value={"ريف دمشق"} >ريف دمشق
                    </option>
                    <option value={"حلب"} >حلب</option>
                    <option value={"حمص"} >حمص</option>
                    <option value={"حماة"} >حماة</option>
                    <option value={"اللاذقية"} >اللاذقية</option>
                    <option value={"طرطوس"} >طرطوس</option>
                    <option value={"إدلب"} >إدلب</option>
                    <option value={"درعا"} >درعا</option>
                    <option value={"السويداء"} >السويداء</option>
                    <option value={"القنيطرة"} >القنيطرة</option>
                    <option value={"دير الزور"} >دير الزور</option>
                    <option value={"الرقة"} >الرقة</option>
                    <option value={"الحسكة"} >الحسكة</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3 h-[110px]">
                     <label htmlFor="name" className="text-xs font-medium">
                      النوع
                      <span className='text-red-600 text-xs font-medium'>*</span>
                    </label>
                  <select
                    required
                    name="isCity"
                    id="isCity"
                    value={isCity}
                    onChange={e => setIsCity(e.target.value)}
                    className="rounded-xl  border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300">
                    <option value={""} >اختر مدينة او ريف</option>
                    <option value={"ريف"} >ريف
                    </option>
                    <option value={"مدينة"} >مدينة</option>


                  </select>
                </div>
                {/* المبلغ */}
                <div className="flex flex-col gap-3 h-[110px]">
                  <label htmlFor="name" className="text-xs font-medium">
                    المبلغ

                  </label>
                  <p
                    id="amount"
                    className="rounded-xl border-black/10 border px-5 h-[58px] py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                  >{amount}</p>
                  {errors.amount && <p className='text-red-600 text-base'>{errors.amount}</p>}
                </div>
                {/* كود المستلم */}
                {company == "Syriatel" ? number == "" && <div className="flex flex-col gap-3 h-[110px]">
                  <label htmlFor="code" className="text-xs font-medium">
                    كود المستلم
                    <span className='text-red-600 text-xs font-medium'>*</span>

                  </label>
                  <input
                    required
                    type="number"
                    name="code"
                    placeholder="*****"
                    id="code"
                    value={code}
                    onChange={e => handleChangeCode(e)}
                    className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                  />
                </div> : <div className="flex flex-col gap-3 h-[110px]">
                  <label htmlFor="code" className="text-xs font-medium">
                    كود المستلم
                    <span className='text-red-600 text-xs font-medium'>*</span>
                  </label>
                  <input

                    type="number"
                    name="code"
                    placeholder="*****"
                    id="code"
                    value={code}
                    onChange={e => handleChangeCode(e)}
                    className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                  />
                </div>}
                {/* رقم المستلم */}
                {company == "MTN" ? <div className="flex flex-col gap-3 h-[110px]">
                  <label htmlFor="number" className="text-xs font-medium">
                    رقم المستلم
                    <span className='text-red-600 text-xs font-medium'>*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    name="number"
                    placeholder="09********"
                    id="number"
                    value={number}
                    onChange={e => handleChangeNumber(e)}
                    className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                  />
                  {errors.phone && <p className='text-red-600 text-xs font-medium'>{errors.phone}</p>}
                </div> : null}

                <button
                  type='submit'
                  style={{
                    width: "274px",
                    height: "44px",
                  }}
                  className={`col-span-2 bg-main-color text-white rounded-lg flex-center main-button`}
                >
                  ارسل الآن
                </button>
              </>
              :
              prices == 2 ?
                <CircularProgress />
                :
                null
            }


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
        </form>
        :
        <p className='text-red-500' > ليس لديك صلاحية لارسال طلبات كازية
          <br></br>
          يمكنك مراجعة المسؤولين
        </p>
      }

      <ModalPob open={open} handleClose={handleStateOpen}>
        <DiscountedAmount fetchData={fetchData} setNewBalnces={setNewBalnces} Kazieh={true} data={data} amount={amount} handelClose={handleStateOpen} removeValues={removeValues} setSubmit={setSubmit} />
      </ModalPob>
    </>
  )
}