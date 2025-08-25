import axios from 'axios'
import { useState } from 'react'
import { baseUrl } from '../../constants/baseUrl'
import toast from 'react-hot-toast'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Cookies from 'js-cookie';
import CircularProgress from "@mui/material/CircularProgress";;
import clsx from 'clsx';

export default function UploadFile({setSubmit, choose, fetchData, handleClose, submit }) {
      const [unitFile, setUnitFile] = useState()
      const [fileSet, setFileSet] = useState(false)
      const [fileValue, setFileValue] = useState()

    const handleUpadteUntis = async (e) => {
        e.preventDefault()
        setSubmit(true)
        const data = new FormData()
        data.append("file", unitFile)
        let unitUrl = `unit-prices/import`
        let billUrl = `bill-prices/import`
        await axios.request({
            url: `${baseUrl}${choose == 4 ? billUrl : unitUrl}`,
            method: "post",
            headers: {
                "Accept": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            data: data
        })
            .then(res => {
                toast.success("تم رفع الملف الجديد بنجاح")
                fetchData()
                handleClose()
                setSubmit(false)
                setFileValue("")
                setUnitFile("")
                setFileSet(false)
            })
            .catch(e => {
                toast.error("فشلت العملية")
                setSubmit(false)
            })

    }
    return (
        <>
            <form onSubmit={e => handleUpadteUntis(e)} className='flex flex-col gap-4 items-center justify-center'>
                <input value={fileValue} onChange={e => {
                    setUnitFile(e.target.files[0])
                    setFileSet(true)
                    setFileValue(e.target.value)
                }} id="file" type='file' accept='xlsx' className='hidden' />
                <label htmlFor='file' className='flex flex-col items-center cursor-pointer'  >
                    <CloudUploadIcon sx={{ fontSize: 40, color: "#282561" }} />
                    <p>{fileSet == false ? "اختر ملف اكسل" : unitFile.name}</p>
                </label>
                {fileSet == true && <button type='submit' className='w-fit px-20  h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'>
                    حفظ التغييرات
                </button>}
            </form>
            <div className={
                clsx(
                    'w-full z-50 h-full flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
                    {
                        'hidden'
                            : submit == false
                    }
                )
            }>
                <CircularProgress />
            </div>
        </>
    )
}
