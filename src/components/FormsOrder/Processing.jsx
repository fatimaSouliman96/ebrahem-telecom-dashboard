import { useContext, useState } from "react"
import { billStatus, companyNames, orderType, billName, billBalanceType } from "../../constants/data";
import clsx from "clsx";
import { CircularProgress } from "@mui/material"
    ;
import Cookies from 'js-cookie';
import { baseUrl } from "../../constants/baseUrl";
import axios from "axios";
import toast from "react-hot-toast";


const token = Cookies.get('token');


export default function Processing({ setState, fetchData, data, setReject, changeStatus, close }) {

    const [notes, setNotes] = useState("")
    const [submit, setSubmit] = useState(false)
    const user = localStorage.getItem("user")

    const handleChangeNotes = (e) => {
        setNotes(e.target.value)
    }

    const handleAccsept = async (e) => {
        setSubmit(true)
        e.preventDefault();

        await axios.request(
            {
                url: `${baseUrl}${data.action == "payment" ? "accept-payment-bill" : "send-inquiry-result"}/${data.id}`,
                method: "post",
                data: {
                    admin_note: notes
                },
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }

        )
            .then((res) => {
                close(false)
                fetchData()
                changeStatus("completed")
                setState("completed")
                setSubmit(false)

                toast.success("تمت العملية بنجاح")
            }).catch(e => {
                setSubmit(false)
                toast.error(e.response.data.data)
                close()
            })
    }
    const handleReject = () => {
        setReject(true)
        changeStatus("rejected")
    }
    return (


        < >

            <div className="flex justify-between items-center pb-3">
                <div
                    className={clsx(
                        "bg-opacity-20 w-1/4 flex items-center justify-center h-6 rounded  text-xs",
                        {
                            "bg-[#83FF48]  text-[#408236]": data.status == "completed",
                        },
                        {
                            "bg-[#FFE248] text-[#826336] ": data.status == "pending",
                        },
                        {
                            "bg-[#6248FF] text-[#573682] ": data.status == "processing",
                        },
                        {
                            "bg-[#FFDADA] text-[#823636] ": data.status == "rejected",
                        }
                    )}
                >
                    <p>{billStatus.map(ele => {
                        if (data.status == ele.en) {
                            return ele.ar
                        }
                    })}</p>
                </div>
                <div className="flex items-center gap-4 ">
                    <p className="text-sm">{new Date(data.created_at).toLocaleString()}</p>
                </div>




            </div>

            <div className="bg-[#E3E3EA] flex flex-col items-start  rounded-2xl text-right p-2">
                <div className="flex gap-36 px-1 items-center flex-row-reverse w-full justify-between">
                    {data.action !== "inquire" ? <p className="text-2xl font-bold flex flex-row-reverse gap-1">
                        {billName.map(ele => {
                            if (data?.billable_type?.slice(11) == ele.en) {
                                return <p>{ele.ar}</p>
                            }
                        })}
                        {data.billable?.company &&
                            companyNames?.map(ele => {
                                if (ele.en == data.billable.company) {
                                    return <p key={ele.en}>{ele.ar}</p>
                                }
                            })
                        }
                    </p>
                        :
                        <p className="text-2xl font-bold ">
                            فاتورة
                        </p>
                    }
                    {data?.amount && <p className="text-2xl font-bold">
                        {data?.amount} sy
                    </p>}
                </div>

                {data.action !== "inquire" ?
                    <div className="pt-1 pr-2 flex items-center flex-row-reverse gap-1">
                        {
                            orderType.map(ele => {
                                if (ele.en == data.order_type) {
                                    return <p key={ele.en}>{ele.ar}</p>
                                }
                            })
                        }
                        {data.billable?.top_up_type &&
                            billBalanceType?.map(ele => {
                                if (ele.en == data.billable.top_up_type) {
                                    return <p key={ele.en}>{ele.ar}</p>
                                }
                            })
                        }
                    </div>
                    :
                    <div className="pt-1 pr-2 flex items-center flex-row-reverse gap-1">
                        <p>استعلام</p>
                        {billName.map(ele => {
                            if (data?.billable_type?.slice(11) == ele.en) {
                                return <p>{ele.ar}</p>
                            }
                        })}
                    </div>
                }
            </div>

        <ul className="list-disc list-inside mr-[24px] rtl">

          {/*App  */}

          {data?.billable?.player_id && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            معرف اللاعب : <span>{data?.billable?.player_id}</span>
          </li>}
    
          {data?.billable?.qty  && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الكمية  : <span>{data?.billable?.qty }</span>
          </li>}
          {data?.billable?.type   && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            النوع  : <span>{data?.billable?.type  }</span>
          </li>}


          {data?.billable?.customer_name && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            اسم نقطة البيع : <span>{data?.billable?.customer_name}</span>
          </li>}
          {data?.billable?.transfer_method && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            طريقة التحويل : <span>{data?.billable?.transfer_method}</span>
          </li>}
          {data?.billable?.transfer_number && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            رقم الحوالة : <span>{data?.billable?.transfer_number}</span>
          </li>}
          {data?.billable?.source && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            المصدر  : <span>{data?.billable?.source}</span>
          </li>}
          {data?.billable?.company && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الشركة  : <span>{data?.billable?.company}</span>
          </li>}
          {data?.billable?.top_up_type && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            نوع الخط  : <span>{data?.billable?.top_up_type}</span>
          </li>}
          {data?.billable?.number && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الرقم  : <span>{data?.billable?.number}</span>
          </li>}
          {data?.billable?.code && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الكود  : <span>{data?.billable?.code}</span>
          </li>}
          {data?.billable?.quantity && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الكمية  : <span>{data?.billable?.quantity}</span>
          </li>}

          {data?.billable?.counter_number && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            رقم العداد : <span>{data?.billable?.counter_number}</span>
          </li>}
          {data?.billable?.internet_service_provider_name && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            مزود الخدمة : <span>{data?.billable?.internet_service_provider_name}</span>
          </li>}
          {data?.billable?.bundle && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الباقة : <span>{data?.billable?.bundle}</span>
          </li>}
          {data?.billable?.barcode_number  ? <li className="p-2 border-b border-[#A6A6A6] text-sm">
            رقم الباركود : <span>{
              data?.billable?.barcode_number 
            }</span>
          </li> : null}
          {data?.billable?.notes  && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الملاحظات : <span>{data?.billable?.notes }</span>
          </li>}
          {data?.billable?.subscription_number  && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            رقم الاشتراك  : <span>{data?.billable?.subscription_number }</span>
          </li>}
          {data?.billable?.governorate && <li className="p-2 border-b border-[#A6A6A6] text-sm">
            المحافظة  : <span>{data?.billable?.governorate}</span>
          </li>}

        </ul>

            <div className="w-full text-right mt-4">
                <label htmlFor="notes" className="text-right mb-2 text-xs">: ملاحظات</label>
                <input
                    id="notes"
                    className="rounded-xl border-black/10 border px-5 py-4 outline-none focus:border-main-color transition-all duration-300 w-full text-right"
                    placeholder={data.admin_note !== null ? data.admin_note : null}
                    type="text"
                    value={notes}
                    onChange={e => handleChangeNotes(e)}
                />
            </div>

            {<div className="flex justify-end gap-3" >
                <button onClick={() => handleReject()} className="border border-1 border-red-600 text-red-600 rounded-lg p-1 w-[41%] h-[34px]">
                    رفض الطلب
                </button>
                <button onClick={(e) => handleAccsept(e)} className="bg-main-color text-white rounded-lg p-1 w-[35%] h-[34px]">
                    انهاء الطلب
                </button>
            </div>}

            <div className={
                clsx(
                    'w-full h-full flex justify-center items-center absolute top-0 left-0 bg-[#ffffff7e]',
                    {
                        'hidden'
                            : submit == false
                    }
                )
            }>
                <CircularProgress />
            </div>
        </>


    );
}