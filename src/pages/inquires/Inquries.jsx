
import { useEffect, useState } from "react";
import { Tabel } from "../../components/Tabel";
import { inquriesColumns, OrdersColumns } from "../../constants/data";

import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";



export default function Inquries() {
  const [orders, setOrders] = useState()
  const [error, setError] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    await axios.request(
      {
        url: `${baseUrl}operations-inquiry`,
        method: "get",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')}`,
        }
      }


    )
      .then(res => {
        setLoading(false)
        setOrders(res.data.data)
      })
      .catch(() => {
        setLoading(false)
        toast.error("Faild to fetch data")
        setError(true)
      })

  }

  useEffect(() => {
    user.roles[0].name !== "pointOfSale" && fetchData()
  }, [])
  return (
    <>
      <h1 className="text-2xl lg:text-[32px] font-bold text-right mb-6">الاستعلامات</h1>

      {user.roles[0].name !== "pointOfSale" && <OrdersContext.Provider value={orders}>
        <Tabel.LayoutTable title={"الاستعلامات"}>
          <Tabel.DataTable
            error={error}
            columns={inquriesColumns}
            inquiresPage={true}
            fetchData={fetchData}
            loading={loading}
            notFound={"لا يوجد استعلامات"}
          />
        </Tabel.LayoutTable>
      </OrdersContext.Provider>}

    </>
  );
}