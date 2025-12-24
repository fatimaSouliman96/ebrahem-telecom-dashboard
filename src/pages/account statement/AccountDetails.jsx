import { AccountColumns } from '../../constants/data'
import { CounterCard, ModalPob } from '../../components'
import { icons } from '../../constants/icons'
import { Tabel } from '../../components/Tabel'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { OrdersContext } from '../../hooks/UseContext'
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import Cookies from 'js-cookie';

export default function AccountDetails() {

  const location = useLocation()
  const [open,] = useState(false)
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState()

  const [data, setData] = useState([])
  const handleClose = () => {
    setOpen(false)
  }
  const fetchUser = async (offset) => {

    setLoading(true)
    if (location.state.data !== "") {
      await axios.request(
        {
          url: `${baseUrl}account_statement_view/${location.state.data}?limit=10&offset=${offset}`,
          method: "get",
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${Cookies.get('token')}`,
          }
        }

      )
        .then(res => {
    
          setLoading(false)
          setUser(res.data.data.user)
          setData(res.data.data.operations.data)
          setTotal(res.data.data.operations.total_size)
        })
        .catch(e => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    fetchUser(1)
  }, [])
  return (
    <div>
      <div className='flex items-center gap-3'>
        <h1 className="text-2xl lg:text-[32px] font-bold text-right">كشف حساب زبون</h1>
        <img src={icons.arrow} />
        {user && <p className='text-[#282561] text-xl font-light'>{user?.username}</p>}
      </div>

      <div>

      </div>
      <div className='flex justify-center gap-2 pt-8'>
        <CounterCard count={data?.length} icon={icons.orderIcon} title={"عدد الطلبات"} />
        <CounterCard count={user?.creditBalance} icon={icons.dolarRed} title={"الرصيد الائتماني"} />
        <CounterCard count={user?.main_balance} icon={icons.dolar} title={" الرصيد الموجود"} />
        <CounterCard count={user?.username} icon={icons.userIcon} title={"اسم المستخدم"} />
      </div>
      <OrdersContext.Provider value={data ?? data}>
        <Tabel.LayoutTable title={"العمليات"}>
          <Tabel.DataTable
            columns={AccountColumns}
            Account={true}
            total={total}
            loading={loading}
            notFound={"لا يوجد عمليات"}
          />
        </Tabel.LayoutTable>
      </OrdersContext.Provider>

      <ModalPob open={open} handleClose={handleClose}>

      </ModalPob>
    </div>
  )
}
