import { useState } from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseUrl } from '../../constants/baseUrl';
import CircularProgress from "@mui/material/CircularProgress";;
import clsx from 'clsx';
export default function EditMax({ fetchData, oldValue, close }) {
    const [max, setMax] = useState(oldValue)
    const [submit, setSubmit] = useState(false)

    const handleChangeMax = (e) => {
        setMax(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmit(true); // show loading indicator

        await axios.request({
            url: `${baseUrl}unit-prices/update-max?max=${max}`,
            method: "put",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        }).then((res) => {
            fetchData()
            toast.success("تمت التعديل بنجاح");

        }).catch((e) => {
            toast.error("فشل في الإرسال");
        }).finally(() => {
            setSubmit(false);
            close()
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='w-[200px] p-4' >
                <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="max" className="text-xs font-medium">
                        الحد الاعلى
                    </label>
                    <input
                        type="number"
                        name="max"
                        value={max}
                        onChange={e => handleChangeMax(e)}
                        id="max"
                        className="rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                    />
                </div>
                <button
                    type='submit'
                    style={{
                        width: "165px",
                        height: "44px",
                    }}
                    className={`bg-main-color mt-4 text-white rounded-lg flex-center main-button`}
                >
                    حفظ التغييرات
                </button>
            </form>
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
        </>
    )
}
