
import "./home.css";
import { CounterCard } from "../../components";

import { OperationsColumns } from "../../constants/data";
import { Tabel } from "../../components/Tabel";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material"
  ;
import { useNavigate } from "react-router-dom";
import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import Counters from "../../components/counters/Counters";



export default function Home() {

  const [dataCounter, setDataCounter] = useState()
  const [todyBill, setTodyBill] = useState()
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseUrl}home-Page`, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get("token")}`,
        },
      });

      // 🔹 إذا نجح الطلب
      setDataCounter(res.data.data);
      setTodyBill(res.data.data.today_bill_count);
    } catch (e) {
      // 🔹 إذا انتهت الجلسة
      if (e.response?.status === 401) {
        toast.error("انتهت الجلسة");
        navigate("/log_in");
        return; // ما بدنا نرمي error بهالحالة
      }

      // 🔹 هون منرمي الخطأ ليوصل للـ ErrorBoundary
      throw new Error(e.response?.data?.message || "خطأ في الشبكة 🚨");
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <h1 className="text-2xl lg:text-[32px] font-bold text-right">الرئيسية</h1>
      {dataCounter ?
        <>

          <Counters dataCounter={dataCounter} />

          <OrdersContext.Provider value={todyBill}>

            <Tabel.LayoutTable title={todyBill?.length !== 0 ? "العمليات" : "لا يوجد عمليات"}>
              <Tabel.DataTable
                error={error}
                columns={OperationsColumns}
                mainPage={true}
              />
            </Tabel.LayoutTable>
          </OrdersContext.Provider>
        </>
        :
        <CircularProgress className="ml-[50%] mt-[10%]" />
      }
    </>
  );
}
