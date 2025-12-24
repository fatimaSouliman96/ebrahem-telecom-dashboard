import { RechargColumns } from "../../constants/data";
import { CustomAccordion } from "../../components";
import { Tabel } from "../../components/Tabel";
import { useEffect, useState } from "react";
import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";



export default function Transfer() {


  const [orders, setOrders] = useState(false)
  const [dataOparation, setDataOparation] = useState()
  const [dataOrders, setDataOrders] = useState()
  const [users, setUsers] = useState([])
  const [balance, setBalance] = useState()
  const [cirdet, setCirdet] = useState()
  const [error, setError] = useState(false)
  const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false)

  const fetchData = async ( offset) => {
    setDataOparation([])
    setDataOrders([])
    setLoading(true)
    axios.request(
      {
        method: "get",
        url: `${baseUrl}view_cash?limit=10&offset=${offset}`,
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    ).then((res) => {
        setLoading(false)
      setDataOparation(res.data.cashRequestBills.data.filter(ele => ele.status == "pending"))
      setDataOrders(res.data.cashRequestBills.data.filter(ele => ele.status == "rejected" || ele.status == "processing" || ele.status == "completed"))

      setUsers(res.data.users)
      setTotal(res.data.cashRequestBills.total)

    })
      .catch(e => {
          setLoading(false)
        toast.error("Faild to load data")
        setError(true)
      })


  }

  useEffect(() => {
    fetchData(0);
  }, [])

  return (
    <>
      <div className="rtl">
        <h2 className="text-black font-bold text-2xl lg:text-[32px] mb-8">
          تعبئة
        </h2>
        <div className="mb-6 flex flex-col gap-6">
          <CustomAccordion balanceValue={balance && balance} users={users} fetchData={fetchData} />
          <CustomAccordion cerditValue={cirdet && cirdet} users={users} fetchData={fetchData} credit={"credit"} />
        </div>
      </div>
      <OrdersContext.Provider value={orders == false ? dataOparation : dataOrders}>
        <Tabel.LayoutTable orders={orders} setOrders={setOrders} sub_title={"طلبات التعبئة"} title={"عمليات التعبئة"}>
          <Tabel.DataTable
            error={error}
            columns={RechargColumns}
            fetchData={fetchData}
            transferPage={true}
            loading={loading}
            notFound={orders == false ? "لا يوجد عمليات تعبئة" : "لا يوجد طلبات تعبئة"}
            users={users}
            total={total}
          />
        </Tabel.LayoutTable>
      </OrdersContext.Provider>


    </>
  );
}
