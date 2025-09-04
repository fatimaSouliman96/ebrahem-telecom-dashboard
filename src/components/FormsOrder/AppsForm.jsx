import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../constants/baseUrl'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import CircularProgress from "@mui/material/CircularProgress";;
import { fetchBalances } from '../../services/getBalances';

export default function AppsForm({ application }) {

    const [submit, setSubmit] = useState(false)
    const [app, setApp] = useState("")
    const [id, setId] = useState()
    const [productId, setProductId] = useState("")
    const [amount, setAmount] = useState()
    const [qyt, setQyt] = useState()
    const [isFixed, setIsFixed] = useState()
    const [price, setPrice] = useState()
    const [appPrice, setAppPrice] = useState()
    const [sendAmount, setSendAmount] = useState()
    const [apps, setApps] = useState([])
    const [allApps, setAllApps] = useState([])
    const [bouquets, setBouquets] = useState([])
    const [bundellName, setBundellName] = useState()

    const [min, setMin] = useState(1)
    const [max, setMax] = useState(1)
    const [type, setType] = useState()

    const [errorsQyt, setErrorsQyt] = useState("")
    const [errorsAmount, setErrorsAmount] = useState("")

    const [balance, setBalance] = useState();

    const getBalanses = async () => {
        const res = await fetchBalances();
        setBalance(res.main_balance);
    };


    const user = JSON.parse(localStorage.getItem("user"))

    const isDecimal = (num) => num % 1 !== 0;
    const roundNumber = num => Math.ceil(num);


    const handleChangeApp = (value) => {
        setProductId("")
        setMin(1)
        setMax(1)
        setErrorsQyt("")
        setErrorsAmount("")
        setAmount("")
        setBundellName("")
        setApp(value)
        const newApp = apps.filter(e => e.id == value)
        const newBouquets = allApps.filter(e => e.game === newApp[0].game)
        setBouquets(newBouquets)
    }

    const handleChangeBouguet = (e) => {
        setProductId(e.target.value)
        console.log("change ==========")
        console.log(e.target.value)
        const id = e.target.value
        const bouqet = allApps.filter(e => e.id == id)
        setErrorsQyt("")
        setErrorsAmount("")
        setAmount("")
        setQyt("")

        const options = Array.from(e.target.options || []);
        options.forEach((o) => {
            if (o.selected === true) {
                setBundellName(o.text)
            }
        });


        setType(bouqet[0].type)
        if (isDecimal(bouqet[0].price)) {

            let roundPrice = roundNumber(bouqet[0].price)
            setAppPrice(roundPrice)
            if (bouqet[0].min == 1 && bouqet[0].max == 1) {

                if (isFixed == 0) {
                    isFixed0AndMin1(roundPrice)
                } else if (isFixed == 1) {

                    isFixed1AndMin1(roundPrice)
                } else {
                    null
                }
            } else {
                null
            }
        } else {
            setAppPrice(bouqet[0].price)
            if (bouqet[0].min == 1 && bouqet[0].max == 1) {
                if (isFixed == 0) {
                    isFixed0AndMin1(bouqet[0].price)
                } else if (isFixed == 1) {
                    isFixed1AndMin1(bouqet[0].price)
                } else {
                    null
                }
            } else {
                null
            }
        }
        setMin(bouqet[0].min)
        setMax(bouqet[0].max)
    }

    const handleChangeQyt = (e) => {

        setErrorsQyt("")
        setQyt(e.target.value)
        if (e.target.value < min || e.target.value > max) {
            setErrorsQyt(`يجب ان تكون الكمية بين ${min} و ${max}`)
        } else {
            setErrorsQyt("")
            if (isFixed === 0) {
                isFixed0AndMinNot1(e.target.value)
            } else if (isFixed === 1) {
                isFixed1AndMinNot1(e.target.value)
            } else {
                null
            }
        }

    }

    const isFixed0AndMin1 = (valuePrice) => {
        setQyt("1")
        const value = ((price * valuePrice) / 100) + parseInt(valuePrice)
        setSendAmount(valuePrice)
        setAmount(value)
        valdutionAmount(value)
    }

    const isFixed0AndMinNot1 = (valueQyt) => {
        if (isFixed == 0) {
            if (min !== 1 || max !== 1) {
                const value = (((valueQyt * appPrice) * price) / 100) + parseInt((valueQyt * appPrice))
                setSendAmount(appPrice * valueQyt)
                valdutionAmount(value)
                setAmount(value)
            }
        }
    }

    const isFixed1AndMin1 = (valuePrice) => {
        setQyt("1")
        if (isFixed == 1) {
            if (min == 1 && max == 1) {
                const value = parseInt(price) + parseInt(valuePrice)
                setSendAmount(valuePrice)
                valdutionAmount(value)
                setAmount(value)
            }
        }
    }
    const isFixed1AndMinNot1 = () => {
        if (isFixed == 1) {
            if (min !== 1 || max !== 1) {
                const value = (appPrice * qyt) + price
                setSendAmount(appPrice * qyt)
                valdutionAmount(value)
                setAmount(value)
            }
        }
    }



    const valdutionAmount = (value) => {
        if (value > parseInt(balance)) {
            setErrorsAmount(`لا يوجد رصيد كافي رصيدك ${balance}`)
        } else {
            setErrorsAmount("")
        }
    }
    const fetchApps = async () => {
        await axios.request(
            {
                url: `${baseUrl}getProductList/${user.id}`,
                method: "get",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }
        )
            .then(res => {
                setAllApps(res.data.products)
                setIsFixed(res.data.is_fixed)
                setPrice(res.data.price)
                const uniqueApps = res.data.products.filter((app, index, self) =>
                    index === self.findIndex((a) => a.game === app.game)
                );


                setApps(uniqueApps);
            })
            .catch(e => {
                toast.error("فشلت العملية")
                setSubmit(false)
            })

    }

    useEffect(() => {
        if (application == true) {
            fetchApps()
            getBalanses()
        }

    }, [])

    const onSubmit = async (e) => {
        console.log("submit ==========")
        console.log(productId)
        setSubmit(true)

        e.preventDefault()


        await axios.request(
            {
                url: `${baseUrl}pay-application-pay`,
                method: "post",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
                data: {
                    customer_name: user.name,
                    amount: sendAmount,
                    action: "payment",
                    product_id: productId,
                    player_id: id,
                    qty: qyt,
                    type: type,
                    bundle: bundellName
                }
            }
        )
            .then(res => {
                setSubmit(false)
                setApp("")
                setQyt("")
                setAmount('')
                setSendAmount("")
                setProductId("")
                setId("")
                setMax(1)

                toast.success("تمت العملية بنجاح سوف يتم مراجعة الطلب")

            })
            .catch(e => {
                toast.error("فشلت العملية")
                setSubmit(false)
            })

    }


    return (
        <>
            {
                application == true ?
                    <>
                        <form className="flex flex-col gap-4" onSubmit={e => onSubmit(e)} >
                            <div className="grid grid-cols-2 w-full justify-between gap-4">
                                <div className="flex flex-col gap-3 ">
                                    <label htmlFor="name" className="text-xs font-medium">
                                        اسم التطبيق
                                        <span className='text-red-600 text-xs' >*</span>
                                    </label>
                                    <select
                                        required
                                        type="text"
                                        name="name"
                                        value={app}
                                        onChange={e => handleChangeApp(e.target.value)}
                                        id="name"
                                        className="selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                                    >

                                        <option value="" disabled >اختر التطبيق</option>
                                        {
                                            apps ? apps.map(app => {
                                                return <option key={app.id} value={app.id} >{app.game}</option>
                                            })
                                                :
                                                <p className='text-sm text-main-color font-medium' >يتم تحميل التطبيقات</p>
                                        }
                                    </select>
                                </div>
                                <div className="flex flex-col gap-3 ">
                                    <label htmlFor="name" className="text-xs font-medium">
                                        الباقة
                                        <span className='text-red-600 text-xs' >*</span>
                                    </label>
                                    <select
                                        required
                                        type="text"
                                        name="name"
                                        value={productId}
                                        onChange={e => handleChangeBouguet(e)}
                                        id="name"
                                        className="selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                                    >
                                        <option value="" disabled>اختر باقة</option>
                                        {
                                            bouquets ? bouquets.map((app, index) => {
                                                return <option key={index} value={app.id} >{app.name}</option>
                                            })
                                                :
                                                <p className='text-sm text-main-color font-medium' >يتم تحميل الباقات</p>
                                        }
                                    </select>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="city" className="text-xs font-medium">
                                        أدخل ID الزبون
                                        <span className='text-red-600 text-xs' >*</span>
                                    </label>
                                    <input

                                        value={id}
                                        onChange={e => {
                                            setId(e.target.value)
                                            max == 1 && setQyt(1)

                                        }}
                                        required
                                        type="number"
                                        name="amount"
                                        placeholder=""
                                        id="amount"
                                        className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                                    />
                                </div>
                                {max !== 1 && <div className="flex flex-col gap-3 ">
                                    <label htmlFor="city" className="text-xs font-medium">
                                        الكمية
                                        <span className='text-red-600 text-xs' >*</span>
                                    </label>
                                    <input
                                        value={qyt}
                                        onChange={e => handleChangeQyt(e)}
                                        required
                                        type="number"
                                        name="amount"
                                        placeholder={`يجب ان تكون الكمية بين ${min} و ${max}`}
                                        id="amount"
                                        className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                                    />
                                    {errorsQyt !== "" && <p className='text-red-600 text-xs'>{errorsQyt}</p>}
                                </div>}
                                <div className="flex flex-col gap-3 ">
                                    <label htmlFor="city" className="text-xs font-medium">
                                        المبلغ
                                        <span className='text-red-600 text-xs' >*</span>
                                    </label>
                                    <p
                                        required
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        className="h-[58px] rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                                    >{amount}</p>
                                    {errorsAmount !== "" && <p className='text-red-600 text-xs' >{errorsAmount}</p>}
                                </div>
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
                        </form>
                        {submit && <div className='w-full h-full flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]'>
                            <CircularProgress />
                        </div>}
                    </>
                    :
                    <p className='text-red-500' > ليس لديك صلاحية لارسال طلبات تطبيقات
                        <br></br>
                        يمكنك مراجعة المسؤولين
                    </p>
            }
        </>
    )
}
