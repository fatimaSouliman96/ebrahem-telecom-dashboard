import axios from 'axios'
import { useEffect, useState } from 'react'
import { baseUrl } from '../../constants/baseUrl'
import Cookies from 'js-cookie';
import { billName, billStatus, orderType } from '../../constants/data';
import CircularProgress from "@mui/material/CircularProgress";;
import clsx from 'clsx';
import toast from 'react-hot-toast';

export default function DetalisFinancial({ id, bill, stutas, close }) {
  const [data, setData] = useState()

  const fetchData = async () => {
    await axios.request(
      {
        url: `${baseUrl}get_Financial_Statements_details/${id}`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    )
      .then(res => {
        console.log(res.data.billable)
        setData(res.data.billable)
      })
      .catch(() => {
        close()
        toast.error("Faild to fetch data")
      })
  }

  useEffect(() => {
    fetchData()
    console.log(data)
  }, [])
  return (
    <>
      {data ? <div className='w-80' >
        <div className="flex justify-between items-center pb-3">
          <div
            className={clsx(
              "bg-opacity-20 w-1/4 flex items-center justify-center h-6 rounded  text-xs",
              {
                "bg-[#83FF48]  text-[#408236]": stutas == "completed",
              },
              {
                "bg-[#FFE248] text-[#826336] ": stutas == "pending",
              },
              {
                "bg-[#6248FF] text-[#573682] ": stutas == "processing",
              },
              {
                "bg-[#FFDADA] text-[#823636] ": stutas == "rejected",
              }
            )}
          >
            <p>{billStatus.map(ele => {
              if (stutas == ele.en) {
                return ele.ar
              }
            })}</p>
          </div>
          <div className="flex items-center gap-4 " >
            {
              billName.map(ele => {
                if (ele.en == bill.slice(11)) {
                  return ele.ar
                }
              })
            }
          </div>
          <div className="flex items-center gap-4 " >
            <p className="text-sm" style={{ direction: "ltr" }}>{new Date(data?.created_at).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-[#E3E3EA] flex flex-col items-start rounded-2xl p-2">
          <div className="flex gap-36 px-1 items-center flex-row-reverse w-full justify-between">
            {data?.amount && <p className="text-2xl font-bold">
              {data?.amount} sy
            </p>}


          </div>

        </div>
        <ul className="list-disc list-inside mr-[24px] rtl">

          {/*App  */}

          {data?.player_id && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            معرف اللاعب : <span>{data?.player_id}</span>
          </li>}
    
          {data?.qty  && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الكمية  : <span>{data?.qty }</span>
          </li>}
          {data?.type   && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            النوع  : <span>{data?.type  }</span>
          </li>}


          {data?.customer_name && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            اسم نقطة البيع : <span>{data?.customer_name}</span>
          </li>}
          {data?.transfer_method && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            طريقة التحويل : <span>{data?.transfer_method}</span>
          </li>}
          {data?.transfer_number && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            رقم الحوالة : <span>{data?.transfer_number}</span>
          </li>}
          {data?.source && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            المصدر  : <span>{data?.source}</span>
          </li>}
          {data?.company && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الشركة  : <span>{data?.company}</span>
          </li>}
          {data?.top_up_type && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            نوع الخط  : <span>{data?.top_up_type}</span>
          </li>}
          {data?.number && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الرقم  : <span>{data?.number}</span>
          </li>}
          {data?.code && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الكود  : <span>{data?.code}</span>
          </li>}
          {data?.quantity && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الكمية  : <span>{data?.quantity}</span>
          </li>}

          {data?.counter_number && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            رقم العداد : <span>{data?.counter_number}</span>
          </li>}
          {data?.internet_service_provider_name && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            مزود الخدمة : <span>{data?.internet_service_provider_name}</span>
          </li>}
          {data?.bundle && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الباقة : <span>{data?.bundle}</span>
          </li>}
          {data?.barcode_number  ? <li className="p-2 border-b border-[#A6A6A6] text-sm">
            رقم الباركود : <span>{
              data?.barcode_number 
            }</span>
          </li> : null}
          {data?.notes  && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الملاحظات : <span>{data?.notes }</span>
          </li>}
          {data?.subscription_number  && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            رقم الاشتراك  : <span>{data?.subscription_number }</span>
          </li>}
          {data?.governorate && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            المحافظة  : <span>{data?.governorate}</span>
          </li>}

        </ul>
      </div>
        :
        <div className={'w-full h-full flex items-center justify-center absolute top-0 left-0 '}>
          <CircularProgress />
        </div>
      }
    </>
  )
}
