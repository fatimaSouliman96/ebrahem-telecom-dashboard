import React, { useEffect, useState } from 'react'
import LayoutTable from '../../components/Tabel/LayoutTable'
import clsx from 'clsx'
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie';
import { baseUrl } from '../../constants/baseUrl'

const token = Cookies.get('token');

export default function AccountStatement() {
    const navigate = useNavigate()
    const [submit, setSubmit] = useState(false)
    const [users, setUsers] = useState("")
    const [userId, setUserId] = useState()
    const [userDetails, setUserDetails] = useState()

    const fetchData = async () => {
        axios.request(
            {
                url: `${baseUrl}view_cash`,
                method: "get",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }

        ).then((res) => {
            setUsers(res.data.users)

        })
            .catch(e => {
                console.log(e)
                if (e.response.status == 401) {
                    console.log(e)
                    navigate("/")
                }
                toast.error("Faild to load data")
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)
       navigate("/dashboard/account_details", { state: { data: userId } })
    }

    return (
        <div>
            <h1 className="text-2xl lg:text-[32px] font-bold">كشف حساب زبون</h1>
            <LayoutTable title={"بحث عن نقطة بيع :"}>
                <form onSubmit={e => handleSubmit(e)} className='flex flex-col'>
                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="point" className="text-sm font-medium ">
                            بحث
                        </label>
                        <select
                            required
                            type="text"
                            name="point"
                            id="point"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                            className="  cursor-pointer selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                        >
                            <option></option>
                            {
                                users ?
                                    <>
                                        {/* <option className='text-gray-400' >اختر نقطة بيع</option> */}
                                        {users.map(ele => [
                                            <option value={ele.id} key={ele.id}>{ele.username}</option>
                                        ])}
                                    </>
                                    :
                                    <option> <CircularProgress /> يتم تحميل نقاط البيع</option>
                            }

                        </select>
                    </div>
                    <button
                        type='submit'
                        style={{
                            width: "274px",
                            height: "44px",
                        }}
                        className={`bg-main-color self-end text-white rounded-lg flex-center main-button mt-4`}
                    >
                        بحث
                    </button>
                </form>

                <div className={
                    clsx(
                        'w-full h-full flex justify-center items-center absolute top-0 left-0 bg-[#ffffff7e]',
                        {
                            'hidden'
                                : submit == false
                        }
                    )
                }>
                    <CircularProgress size={80} />
                </div>
            </LayoutTable>
        </div>
    )
}
