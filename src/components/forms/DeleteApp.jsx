import axios from 'axios'
import deleteIcon from '../../../public/assets/icons/delete.svg'
import { baseUrl } from '../../constants/baseUrl'
import toast from 'react-hot-toast'
import CircularProgress from "@mui/material/CircularProgress";
import clsx from 'clsx'
import { useState } from 'react'
import Cookies from 'js-cookie';


export default function DeleteApp({ handelClose, fetchData, id }) {

    console.log(id)
    const itemId = id
    const [submit, setSubmit] = useState(false)

    const deleteProvider = async (e) => {
        e.preventDefault()
        setSubmit(true)

        await axios.request(
            {
                url: `${baseUrl}apps/${itemId}`,
                method: "delete",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }

        )
            .then(res => {
                toast.success("تم حذف التطبيق بنجاح")
                fetchData()
                handelClose()
                setSubmit(false)

            })
            .catch(e => {
                e && toast.error("فشلت العملية")
                setSubmit(false)
            })


    }
    return (
        <div className='flex flex-col items-center w-[352px] gap-3'>
            <div className='flex justify-center items-center w-[100px] h-[100px] bg-[#EA0234] rounded-full'>
                <img src={deleteIcon} />
            </div>
            <p className='text-base font-semibold'> هل تريد حذف هذا التطبيق ؟</p>
            <div className='flex justify-between w-full gap-3'>
                <button onClick={() => handelClose()} className='w-1/2 h-[43px] border border-main-color rounded-xl text-main-color'>الغاء الأمر</button>
                <button onClick={(e) => deleteProvider(e)} className='w-1/2  h-[43px] rounded-xl text-white bg-[#EA0234]'>حذف</button>
            </div>
            <div className={
                clsx(
                    'w-full h-full z-50 flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
                    {
                        'hidden'
                            : submit == false
                    }
                )
            }>
                <CircularProgress />
            </div>
        </div>
    )
}

