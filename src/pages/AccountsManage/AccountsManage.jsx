import { ModalPob, MainButton, AddUserModal } from '../../components'
import { Tabel } from "../../components/Tabel";
import { accountManageColumns } from '../../constants/data';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';



export default function AccountsManage() {

  const [addModal, setAddModal] = useState(false);
  const [allUsers, setAllUsers] = useState()
  const [agents, setAgents] = useState()
  const [rolles, setRolles] = useState([])
  const [error, setError] = useState(false)

  const handleClose = () => {
    setAddModal(false)
  }


  const fetchData = async () => {
    await axios.request(
      {
        url: `${baseUrl}allusers`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    ).then((res) => {
      setAllUsers(res.data.users)
      setRolles(res.data.roles)
      setAgents(res.data.agents)
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
          إدارة الحسابات
        </h1>
        <MainButton
          title="إضافة مستخدم"
          w="219px"
          h="35px"
          handleClick={() => setAddModal(true)}
        />
      </div>
      <OrdersContext.Provider value={allUsers}>
        <Tabel.LayoutTable title={"الحسابات"}>
          <Tabel.DataTable
          error={error}
            columns={accountManageColumns}
            accountsPage={true}
            notFound={"لا يوجد مستخدمين"}
            rolles={rolles}
            fetchData={fetchData}
            agents={agents}
          />
        </Tabel.LayoutTable>
      </OrdersContext.Provider>


      <ModalPob open={addModal} handleClose={handleClose} >
        <AddUserModal agents={agents} fetchData={fetchData} handleClose={handleClose} rollesName={rolles} />
      </ModalPob>

    </>
  );
}
