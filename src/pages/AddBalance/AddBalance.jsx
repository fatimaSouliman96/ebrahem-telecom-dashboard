
import { CustomAccordion } from "../../components";
import { addBalanceColumns } from "../../constants/data";
import { Tabel } from "../../components/Tabel";
import { useEffect, useState } from "react";
import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";


export default function AddBalance() {
  const [data, setData] = useState()
  const user = JSON.parse(localStorage.getItem("user"))
  const [balance, setBalance] = useState()
  const [cirdet, setCirdet] = useState()
  const [error, setError] = useState(false)

  const fetchData = async () => {
    await axios.request(
      {
        url: `${baseUrl}view_add_public_balance`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }

    )
      .then(res => {
        setData(res.data.data)
      })
      .catch(() => {
        toast.error("Faild to fetch data")
        setError(true)
      })


  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="rtl">
        <h2 className="text-black font-bold text-2xl lg:text-[32px] mb-8">
          إضافة رصيد
        </h2>
        <div className="mb-6">
          <CustomAccordion cerditValue={cirdet} balanceValue={balance} balance={true} fetchData={fetchData} />
        </div>
      </div>
      <OrdersContext.Provider value={data}>
        <Tabel.LayoutTable title={"عمليات التعبئة"}>
          <Tabel.DataTable error={error} columns={addBalanceColumns} fetchData={fetchData} notFound={"لا يوجد عمليات"} />
        </Tabel.LayoutTable>
      </OrdersContext.Provider>


    </>
  );
}
