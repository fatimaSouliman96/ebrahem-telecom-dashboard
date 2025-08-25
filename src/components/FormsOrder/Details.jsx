import { billBalanceType, billStatus, companyNames, orderType, billName } from "../../constants/data";
import clsx from "clsx";


export default function Details({ data, state }) {

  return (


    <>
      <div className="flex justify-between items-center pb-3">
        <div
          className={clsx(
            "bg-opacity-20 w-1/4 flex items-center justify-center h-6 rounded  text-xs",
            {
              "bg-[#83FF48]  text-[#408236]": data.status ? data.status == "completed" : state == "completed",
            },
            {
              "bg-[#FFE248] text-[#826336] ": data.status ? data.status == "pending" : state == "pending",
            },
            {
              "bg-[#6248FF] text-[#573682] ": data.status ? data.status == "processing" : state == "processing",
            },
            {
              "bg-[#FFDADA] text-[#823636] ": data.status ? data.status == "rejected" : state = "rejected",
            }
          )}
        >
          <p>{billStatus.map(ele => {
            if (data.status == ele.en) {
              return ele.ar
            }
          })}</p>
        </div>
        <div className="flex items-center gap-4 " >
          <p className="text-sm" style={{ direction: "ltr" }}>{new Date(data.created_at).toLocaleString()}</p>
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
              companyNames.map(ele => {
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
              billBalanceType.map(ele => {
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

        {data?.billable?.qty && <li className="p-2 border-b border-[#A6A6A6] text-sm">
          الكمية  : <span>{data?.billable?.qty}</span>
        </li>}
        {data?.billable?.type && <li className="p-2 border-b border-[#A6A6A6] text-sm">
          النوع  : <span>{data?.billable?.type}</span>
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
        {data?.billable?.barcode_number ? <li className="p-2 border-b border-[#A6A6A6] text-sm">
          رقم الباركود : <span>{
            data?.billable?.barcode_number
          }</span>
        </li> : null}
        {data?.billable?.notes && <li className="p-2 border-b border-[#A6A6A6] text-sm">
          الملاحظات : <span>{data?.billable?.notes}</span>
        </li>}
        {data?.billable?.subscription_number && <li className="p-2 border-b border-[#A6A6A6] text-sm">
          رقم الاشتراك  : <span>{data?.billable?.subscription_number}</span>
        </li>}
        {data?.billable?.governorate && <li className="p-2 border-b border-[#A6A6A6] text-sm">
          المحافظة  : <span>{data?.billable?.governorate}</span>
        </li>}

      </ul>

    {data.admin_note &&  <div className="w-full text-right mt-4">
        <h2 className="text-right mb-2 text-xs">ملاحظات :</h2>
        <div className="rounded-xl border-black/10 border px-5 py-4 w-full h-[100px]">
          {data.admin_note !== null ? data.admin_note : "لا يوجد"}
        </div>
      </div>}

    </>


  );
}

