import { MainButton, ModalPob, AddProvider } from "../../components";
import { providersColumns } from "../../constants/data";
import { Tabel } from "../../components/Tabel";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';

export default function Providers() {
  const [addModal, setAddModal] = useState(false);
  const [allServisesProviders, setAllServisesProviders] = useState()
  const [error, setError] = useState(false)

  const handleClose = () => {
    setAddModal(false)
  }


  const fetchData = async () => {
    await axios.request(
      {
        url: `${baseUrl}isp/list`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    ).then((res) => {
      setAllServisesProviders(res.data.data)

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
      <div className="accounts-header flex items-center justify-between mb-8 rtl">
        <h1 className="text-2xl lg:text-[32px] font-bold text-right">
          {" "}
          مزودات خدمة الانترنت
        </h1>
        <MainButton
          title="إضافة مزود"
          w="219px"
          h="35px"
          handleClick={() => setAddModal(true)}
        />
      </div>
      <OrdersContext.Provider value={allServisesProviders}>
        <Tabel.LayoutTable title={"المزودات"}>
          <Tabel.DataTable
          error={error}
            columns={providersColumns}
            notFound={"لا يوجد مزودات"}
            fetchData={fetchData}
            providersPage={true}
          />
        </Tabel.LayoutTable>
      </OrdersContext.Provider>


      <ModalPob open={addModal} handleClose={handleClose} >
        <AddProvider close={handleClose} fetchData={fetchData} />
      </ModalPob>
    </>
  );
}
