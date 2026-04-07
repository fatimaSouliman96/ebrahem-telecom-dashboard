import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Cookies from 'js-cookie';
import { baseUrl } from '../../constants/baseUrl'
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";;
import { fetchBalances } from '../../services/getBalances';
import ModalPob from '../Modals/Modal';
import DiscountedAmount from '../elements/DiscountedAmount';



export default function FormBill({ fetchData, setting }) {

  const [open, setOpen] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [billType, setBillType] = useState("")
  const [counter, setCounter] = useState("")
  const [city, setCity] = useState("")
  const [name, setName] = useState("")
  const [amount, setAmount] = useState()
  const [errors, setErrors] = useState({
    amount: ""
  })
  // const [orderType, setOrderType] = useState()
  const [barCode, setBarCode] = useState()
  const [subscription, setSubscription] = useState()
  const [number, setNumber] = useState()
  const [providerId, setProviderId] = useState()
  const [Id, setId] = useState()
  const [staticId, setStaticId] = useState()
  const [confirm, setConfirm] = useState(false)
  const [data, setData] = useState()
  const [url, setUrl] = useState()
  const [isFixed, setIsFixed] = useState()
  const [price, setPrice] = useState()
  const [balance, setBalance] = useState();
  const [serviceProvider, setServiceProvider] = useState([])
  const [bundles, setBundles] = useState()
  const [discountAmount, setDiscountAmount] = useState()
  const [isFinal, setIsFinal] = useState()
  const [isHand, setIsHand] = useState()
  const [providerPrice, setProviderPrice] = useState()
  const [bundlePrice, setBundlePrice] = useState()
  const [sendAmount, setSendAmount] = useState()
  const [netAmount, setNetAmount] = useState()

  const isDecimal = (num) => num % 1 !== 0;
  const roundNumber = num => Math.ceil(num);

  const handleStateOpen = () => {
    setOpen(!open)
  }
  const getBalanses = async () => {
    const res = await fetchBalances();
    setBalance(res.main_balance);
  };

  const getServiceProvider = async () => {
    const res = await axios.request(
      {
        method: "get",
        url: `${baseUrl}internet-service-providers`,
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')}`,
        }
      }
    )
    if (res.status == 200) {
      setServiceProvider(res.data)
    }
  }
  const fetchs = async (id) => {
    await axios.request(
      {
        method: "get",
        url: `${baseUrl}isp/isp-bundles/${id}`,
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')}`,
        }
      })
      .then(res => {
        setBundles(res.data)
      })

  }
  useEffect(() => {
    getBalanses();

    setting.electricity == true && getServiceProvider()

  }, []);
  const user = JSON.parse(localStorage.getItem("user"))
  const handleChangestaticId = (e) => {
    setStaticId(e.target.value)
  }
  const handleChangeProviderId = (e) => {
    setNetAmount()
    setSendAmount()
    setId("")
    setProviderId(e.target.value)
    const selectedProvider = serviceProvider.filter(ele => ele.id == e.target.value)
    setIsFinal(selectedProvider[0].is_final)
    if (selectedProvider[0].is_fixed == null) {
      setIsFixed(0)
    } else {
      setIsFixed(selectedProvider[0].is_fixed)
    }

    setIsHand(selectedProvider[0].is_hand)
    setProviderPrice(parseFloat(selectedProvider[0].price))
    fetchs(e.target.value)
  }
  const handleChangeId = (e) => {
    setNetAmount()
    setSendAmount()
    setAmount()
    setId(e.target.value)
    const selectedBundle = bundles.filter(ele => ele.id == e.target.value)
    setBundlePrice(selectedBundle[0].price)
    if (isFinal == 1) {
      setSendAmount(selectedBundle[0].price)
      setAmount(selectedBundle[0].price)
    } else if (isHand == 0) {
      if (isFixed == 0) {
        let x = bundlePrice * providerPrice
        let y = x / 100
        let newAmount = y + bundlePrice
        setAmount(newAmount)
        setSendAmount(bundlePrice)
      } else {
        let newAmount = bundlePrice + providerPrice
        setAmount(newAmount)
        setSendAmount(bundlePrice)
      }
    } else {
      return
    }
  }
  const handleChangeNumber = (e) => {
    setNumber(e.target.value)
  }
  const handleChangeBillType = (e) => {
    setAmount("")
    setBillType(e.target.value)
    switch (e.target.value) {
      case "water":
        fetchPrices("water")
        break;
      case "elec":
        fetchPrices("electricity")
        break;
      case "net":
        fetchPrices("internet")
        break;
      case "line":
        fetchPrices("fixed-line")
        break;

      default:
        break;
    }
  }
  const handleChangeCounter = (e) => {
    setCounter(e.target.value)
  }
  const handleChangeCity = (e) => {
    setCity(e.target.value)
  }
  const handleChangename = (e) => {
    setName(e.target.value)
  }
  const handleChangeAmountNet = (e) => {
    setNetAmount(e.target.value)
    let value = parseInt(e.target.value)
    amountFunNet(value)
  }
  const amountFunNet = (valueAmount) => {

    if (isFixed == 0) {
      let y = valueAmount * providerPrice
      let z = y / 100
      console.log(valueAmount * providerPrice)
      console.log(y / 100)
      console.log(z + valueAmount)
      let newAmount = z + valueAmount
      setAmount(newAmount)
      setSendAmount(valueAmount)
      console.log(newAmount)
    } else {
      let newAmount = valueAmount + providerPrice
      setAmount(newAmount)
      setSendAmount(valueAmount)
    }
  }
  const handleChangeAmount = (e) => {
    setAmount(e.target.value)
    if (e.target.value > 0) {
      if (e.target.value > parseInt(balance)) {
        setErrors({ ...errors, amount: `لا يوجد  رصيد كافي رصيدك  ${balance}` })
      } else {
        setErrors({ ...errors, amount: `` })
        setAmount(e.target.value)
      }
    } else {
      setAmount("")
    }

  }
  const handleChangeBarCode = (e) => {
    if (e.target.value > 0) {
      setBarCode(e.target.value)
    } else {
      setBarCode("")
    }

  }
  const handleChangesubscription = (e) => {

    setSubscription(e.target.value)


  }
  const discountAmountFun = () => {
    if (isFixed == true) {
      let newAmount = price + parseInt(amount)
      if (isDecimal(newAmount)) {
        let roundedValue = roundNumber(newAmount)
        setDiscountAmount(roundedValue)
      } else {
        setDiscountAmount(newAmount)
      }
    } else {
      let x = price * parseInt(amount)
      let y = x / 100
      let value = y + parseInt(amount)
      if (isDecimal) {
        let roundedValue = roundNumber(value)
        setDiscountAmount(roundedValue)
      } else {
        setDiscountAmount(value)
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    discountAmountFun()
    switch (billType) {
      case "water":
        setUrl("water-bill")
        user.roles[0].name === "pointOfSale" ? setData({
          counter_number: counter,
          governorate: city,
          barcode_number: barCode,
          customer_name: name,
          amount: amount,
          order_type: "wholesale",
          action: "payment"
        })

          :
          setData({
            counter_number: counter,
            governorate: city,
            barcode_number: barCode,
            customer_name: name,
            amount: amount,
            order_type: "wholesale",
            action: "payment"
          })
        break;
      case "elec":
        setUrl("electricity-bill")
        user.roles[0].name === "pointOfSale" ?
          setData({
            counter_number: counter,
            governorate: city,
            subscription_number: subscription,
            customer_name: name,
            amount: amount,
            order_type: "wholesale",
            action: "payment"
          })
          :
          setData({
            counter_number: counter,
            governorate: city,
            subscription_number: subscription,
            customer_name: name,
            amount: amount,
            order_type: "wholesale",
            action: "payment"
          })
        break;
      case "net":
        setUrl("internet-bill")
        user.roles[0].name === "pointOfSale" ?
          setData({
            number: number,
            order_type: "wholesale",
            internet_service_provider_id: providerId,
            static_IP: staticId,
            customer_name: name,
            amount: sendAmount,
            bundle: Id,
            action: "payment"
          })
          :
          setData({
            number: number,
            internet_service_provider_id: providerId,
            static_IP: staticId,
            order_type: "wholesale",
            customer_name: name,
            amount: sendAmount,
            bundle: Id,
            action: "payment"
          })
        break;
      case "line":
        setUrl("fixed-line-bill")
        user.roles[0].name === "pointOfSale" ?
          setData({
            number: number,
            order_type: "wholesale",
            customer_name: name,
            amount: amount,
            action: "payment"
          })
          :
          setData({
            number: number,
            order_type: "wholesale",
            customer_name: name,
            amount: amount,
            action: "payment"
          })
        break;
      default:
        break;

    }
    handleStateOpen()


  }
  const fetchPrices = async (billName) => {
    await axios.request(
      {
        url: `${baseUrl}prices/${billName}`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }

    ).then((res) => {
      if (res.data.is_fixed == null) {
        setIsFixed(false)
      } else {
        setIsFixed(res.data.is_fixed)
      }
      setPrice(res.data.price)
    })
      .catch(e => {
        console.log(e)

      })
  }
  const removeValues = () => {
    getBalanses()
    user.roles[0].name !== "pointOfSale" && fetchData(1)
    setAmount("")
    setBarCode("")
    setCity("")
    setName("")
    setCounter("")
    setSubscription("")
    setProviderId("")
    setStaticId("")
    setNumber("")
    setBillType("")
    setId("")
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={e => handleSubmit(e)}>
      <div className="grid grid-cols-3 w-full justify-between gap-4">
        {/* bill type */}
        <div className="flex flex-col gap-3 ">
          <label htmlFor="point" className="text-xs font-medium">
            نوع الفاتورة
            <span className='text-red-600 text-xs font-medium'>*</span>
          </label>
          <select
            required
            value={billType}
            onChange={e => handleChangeBillType(e)}
            type="text"
            name="order"
            id="point"
            className="selection appearance-none  rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          >
            <option value={""}></option>
            {setting.water == true && <option value={"water"}>مياه</option>}
            {setting.electricity == true && <option value={"elec"}>كهرباء</option>}
            {setting.adsl == true && <option value={"net"}>انترنت</option>}
            {setting.fixed_line == true && <option value={"line"}>أرضي</option>}
          </select>
        </div>
        {/* counter mumber */}
        {billType == "water" || billType == "elec" ? <div className="flex flex-col gap-3 ">
          <label htmlFor="name" className="text-xs font-medium">
            رقم العداد
            <span className='text-red-600 text-xs font-medium'>*</span>
          </label>
          <input
            required
            value={counter}
            onChange={e => handleChangeCounter(e)}
            type="number"
            name="counter"
            placeholder=""
            id="counter"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
        </div> : null}
        {/* city */}
        {billType == "water" || billType == "elec" ? <div className="flex flex-col gap-3 ">
          <label htmlFor="city" className="text-xs font-medium">
            المحافظة
            <span className='text-red-600 text-xs font-medium'>*</span>
          </label>
          <select
            required
            value={city}
            onChange={e => handleChangeCity(e)}
            type="text"
            name="city"
            placeholder=""
            id="city"
            className="selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          >
            <option value="" disabled>اختر المحافظة</option>
            <option value={"دمشق"}>دمشق</option>
            <option value={"ريف دمشق"}>ريف دمشق</option>
            <option value={"حلب"}>حلب</option>
            <option value={"حمص"}>حمص</option>
            <option value={"حماة"}>حماة</option>
            <option value={"اللاذقية"}>اللاذقية</option>
            <option value={"طرطوس"}>طرطوس</option>
            <option value={"إدلب"}>إدلب</option>
            <option value={"درعا"}>درعا</option>
            <option value={"السويداء"}>السويداء</option>
            <option value={"القنيطرة"}>القنيطرة</option>
            <option value={"دير الزور"}>دير الزور</option>
            <option value={"الرقة"}>الرقة</option>
            <option value={"الحسكة"}>الحسكة</option>

          </select>
        </div> : null}
        {/* barcode */}
        {billType == "water" &&
          <div className="flex flex-col gap-3 ">
            <label htmlFor="city" className="text-xs font-medium">
              رقم البار كود
              <span className='text-red-600 text-xs font-medium'>*</span>
            </label>
            <input
              required
              value={barCode}
              onChange={e => handleChangeBarCode(e)}
              type="number"
              name="amount"
              placeholder=""
              id="amount"
              className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            />
          </div>
        }
        {/* subscription */}
        {billType == "elec" &&
          <div className="flex flex-col gap-3 ">
            <label htmlFor="city" className="text-xs font-medium">
              الاشتراك
              <span className='text-red-600 text-xs font-medium'>*</span>
            </label>
            <input
              required
              value={subscription}
              onChange={e => handleChangesubscription(e)}
              type="text"
              name="subscription"
              placeholder=""
              id="subscription"
              className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            />
          </div>}
        {/* name castumer */}
        <div className="flex flex-col gap-3 ">
          <label htmlFor="city" className="text-xs font-medium">
            اسم الزبون
            <span className='text-red-600 text-xs font-medium'>*</span>
          </label>
          <input
            required
            value={name}
            onChange={e => handleChangename(e)}
            type="text"
            name="name"
            placeholder=""
            id="name"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
        </div>
        {/* amount */}
        {billType !== "net" && <div className="flex flex-col gap-3 ">
          <label htmlFor="city" className="text-xs font-medium">
            المبلغ
            <span className='text-red-600 text-xs font-medium'>*</span>
          </label>
          <input
            required
            value={amount}
            onChange={e => handleChangeAmount(e)}
            type="number"
            name="amount"
            placeholder={`باقي ${balance}`}
            id="amount"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
          {errors.amount !== "" && <p className='text-red-600'>{errors.amount}</p>}
        </div>}
        {/* number */}


        {billType == "net" || billType == "line" ? <div className="flex flex-col gap-3 ">
          <label htmlFor="city" className="text-xs font-medium">
            الرقم
            <span className='text-red-600 text-xs font-medium'>*</span>
          </label>
          <input
            required
            value={number}
            onChange={e => handleChangeNumber(e)}
            type="tel"
            name="number"
            placeholder={"*******"}
            id="number"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
          {errors.amount !== "" && <p className='text-red-600'>{errors.amount}</p>}
        </div> : null}
        {/* معرف مزود خدمة الانترنت */}
        {billType == "net" ?
          <div className="flex flex-col gap-3 ">
            <label htmlFor="city" className="text-xs font-medium">
              معرف مزود خدمة الانترنت
              <span className='text-red-600 text-xs font-medium'>*</span>
            </label>
            <select
              required
              value={providerId}
              onChange={e => handleChangeProviderId(e)}
              name="providerId"
              id="point"
              className="selection appearance-none  rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            >
              <option value={""}></option>
              {
                serviceProvider ? serviceProvider?.length !== 0 ? serviceProvider?.map(ele => {
                  return <option value={ele.id}>{ele.name}</option>
                })
                  :
                  <option>لا يوجد مزودات</option>
                  :
                  <option>يوجد خطأ ما الرجاء المحاولة لاحقا</option>
              }
            </select>
            {errors.amount !== "" && <p className='text-red-600'>{errors.amount}</p>}
          </div> : null}
        {billType == "net" ?
          isHand == 0 && <div className="flex flex-col gap-3 ">
            <label htmlFor="city" className="text-xs font-medium">
              الباقة
              <span className='text-red-600 text-xs font-medium'>*</span>
            </label>
            <select
              required
              value={Id}
              onChange={e => handleChangeId(e)}
              name="providerId"
              id="point"
              className="selection appearance-none  rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            >
              <option value={""}></option>
              {
                bundles?.map(ele => {
                  return <option value={ele.id}>{ele.bundel} {ele.price} </option>
                })
              }
            </select>
            {errors.amount !== "" && <p className='text-red-600'>{errors.amount}</p>}
          </div> : null}
        {
          billType == "net" &&
            isFinal == 0 ?
            isHand == 1 ?
              <div className="flex flex-col gap-3 ">
                <label htmlFor="city" className="text-xs font-medium">
                  المبلغ
                  <span className='text-red-600 text-xs font-medium'>*</span>
                </label>
                <input
                  required
                  value={netAmount}
                  onChange={e => handleChangeAmountNet(e)}
                  type="number"
                  name="amount"
                  placeholder={`باقي ${balance}`}
                  id="amount"
                  className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                />
                {errors.amount !== "" && <p className='text-red-600'>{errors.amount}</p>}
              </div>
              :
              null
            :
            null
        }
        {/* معرف ثابت */}
        {billType == "net" ? <div className="flex flex-col gap-3 ">
          <label htmlFor="city" className="text-xs font-medium">
            المعرف ثابت
          </label>
          <input
            value={staticId}
            onChange={e => handleChangestaticId(e)}
            type="number"
            name="number"
            placeholder={""}
            id="number"
            className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
          />
          {errors.amount !== "" && <p className='text-red-600'>{errors.amount}</p>}
        </div> : null}
        {/* order type */}
        {/* {user.roles[0].name !== "pointOfSale" ||
          user.roles[0].name !== "pointOfSale" ?
          <div className="flex flex-col gap-3 ">
            <label htmlFor="city" className="text-xs font-medium">
              نوع الطلب
              <span className='text-red-600 text-xs font-medium'>*</span>
            </label>
            <select
              required
              value={orderType}
              onChange={e => handleChangeOrderType(e)}
              name="orderType"
              id="orderType"
              className="selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
            >
              <option></option>
              <option value={"retail"}>مفرق</option>
              <option value={"wholesale"}>جملة</option>
              <option value={"private"}>خاص</option>
            </select>
          </div> : null} */}
      </div>

      <button
        type='submit'
        style={{
          width: "274px",
          height: "44px",
        }}
        className={`bg-main-color text-white rounded-lg flex-center main-button`}
      >
        ارسل الآن
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

      <ModalPob open={open} handleClose={handleStateOpen}>
        <DiscountedAmount url={url} data={data} setConfirm={setConfirm} amount={
          billType == "net" ? amount : discountAmount
        } handelClose={handleStateOpen} removeValues={removeValues} setSubmit={setSubmit} />
      </ModalPob>
    </form>

  )
}
