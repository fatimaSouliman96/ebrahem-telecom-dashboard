import { useEffect, useState } from "react";
import { Tabel } from "../../components/Tabel";
import { finincialColumns } from "../../constants/data";
import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";


export default function Financial() {

  const [data, setData] = useState()
  const [error, setError] = useState(false)
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false)

  const fetchData = async (offset) => {
    setLoading(true)
    setData([])
    await axios.request(
      {
        url: `${baseUrl}get_Financial_Statements?limit=10&offset=${offset}`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    )
      .then(res => {
        setLoading(false)
        setData(res.data.data.data)
        setTotal(res.data.data.total)
      })
      .catch(() => {
         setLoading(false)
        toast.error("Faild to fetch data")
        setError(true)
      })
  }
  useEffect(() => {
    fetchData(0)
  }, [])
  return (
    <>
      <h1 className="text-2xl lg:text-[32px] font-bold text-right">
        بياني المالي
      </h1>
      <OrdersContext.Provider value={data}>
        <Tabel.LayoutTable title={"العمليات"}>
        <Tabel.DataTable
          error={error}
          columns={finincialColumns}
          finincalPage={true}
          loading={loading}
          total={total}
          fetchData={fetchData}
        />
      </Tabel.LayoutTable>
      </OrdersContext.Provider>
      

    </>
  );
}
