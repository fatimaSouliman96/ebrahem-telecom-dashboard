import axios from 'axios'
import Cookies from 'js-cookie';
import { baseUrl } from '../../constants/baseUrl'
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";;
import clsx from 'clsx';
import MainButton from '../elements/MainButton';

export default function AddApp({fetchAllApps, handleClose}) {

    const [apps, setApps] = useState()
    const [app, setApp] = useState("")
    const [submit, setSubmit] = useState(false)

    const handleChangeApp = (e) => {
        setApp(e.target.value)
    }

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Frontend validation
        if (
          app == ""
        ) {
          toast.error("يرجى ملء جميع الحقول المطلوبة");
          return;
        }
      
        setSubmit(true);
      
        try {
          await axios.request({
            url: `${baseUrl}apps`,
            method: "post",
            data: {
              name: app
            },
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          });
      
          toast.success("تمت اضافة التطبيق بنجاح");
          fetchAllApps();
          handleClose();
        } catch (error) {
          toast.error("حدث خطأ أثناء الإضافة");
        } finally {
          setSubmit(false);
        }
      };
    const fetchData = async () => {
        await axios.request(
            {
                url: `${baseUrl}apps/products/names`,
                method: "get",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }
        ).then((res) => {
            setApps(res.data.product_names)
        })
            .catch(e => {
                console.log(e)
                toast.error("Faild to fetch data")
            })
    }


    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='w-[200px]' >
            <form onSubmit={handleSubmit} >
                <div className="flex flex-col gap-3 w-full mb-2">
                    <label htmlFor="point" className="text-xs font-medium">
                        التطبيق
                        <span className="text-red-600">*</span>
                    </label>
                    <select
                        required
                        type="text"
                        name="point"
                        id="point"
                        value={app}
                        onChange={e => handleChangeApp(e)}
                        className="cursor-pointer selection appearance-none rounded-xl border-black/10 border px-5 py-4 w-full outline-none focus:border-main-color transition-all duration-300"
                    >
                        <option className='text-gray-400' >اختر تطبيق </option>
                        {
                            apps ?
                                <>

                                    {apps?.map(ele => [
                                        <option value={ele} key={ele.id}>{ele}</option>
                                    ])}
                                </>
                                :
                                <option> <CircularProgress /> يتم تحميل التطبيقات</option>
                        }

                    </select>
                </div>
                <MainButton title="إضافة تطبيق" h="44px" w="195px" />
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
    )
}
