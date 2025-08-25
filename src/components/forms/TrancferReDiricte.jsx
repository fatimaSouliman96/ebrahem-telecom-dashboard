import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { baseUrl } from '../../constants/baseUrl';
import Cookies from 'js-cookie';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";;
import { fetchBalances } from '../../services/getBalances';

const token = Cookies.get('token');

export default function TrancferReDiricte({ fetchData, userIdPoint, userId, close, amountValue, num, method, note }) {
    console.log(method)
    const [submit, setSubmit] = useState(false)
    const [userName, setUserName] = useState(userIdPoint ? userIdPoint : "-")
    const [amount, setAmount] = useState(amountValue)
    const [transferMethod, setTransferMethod] = useState(method)
    const [transferNum, setTransferNum] = useState(num)
    const [notes, setNotes] = useState(note)
    const [notesAdmin, setNotesAdmin] = useState()
    const [errorAmount, setErrorAmount] = useState()


    const [balance, setBalance] = useState()
    const getBalanses = async () => {
        const res = await fetchBalances()
        setBalance(res.main_balance)
    }
    useEffect(() => {
        getBalanses()
    }, [])
    const handleChangeAmount = (e) => {
        setAmount(e.target.value)
        console.log(e.target.value)
        if (e.target.value > 0) {
            if (e.target.value > parseInt(balance)) {
                setErrorAmount(`لا يوجد رصيد كافي رصيدك ${balance}`)
            } else {
                setErrorAmount(``)
            }
        } else if (e.target.value == "") {
            setErrorAmount(``)
        }

    }

    const handleChangeNotes = (e) => {
        setNotesAdmin(e.target.value)
    }

    const handleSubmitReject= async (e) => {
        e.preventDefault()
        setSubmit(true)
        await axios.request(
            {
                url: `${baseUrl}add_payment_redirect/${userId}`,
                method: "post",
                data: {
                    amount: amount,
                    transfer_method: transferMethod,
                    transfer_number: transferNum,
                    notes: notesAdmin,
                    accept: 0,
                    order_type: "retail"
                },
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }


        ).then((res) => {
            toast.success("تمت رفض الطلب بنجاح")
            fetchBalances()
            close()
            setSubmit(false)
            fetchData()
        }).catch((e) => {
            console.log(e)
            if (e) {
                toast.error("فشلت العملية")
                setSubmit(false)
            } else {
                return
            }

        })

    }

     const handleSubmitAdd = async (e) => {
        e.preventDefault()
        setSubmit(true)
        await axios.request(
            {
                url: `${baseUrl}add_payment_redirect/${userId}`,
                method: "post",
                data: {
                    amount: amount,
                    transfer_method: transferMethod,
                    transfer_number: transferNum,
                    notes: notesAdmin,
                    accept: 1,
                    order_type: "retail"
                },
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }


        ).then((res) => {
            toast.success("تمت قبول الطلب بنجاح")
            fetchBalances()
            close()
            setSubmit(false)
            fetchData()
        }).catch((e) => {
            console.log(e)
            if (e) {
                toast.error("فشلت العملية")
                setSubmit(false)
            } else {
                return
            }

        })

    }
    return (
        <form className="flex flex-col gap-4 w-[400px]" >
            <div className="flex w-full justify-between gap-4">
                <div className="flex flex-col gap-3 w-1/2">
                    <label htmlFor="point" className="text-xs font-medium text-right">
                        نقطة البيع

                    </label>
                    <p className="text-right cursor-pointer  rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300">
                        {userName}
                    </p>

                </div>
                <div className="flex flex-col gap-3 w-1/2">
                    <label htmlFor="amount" className="text-xs font-medium text-right">
                        المبلغ
                        <span className="text-red-600">*</span>
                    </label>
                    <p onChange={e => handleChangeAmount(e)}
                        id="amount"
                        className="text-right rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                    >{amount}</p>
                    {errorAmount && <p className='text-red-600 text-base text-right'>{errorAmount}</p>}
                </div>
            </div>
            <div className="flex w-full justify-between gap-4">
                <div className="flex flex-col gap-3 w-1/2">
                    <label htmlFor="way" className="text-xs font-medium text-right">
                        طريقة التحويل
                        <span className="text-red-600">*</span>
                    </label>
                    <p
                        className="text-right rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                    >{transferMethod}</p>
                </div>

                <div className="flex flex-col gap-3 w-1/2">
                    <label htmlFor="number" className="text-xs font-medium text-right">
                        رقم الحوالة
                        <span className="text-red-600">*</span>
                    </label>
                    <p
                        className="text-right rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                    >{transferNum}</p>
                </div>

            </div>
            <div className="flex flex-col gap-3 w-full">
                <label htmlFor="notes" className="text-xs font-medium text-right">
                    ملاحظات الزبون
                </label>
                <p
                    id="notes"
                    className="text-right rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                >{notes}</p>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <label htmlFor="notes" className="text-xs font-medium text-right">
                    ملاحظات
                </label>
                <input

                    type="text"
                    name="notes"
                    value={notesAdmin}
                    onChange={e => handleChangeNotes(e)}
                    id="notes"
                    className="text-right rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                />
            </div>
            <div className='w-full flex items-center justify-between' >
                <button
                    onClick={ (e) => handleSubmitAdd(e)}
                    type='button'
                    style={{
                        height: "44px",
                    }}
                    className={`w-[45%] bg-main-color text-white rounded-lg flex-center main-button`}
                >
                    قبول
                </button>
                <button
                    onClick={ (e) => handleSubmitReject(e)}
                    type='button'
                    style={{
                        height: "44px",
                    }}
                    className={`w-[45%] border border-main-color text-main-color rounded-lg flex-center main-button`}
                >
                    رفض
                </button>
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
    );
}