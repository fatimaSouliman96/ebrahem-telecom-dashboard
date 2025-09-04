import { useEffect, useState } from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import clsx from 'clsx'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import { baseUrl } from "../../constants/baseUrl";
import axios from 'axios'
import { fetchBalances } from '../../services/getBalances';



export default function KaziehForm({ fetchData, kazieh }) {

  const [submit, setSubmit] = useState(false)

  const [prices, setPrices] = useState(false)
  const [pricesData, setPricesData] = useState()
  const [topUpType, setTopUpType] = useState("")
  const [company, setCompany] = useState("")
  const [orderType, setOrderType] = useState("")
  const [amount, setAmount] = useState()
  const [quantity, setQuantity] = useState()
  const [code, setCode] = useState()
  const [number, setNumber] = useState()
  const [options, setOptions] = useState([])
  const [price, setPrice] = useState()
  const [isFixed, setIsFixed] = useState(0)
  const [partPrice, setPartPrice] = useState()
  const [newPartPrice, setNewPartPrice] = useState("")
  const [errorsQuantity, setErrorsQuantity] = useState('')

  const [errors, setErrors] = useState({
    quantity: errorsQuantity,
    phone: "",
    amount: ""
  })

  const [errorQuantity, setErrorQuantity] = useState("")

  const [balance, setBalance] = useState();

  const getBalanses = async () => {
    const res = await fetchBalances();
    setBalance(res.main_balance);
  };

  useEffect(() => {
    getBalanses();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"))


  const handleChangeQuantity = (e) => {
    setErrors({
      quantity: "",
      phone: "",
      amount: ""
    })

    setOptions(e.target.children)
    if (topUpType == "prepaid") {
      setAmount(e.target.value)
      console.log(e.target.value)
      valueBalance(e.target.value)
      setQuantity(e.target.value)
      options?.map(ele => {
        if (ele.value == e.target.value) {
          setQuantity(ele.textContent)
        }
      })
    } else {
      if (e.target.value == "") {
        setAmount("")
        setQuantity()
      } else {
        setQuantity(e.target.value)
        if (!quantityValdate(e.target.value)) {
          if (isFixed == 0) {

            let x = (e.target.value * parseInt(price)) / 100
            let amountValue = x + parseInt(e.target.value)
            setAmount(amountValue)
            valueBalance(amountValue)
          } else {
            let amountValue = parseInt(e.target.value) + parseInt(price)
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
      console.log("اصغر")
      setErrorsQuantity(`لا يمكن أقل من الحد الأدنى ${minValue}`);
      return true;
    } else if (parseInt(value) >= parseInt(localStorage.getItem("minimum"))) {
      console.log("اكبر")
      setErrorsQuantity("");
      return false;
    }
  };

  const valueBalance = (value) => {


    if (parseInt(value) < parseInt(balance)) {
      console.log(value)
      setErrors({ ...errors, amount: `` })
    }
    else if (parseInt(value) > parseInt(balance)) {
      console.log(value)
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

  const handleChangeOrderType = (e) => {
    setPrices(false)
    setErrors({
      quantity: "",
      phone: "",
      amount: ""
    })
    setOrderType(e.target.value)
  }

  const fetchPrices = async (e) => {
    setPricesData()
    e.preventDefault();
    setErrorQuantity("")
    setCode("")
    setNumber("")
    setQuantity()
    setAmount("")
    setPartPrice("")
    if (user.roles[0].name !== "pointOfSale") {
      if (topUpType !== "" && company !== "" && orderType !== "") {
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
    user.roles[0].name !== "pointOfSale" && formData.append("order_type", orderType)
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
          console.log(selectedPrice)
          localStorage.setItem("minimum", selectedPrice.minimum)
          setPrice(selectedPrice.price);
          setIsFixed(selectedPrice.is_fixed);
          setNewPartPrice(selectedPrice.minimum)
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

    // تحقق من كود المستخدم إذا كانت الشركة MTN
    if (company === "MTN" && (!code || code.trim() === "")) {
      toast.error("يرجى إدخال كود المستخدم لأن الشركة MTN");
      return;
    }

    if (isErrorsEmpty()) {
      setSubmit(true);
      const formData = new FormData();

      formData.append("top_up_type", topUpType);
      formData.append("company", company);
      code && formData.append("code", code);
      number && formData.append("number", number);
      formData.append("quantity", quantity);
      formData.append("amount", amount);
      // user.roles[0].name !== "pointOfSale" && formData.append("order_type", orderType);
      formData.append("unit_price", amount);
      formData.append("source", "kazieh");

      await axios
        .request({
          url: `${baseUrl}${user.roles[0].name == "pointOfSale" ? "" : "NewOutdoorOrder/"}top-up-request`,
          method: "post",
          data: formData,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          toast.success("تمت العملية بنجاح");
          getBalanses();
          fetchData();
          setErrors({
            quantity: "",
            phone: "",
            amount: "",
          });
          setSubmit(false);
          setTopUpType("");
          setCompany("");
          setCode("");
          setNumber("");
          setQuantity();
          setAmount("");
          setPrices(false)
        })
        .catch((e) => {
          if (e) {
            setSubmit(false);
            toast.error(e.response.data.data);
          }
        });
    }
  };


  return (
    <>
      {kazieh == true ?
        <form className="flex flex-col gap-4 " onSubmit={e => handleSubmit(e)}>
          <div className="grid grid-cols-2  w-full justify-between items-center gap-4">
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
            {/* نوع الطلب */}
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
            </div>}

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
        <p className='text-red-500' > ليس لديك صلاحية لارسال طلبات كازية
          <br></br>
          يمكنك مراجعة المسؤولين
        </p>
      }
    </>
  )
}