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

  const fetchData = async () => {
    await axios.request(
      {
        url: `${baseUrl}get_Financial_Statements`,
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
      <h1 className="text-2xl lg:text-[32px] font-bold text-right">
        بياني المالي
      </h1>
      <OrdersContext.Provider value={data}>
        <Tabel.LayoutTable title={"العمليات"}>
          <Tabel.DataTable
          error={error}
            columns={finincialColumns}
            finincalPage={true}
          />
        </Tabel.LayoutTable>
      </OrdersContext.Provider>

    </>
  );
}
