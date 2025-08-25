import { billBalanceType, billStatus, companyNames, orderType, billName } from "../../constants/data";
import clsx from "clsx";


export default function Rejected({ data, state }) {


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

        <li className="p-2 border-b border-[#A6A6A6] text-sm">
          رقم العملية : <span>{data.billable_id}</span>
        </li>
        <li className="p-2 border-b border-[#A6A6A6] text-sm">
          اسم نقطة البيع : <span>{data.customer_name}</span>
        </li>

        {/* <li className="p-2 border-b border-[#A6A6A6] text-sm">
              المستلم : <span>{data.customer_name}</span>
            </li> */}
        {data.billable?.counter_number && <li className="p-2 border-b border-[#A6A6A6] text-sm">
          رقم العداد : <span>{data.billable?.counter_number}</span>
        </li>}
        <li className="p-2 border-b border-[#A6A6A6] text-sm">
          كود الطلب : <span>{
            data.billable?.barcode_number ? data.billable?.barcode_number : data.billable?.code ? data.billable?.code :
              data.billable?.transfer_number
          }</span>
        </li>
        <li className="p-2 border-b border-[#A6A6A6] text-sm">
          سبب الرفض : <span>{data.admin_note !== null ? data.admin_note : "لا يوجد"}</span>
        </li>

      </ul>




    </>


  );
}

