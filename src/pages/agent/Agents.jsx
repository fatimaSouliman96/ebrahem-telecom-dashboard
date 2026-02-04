import { RechargColumns } from "../../constants/data";
import { CustomAccordion } from "../../components";
import { Tabel } from "../../components/Tabel";
import { useEffect, useState } from "react";
import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";



export default function Agents() {


  const [orders, setOrders] = useState(false)
  const [dataOparation, setDataOparation] = useState()
  const [users, setUsers] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    axios.request(
      {
        method: "get",
        url: `${baseUrl}agent/view-cash?page=1`,
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    ).then((res) => {
      setLoading(false)
      setDataOparation(res.data.data.filter(ele => ele.status == "pending"))
      // setDataOrders(res.data.cashRequestBills.filter(ele => ele.status == "rejected" || ele.status == "processing" || ele.status == "completed"))
      setUsers(res.data.users)

    })
      .catch(e => {
        setLoading(false)
        toast.error("Faild to load data")
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
          الطلبات
        </h2>

      </div>
      <OrdersContext.Provider value={dataOparation}>
        <Tabel.LayoutTable orders={orders} setOrders={setOrders} title={"عمليات التعبئة"}>
          <Tabel.DataTable
            error={error}
            columns={RechargColumns}
            fetchData={fetchData}
            agentPage={true}
            loading={loading}
            notFound={"لا يوجد عمليات تعبئة"}
            users={users}
          />
        </Tabel.LayoutTable>
      </OrdersContext.Provider>

    </>
  );
}
