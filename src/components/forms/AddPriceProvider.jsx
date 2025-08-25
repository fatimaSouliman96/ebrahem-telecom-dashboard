import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { IOSSwitch } from '../elements/SwitchItem'
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast'

export default function AddPriceProvider({ fetchData, close }) {

    const [submit, setSubmit] = useState(false)
    const [name, setName] = useState("")
    const [allServisesProviders, setAllServisesProviders] = useState()

    const handleChangeProvider = (e) => {
        
    }



    const fetchDataProvider = async () => {
        await axios.request(
            {
                url: `${baseUrl}isp/list`,
                method: "get",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }
        ).then((res) => {
            setAllServisesProviders(res.data.data)

        })
            .catch(e => {
                console.log(e)
                e && toast.error("Faild")
            })
    }


    useEffect( () => {
        fetchDataProvider()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)
        let data = {
            name: name,
            is_active: fixedValue
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
        <form className="flex flex-col gap-1 w-96 h-fit" onSubmit={e => handleSubmit(e)}>
            <p className='text-xl font-semibold text-right'> إضافة مزود</p>
            <div className="flex flex-col gap-3 w-1/2">
                <label htmlFor="point" className="text-xs font-medium">
                    اسم المزود
                    <span className="text-red-600">*</span>
                </label>
                <select
                    required
                    type="text"
                    name="point"
                    id="point"
                    value={""}
                    onChange={e => handleChangeProvider(e)}
                    className="cursor-pointer selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                >
                    <option value={""} className='text-gray-400' >اختر نقطة بيع</option>
                    {
                        allServisesProviders ?
                            <>

                                {allServisesProviders.map(ele => [
                                    <option value={ele.id} key={ele.id}>{ele.name}</option>
                                ])}
                            </>
                            :
                            <option> <CircularProgress /> يتم تحميل  المزودات</option>
                    }

                </select>
            </div>


            <button
                type='submit'
                style={{
                    height: "44px",
                }}
                className={`bg-main-color w-1/2 self-end text-white rounded-lg flex-center main-button`}
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