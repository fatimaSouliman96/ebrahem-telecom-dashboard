import { useState } from "react"
import { billStatus, orderType, billName, companyNames, billBalanceType } from "../../constants/data";
import clsx from "clsx";
import { CircularProgress } from "@mui/material"
;
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';


export default function RejectProcess({ setState, fetchData, data, close, setReject }) {


  const [notes, setNotes] = useState("")
  const [submit, setSubmit] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))

  
  const handleChangeNotes = (e) => {
    setNotes(e.target.value)
  }

  const handleRejected = async (e) => {
    setSubmit(true)
    e.preventDefault();

    await axios.request(
      {
        url: `${baseUrl}${data.action == "payment" ? "reject-payment-bill" : "reject-inquiry"}/${data.id}`,
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
        fetchData()
        close(false)
      }).catch(e => {
        setSubmit(false)
      })
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
              "bg-[#6248FF] text-[#573682] ": data.status == "جار المعالجة",
            },
            {
              "bg-[#FFDADA] text-[#823636] ": data.status == "مرفوضة",
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

      <div className="bg-[#E3E3EA] flex flex-col items-start rounded-2xl p-2">
        <div className="flex gap-36 px-1 items-center flex-row-reverse w-full justify-between">
          {data?.amount && <p className="text-2xl font-bold">
            {data?.amount} sy
          </p>}
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

        <li className="p-2 border-b border-[#A6A6A6] text-sm">
          رقم العملية : <span>{data.billable_id}</span>
        </li>
        <li className="p-2 border-b border-[#A6A6A6] text-sm">
          اسم نقطة البيع : <span>{data.customer_name}</span>
        </li>

        {/* <li className="p-2 border-b border-[#A6A6A6] text-sm">
              المستلم : <span>{data.customer_name}</span>
            </li> */}
        {data.billable.counter_number && <li className="p-2 border-b border-[#A6A6A6] text-sm">
          رقم العداد : <span>{data.billable.counter_number}</span>
        </li>}
        {data.billable.subscription_number ? <li className="p-2 border-b border-[#A6A6A6] text-sm">
          الاشتراك : <span>{data.billable.subscription_number}</span>
        </li>
          :
          data.billable.number ? <li className="p-2 border-b border-[#A6A6A6] text-sm">
            الرقم : <span>{data.billable.number}</span>
          </li> :
           <li className="p-2 border-b border-[#A6A6A6] text-sm">
           كود الطلب : <span>{
             data.billable.barcode_number ? data.billable.barcode_number : data.billable.code ? data.billable.code :
               data.billable.transfer_number
           }</span>
         </li>
        }

      </ul>

      <div className="w-full text-right mt-4">
        <label htmlFor="notes" className="text-right mb-2 text-xs">: ملاحظات</label>
        <input
          id="notes"
          className="rounded-xl border-black/10 border px-5 py-4 outline-none focus:border-main-color transition-all duration-300 w-full text-right"
          placeholder={data.admin_note !== null ? data.admin_note : "سبب الرفض"}
          type="text"
          value={notes}
          onChange={e => handleChangeNotes(e)}
        />
      </div>

      {user?.roles[0]?.name !== "pointOfSale" && <div className="flex justify-end gap-3" >

        <button onClick={() => close()} className="bg-[#979797] text-white rounded-lg p-1 w-[41%] h-[34px]">
          الغاء الأمر
        </button>
        <button onClick={e => handleRejected(e)} className="bg-[#EA0234] text-white rounded-lg p-1 w-[41%] h-[34px]">
          تأكيد الرفض
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
