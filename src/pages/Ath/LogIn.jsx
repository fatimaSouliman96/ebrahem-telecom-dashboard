import clsx from 'clsx'
import LogInForm from '../../components/forms/LogInForm'
import logo from '/public/assets/logo-login.svg'
import { useState } from 'react'
import CircularProgress from "@mui/material/CircularProgress";

export default function LogIn() {
    const [submit, setSubmit] = useState(false)
    
    return (
        <>
            <div className='flex w-full h-screen items-center justify-center '>
                <div className='w-[72%] flex shadow-2xl shadow-[#000000] rounded-[21px] h-[614px]'>
                    
                    <div className='text-right right w-1/2 h-full flex flex-col px-8 gap-14 justify-center'>
                        <p className='text-2xl font-semibold'>تسجيل الدخول</p>
                        <LogInForm setSubmit={setSubmit} />
                    </div>
                    <div className=' rounded-l-[21px] flex justify-center items-center p-12 left w-1/2 h-full bg-gradient-to-br from-[#282561] to-[#1D7291]'>
                        <img src={logo} />
                    </div>
                    
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
                    <CircularProgress/>
                </div>

            </div>
        </>


    )
}
