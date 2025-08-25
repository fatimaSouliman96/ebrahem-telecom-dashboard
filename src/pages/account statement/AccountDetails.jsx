import { AccountColumns } from '../../constants/data'
import {CounterCard,  ModalPob } from '../../components'
import { icons } from '../../constants/icons'
import { Tabel } from '../../components/Tabel'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { OrdersContext } from '../../hooks/UseContext'
export default function AccountDetails() {

  const location = useLocation()
  const [open,] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <div className='flex items-center gap-3'>
        <h1 className="text-2xl lg:text-[32px] font-bold text-right">كشف حساب زبون</h1>
        <img src={icons.arrow} />
        <p className='text-[#282561] text-xl font-light'>{location.state.data.user.username}</p>
      </div>

      <div>

      </div>
      <div className='flex justify-center gap-2 pt-8'>
        <CounterCard count={location.state.data.opertions?.length} icon={icons.orderIcon} title={"عدد الطلبات"} />
        <CounterCard count={location.state.data?.user.creditBalance} icon={icons.dolarRed} title={"الرصيد الائتماني"} />
        <CounterCard count={location.state.data.user?.main_balance} icon={icons.dolar} title={" الرصيد الموجود"} />
        <CounterCard count={location.state.data.user?.username} icon={icons.userIcon} title={"اسم المستخدم"} />
      </div>
      <OrdersContext.Provider value={location.state.data.opertions}>
        <Tabel.LayoutTable title={"العمليات"}>
          <Tabel.DataTable
            columns={AccountColumns}
            Account={true}
            notFound={"لا يوجد عمليات"}
          />
        </Tabel.LayoutTable>
      </OrdersContext.Provider>

      <ModalPob open={open} handleClose={handleClose}>

      </ModalPob>
    </div>
  )
}
