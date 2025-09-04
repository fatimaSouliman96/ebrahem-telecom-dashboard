import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../constants/baseUrl';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import CircularProgress from "@mui/material/CircularProgress";;
import clsx from 'clsx';

export default function Setting({ id }) {
    const [submit, setSubmit] = useState(false)
    const [setting, setSetting] = useState({
        water: false,
        electricity: false,
        fixed_line: false,
        adsl: false,
        application: false,
        mobile: false,
        kazieh: false
    });
    const validOptions = [
        "water",
        "electricity",
        "fixed_line",
        "adsl",
        "application",
        "mobile",
        "kazieh"
    ];
    const labels = {
        water: "فاتورة مياه",
        electricity: "فاتورة الكهرباء",
        fixed_line: "فاتورة الأرضي",
        adsl: "فاتورة الإنترنيت",
        application: "التطبيقات",
        mobile: "فاتورة موبايل",
        kazieh: "كازية"
    };
    // جلب البيانات
    const fetchData = async () => {
        setSubmit(true)
        try {
            const res = await axios.get(`${baseUrl}users/options/${id}`, {
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
            setSetting(res.data);
            setSubmit(false)
        } catch (e) {
            console.log(e);
            setSubmit(false)
            toast.error("فشل في جلب البيانات");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // التعامل مع تغيير كل تشيك
    const handleChange = (e) => {
    const { id, checked } = e.target;
    setSetting(prev => ({
        ...prev,
        [id]: checked ? 1 : 0
    }));
};

    const handleSave = async () => {
        const entries = Object.entries(setting).filter(([key]) => validOptions.includes(key));

        try {
            setSubmit(true)
            await Promise.all(entries.map(([key, value]) => {
                return axios.post(`${baseUrl}users/options/${setting.id}`, {
                    option: key,
                    value: value,
                }, {
                    headers: {
                        "Accept": "application/json",
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    }
                });
            }));

            toast.success("تم إرسال الطلب بنجاح");
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء الإرسال");
        } finally {
            setSubmit(false)
            fetchData()
        }
    };

    return (
        <div className='w-[700px] h-[400px]'>
            <form className='w-full grid grid-cols-2 p-8 gap-4'>
                {Object.entries(setting).map(([key, value]) => (
                    labels[key] && (
                        <div key={key}>
                            <input
                                type="checkbox"
                                id={key}
                                checked={Boolean(value)}
                                onChange={handleChange}
                                className="cursor-pointer"
                            />
                            <label htmlFor={key} className="pr-2 cursor-pointer">
                                {labels[key]}
                            </label>
                        </div>
                    )
                ))}

                <div className='col-span-2 flex justify-end pt-4'>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        حفظ
                    </button>
                </div>
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
        </div>
    );
}




