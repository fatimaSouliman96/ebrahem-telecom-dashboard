import { useEffect, useState } from "react";
import { OrdersAccordion } from "../../components";
import { Tabel } from "../../components/Tabel";
import { OrdersColumns } from "../../constants/data";

import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import Agents from "../agent/Agents";

const token = Cookies.get('token');

export default function Orders() {
  const [orders, setOrders] = useState()
  const [balance, setBalance] = useState()
  const [error, setError] = useState(false)
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))


  const fetchData = async (offset) => {
    console.log(offset)
    setLoading(true)
    await axios.request(
      {
        url: `${baseUrl}operations-payment?limit=10&offset=${parseInt(offset)}`,
        method: "get",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')}`,
        }
      }


    )
      .then(res => {
        setLoading(false)
        setOrders(res.data.data.data)
        setTotal(res.data.data.total_size)
      })
      .catch(() => {
         setLoading(false)
        toast.error("Faild to fetch data")
        setError(true)
      })

  }

  useEffect(() => {
    user.roles[0].name !== "pointOfSale" && fetchData(1)
  }, [])
  return (
    <>
      {
        user?.is_agent == true ?
          <Agents />
          :
          <>
            <h1 className="text-2xl lg:text-[32px] font-bold text-right mb-6">طلباتي</h1>
            <OrdersAccordion balance={balance} fetchData={fetchData} />
            {user.roles[0].name !== "pointOfSale" && <OrdersContext.Provider value={orders}>
              <Tabel.LayoutTable title={"الطلبات حديثة"}>
                <Tabel.DataTable
                  error={error}
                  columns={OrdersColumns}
                  ordersPage={true}
                  fetchData={fetchData}
                  total={total}
                  loading={loading}
                  notFound={"لا يوجد طلبات اليوم"}
                />
              </Tabel.LayoutTable>
            </OrdersContext.Provider>}

          </>
      }
    </>
  );
}
