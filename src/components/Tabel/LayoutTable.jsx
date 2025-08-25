import clsx from "clsx";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function LayoutTable(props) {

  return (

    <div className="w-full bg-white rounded-xl p-4 mt-8">
      <div className="flex justify-between items-center pb-4">
      <div className="flex gap-3">
          <h1 onClick={() => {
            props.sub_title && props.setOrders(false)
          }} className={
            clsx(
              "text-2xl cursor-pointer font-bold", {
              "text-gray-400"
                : props.sub_title && props.orders == true
            }
            )
          }>{props.title}</h1>
          {props.sub_title && <h1 onClick={() => props.setOrders(true)} className={
            clsx(
              "text-2xl cursor-pointer font-bold", {
              "text-gray-400"
                : props.orders == false
            }
            )
          }>{props.sub_title}</h1>}
        </div>
        {props.select == true ? (
          <select
            value={0}
            className="bg-[#FCFDFD] selection appearance-none pb-1 pr-2 outline-[#D5D5D5] border border-1 border-[#eeeeee] rounded-lg h-[28px]"
            style={{ direction: "rtl" }}
          >
            <option className="text-sm font-extralight" value={0}>
              اليوم
            </option>
            <option className="text-sm font-extralight" value={1}>
              هذا الاسبوع
            </option>
            <option className="text-sm font-extralight" value={2}>
              هذا الشهر
            </option>
            <option className="text-sm font-extralight" value={3}>
              هذه السنة
            </option>
          </select>
        ) : (
          <div></div>
        )}
        
         {props.pricesPage && <a title='تنزيل الملف' onClick={() => props.handleDownload()} ><CloudDownloadIcon sx={{ fontSize: 40, color: "#282561", cursor: "pointer" }} /></a>}
      </div>
      {props.children}
    </div>
  );
}
