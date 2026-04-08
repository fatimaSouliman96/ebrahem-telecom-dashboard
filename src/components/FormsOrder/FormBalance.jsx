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



export default function FormBalance({ fetchData, mobile }) {

  const [submit, setSubmit] = useState(false)
  const [open, setOpen] = useState(false)
  const [prices, setPrices] = useState(false)
  const [pricesData, setPricesData] = useState()
  const [topUpType, setTopUpType] = useState("")
  const [company, setCompany] = useState("")
  // const [orderType, setOrderType] = useState("")
  const [amount, setAmount] = useState()
  const [quantity, setQuantity] = useState()
  const [code, setCode] = useState()
  const [number, setNumber] = useState()
  const [options, setOptions] = useState([])
  const [price, setPrice] = useState()
  const [isFixed, setIsFixed] = useState(0)
  const [errorsQuantity, setErrorsQuantity] = useState('')

  const [data, setData] = useState()

  const [errors, setErrors] = useState({
    quantity: errorsQuantity,
    phone: "",
    amount: ""
  })

  const [balance, setBalance] = useState();
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
    let entredAmount = parseFloat(e.target.value)
    setErrors({
      quantity: "",
      phone: "",
      amount: ""
    })

    if (topUpType == "prepaid") {
      setAmount(entredAmount)
      valueBalance(entredAmount)
      
      options?.map(ele => {
        if (ele.price == entredAmount) {
            setPrice(ele.price);
          setIsFixed(ele.is_fixed);

          setQuantity(ele.minimum)
        }
      })
    } else {
      if (entredAmount == "") {
        setAmount("")
        setQuantity()
      } else {
        setQuantity(entredAmount)
        if (!quantityValdate(entredAmount)) {
          if (isFixed == 0) {
            let amountx = entredAmount * price 
            let x = ( amountx / 100 )
            let amountValue = x + entredAmount
            
            if (isDecimal(amountValue)) {
              let newValue = roundNumber(amountValue)
              setAmount(newValue)
              valueBalance(newValue)
            } else {
              setAmount(amountValue)
              valueBalance(amountValue)
            }
          } else {
            let amountValue = entredAmount + price
            if (isDecimal(amountValue)) {
              let newValue = roundNumber(amountValue)
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

  const handleChangeNumber = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // فقط أرقام
    setCode(value)
    let error = "";
    // if (!value) {
    //   error = "";
    // } else if (company == "MTN") {
    //   // MTN
    //   if (!value.startsWith("094") &&
    //     !value.startsWith("095") &&
    //     !value.startsWith("096")) {
    //     error = "يجب أن يبدأ الرقم بـ 094 أو 095 أو 096";
    //   } else if (value.length < 10) {
    //     error = "الرقم قصير جدًا، يجب أن يكون 10 أرقام";
    //   } else if (value.length > 10) {
    //     error = "الرقم طويل جدًا، يجب أن يكون 10 أرقام";
    //   }

    // } else if (company == "Syriatel") {
    //   // Syriatel
    //   if (!value.startsWith("093") &&
    //     !value.startsWith("098") &&
    //     !value.startsWith("099")) {
    //     error = "يجب أن يبدأ الرقم بـ 093 أو 098 أو 099";
    //   } else if (value.length < 10) {
    //     error = "الرقم قصير جدًا، يجب أن يكون 10 أرقام";
    //   } else if (value.length > 10) {
    //     error = "الرقم طويل جدًا، يجب أن يكون 10 أرقام";
    //   }
    // }
    setErrors({ ...errors, phone: error });
  };

  const handleChangeTopUpType = (e) => {
    setIsFixed()
    setPrices(false)
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
    setPrices(false)
    setErrors({
      quantity: "",
      phone: "",
      amount: ""
    })
    localStorage.setItem("company", e.target.value)
    localStorage.setItem("minimum", "")
    setCompany(e.target.value)
  }

  // const handleChangeOrderType = (e) => {
  //   setPrices(false)
  //   setErrors({
  //     quantity: "",
  //     phone: "",
  //     amount: ""
  //   })
  //   setOrderType(e.target.value)
  // }

  const fetchPrices = async (e) => {
    setPricesData()
    e.preventDefault();
    setCode("")
    setNumber("")
    setQuantity()
    setAmount("")

    if (user.roles[0].name !== "pointOfSale") {
      if (topUpType !== "" && company !== "") {
        getPrices()
      }
    } else {
      if (topUpType !== "" && company !== "") {
        getPrices()
      }
    }
  }

  const getPrices = async (e) => {


    setPrices(true)

    const formData = new FormData()

    formData.append("_method", "get")
    await axios.request({
      url: `${baseUrl}${user.roles[0].name == "pointOfSale" ? "" : "NewOutdoorOrder/"}getRetailPrices`,
      data: formData,
      method: "post",
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      }
    }
    )
      .then(res => {
        if (topUpType !== "prepaid") {

          const selectedPrice = res.data.prices.find(ele => ele.company === company && ele.top_up_type === topUpType);

          localStorage.setItem("minimum", selectedPrice.minimum)
         
          setOptions(selectedPrice)
          setPrice(selectedPrice.price);
          if(selectedPrice.is_fixed == null){
              setIsFixed(0)
          }else{
            
          setIsFixed(selectedPrice.is_fixed);
          }

        }
        else {
          const selectedPrice = res.data.prices.filter(ele => ele.company === company && ele.top_up_type === topUpType);

          localStorage.setItem("minimum", selectedPrice.minimum)
         
          setOptions(selectedPrice)
        
        }
        setPricesData(res.data.prices);
      })
      .catch(e => {
        if (e) {
          setPrices(false)
          toast.error("لم ينجح طلب الاسعار الرجاء المحاولة لاحقا")
        }

      })

  }

  const isErrorsEmpty = () => {
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (isErrorsEmpty()) {

      handleStateOpen()
      const formData = new FormData()

      formData.append("top_up_type", topUpType.toString())
      formData.append("company", company.toString())
      formData.append("code", code.toString())
      formData.append("quantity", quantity.toString())
      formData.append("amount", amount.toString())
      // user.roles[0].name !== "pointOfSale" && formData.append("order_type", orderType.toString())
      user.rank == "private" ? formData.append("special_client_unit_price", amount.toString()) : formData.append("unit_price", amount.toString())
      formData.append("source", "mobile")
      setData(formData)


    }
  }

  const removeValues = () => {
    getBalanses()

    setErrors({
      quantity: "",
      phone: "",
      amount: ""
    })
    setSubmit(false)
    setTopUpType("")
    setCompany("")
    setCode("")
    setNumber("")
    setQuantity()
    setAmount("")
  }

  return (

    <>
      {mobile == true ?
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
                <option value={"Wafaa"}>وفا</option>
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
                <option > </option>
                <option value={"lastpaid"}>لاحق الدفع</option>
                <option value={"prepaid"}>مسبق الدفع</option>
                <option value={"cash"}>كاش</option>
              </select>
            </div>
         
            {/* نوع الطلب */}
            {/* {user.roles[0].name !== "pointOfSale" &&
              <div className="flex flex-col gap-3 col-span-1 h-[110px]">
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


            {prices == true ?
              pricesData ? pricesData.length !== 0 ?
                <>
                  {/* الكمية */}
                  {
                    topUpType == "prepaid" ?
                      <div className="flex flex-col gap-3 h-[110px] ">
                        <label htmlFor="name" className="text-xs font-medium">
                          الكمية
                          <span className='text-red-600 text-xs font-medium'>*</span>
                        </label>
                        <select
                          type="number"
                          name="quantity"
                          placeholder=""
                          id="quantity"

                          onChange={e => handleChangeQuantity(e)}
                          className="selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                        >
                          <option></option>
                          {pricesData?.map(ele => {
                            if (topUpType == ele.top_up_type && company == ele.company) {
                              return <option key={ele.id} value={ele.price} >{ele.minimum}</option>
                            }

                          })

                          }
                        </select>
                      </div>
                      :
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

                  {/* رقم المستلم */}
                  {<div className="flex flex-col gap-3 h-[110px]">
                    <label htmlFor="code" className="text-xs font-medium">
                      رقم المستلم
                      <span className='text-red-600 text-xs font-medium'>*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="code"
                      placeholder="اكتب الرقم أو الكود"
                      id="code"
                      value={code}
                      onChange={e => handleChangeNumber(e)}
                      className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                    />
                    {errors.phone && <p className='text-red-600 text-xs font-medium'>{errors.phone}</p>}
                  </div>}

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
                <p>لا يوجد اسعار</p>
                :
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
        <p className='text-red-500' > ليس لديك صلاحية لارسال طلبات رصيد
          <br></br>
          يمكنك مراجعة المسؤولين
        </p>
      }
      <ModalPob open={open} handleClose={handleStateOpen}>
        <DiscountedAmount mobail={true} fetchData={fetchData} data={data} amount={amount} handelClose={handleStateOpen} removeValues={removeValues} setSubmit={setSubmit} />
      </ModalPob>
      
    </>
  )
}



