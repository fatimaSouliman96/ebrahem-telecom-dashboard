import { useEffect, useState } from 'react'
import { Tabel } from '../../components/Tabel'
import { listColumns, pricesListBillsColumns } from '../../constants/data'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import { OrdersContext } from '../../hooks/UseContext'
import CircularProgress from "@mui/material/CircularProgress";
import { ModalPob } from '../../components'
import UploadFile from '../../components/forms/UploadFile'
import EditMax from '../../components/forms/EditMax'

export default function PricesList() {

  const [choose, setChoose] = useState(1)
  const [dataUnitsSy, setDataUnitsSy] = useState()
  const [dataUnitsMTN, setDataUnitsMTN] = useState()
  const [dataUnitsWafa, setDataUnitsWafa] = useState()
  const [dataBills, setDataBills] = useState()
  const [submit, setSubmit] = useState(false)
  const [open, setOpen] = useState(false);
  const [openEditMax, setOpenEditMax] = useState(false);
  const [error, setError] = useState(false)
  const [errorUnit, setErrorUnit] = useState(false)

  const [max, setMax] = useState()


  const handleClose = () => {
    setOpen(false)
  }
  

  const handleOpen = () => {
    setOpen(true)
  }
  const handleOpenMax = () => {
    setOpenEditMax(true)
  }
  const handleCloseMax = () => {
    setOpenEditMax(false)
  }

  const handleChoose = (num) => {
    setChoose(num)
  }

  const fetchMax = async () => {
    await axios.request(
      {
        url: `${baseUrl}unit-prices/get-max`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    ).then((res) => {
      console.log(res)
      setMax(res.data.data.max)
    })
      .catch(e => {
        console.log(e)
        toast.error("Faild to log out")
      })
  }
  const fetchDataBills = async () => {
    await axios.request(
      {
        url: `${baseUrl}getAllBillPrices`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    ).then((res) => {
      setDataBills(res.data)
    })
      .catch(e => {
        setError(true)
        toast.error("Faild to log out")
      })
  }

  const fetchDataUnits = async () => {
    await axios.request(
      {
        url: `${baseUrl}getUnitsPrices`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    ).then((res) => {

      setDataUnitsSy(res.data.filter(ele => ele.company == "Syriatel"))
      setDataUnitsMTN(res.data.filter(ele => ele.company == "MTN"))
      setDataUnitsWafa(res.data.filter(ele => ele.company == "Wafaa"))
    })
    .catch( () => {
      setErrorUnit(true)
      toast.error("Faild to fetch data")
    })
  }

  const fetchData = () => {
    fetchDataUnits()
    fetchDataBills()
    fetchMax()
  }

  const handleDownload = async () => {
    setSubmit(true)
    let unitUrl = `unit-prices/export`
    let billUrl = `bill-prices/export`
    await fetch(`${baseUrl}${choose == 4 ? billUrl : unitUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Authorization': `Bearer ${Cookies.get('token')}`,
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.blob();
    })
      .then(blob => {
        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${choose == 4 ? "bill-prices.xlsx" : "unit-prices.xlsx"}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setSubmit(false)
      })
      .catch(error => {
        setSubmit(false)
        console.error('There has been a problem with your fetch operation:', error);
      });

  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>

      <h1 className="text-2xl lg:text-[32px] font-bold text-right">
        لائحة الأسعار
      </h1>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-3 w-4/5 pt-4' >
          <button onClick={() => handleChoose(1)} className={
            clsx(
              `w-[17%] h-[48px] hover:bg-main-color hover:text-white border-main-color text-main-color border  rounded-lg flex-center main-button`,
              {
                'w-[17%] h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'
                  : choose == 1
              }
            )
          }>
            سيرياتيل
          </button>
          <button onClick={() => handleChoose(2)} className={
            clsx(
              `w-[17%] h-[48px] hover:bg-main-color hover:text-white  border-main-color text-main-color border  rounded-lg flex-center main-button`,
              {
                'w-[17%] h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'
                  : choose == 2
              }
            )
          }>
            MTN
          </button>
          <button onClick={() => handleChoose(3)} className={
            clsx(
              `w-[17%] h-[48px] hover:bg-main-color hover:text-white  border-main-color text-main-color border  rounded-lg flex-center main-button`,
              {
                'w-[17%] h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'
                  : choose == 3
              }
            )
          }>
            وفا
          </button>
          <button onClick={() => handleChoose(4)} className={
            clsx(
              `w-[17%] hover:bg-main-color hover:text-white transition-all h-[48px] border-main-color text-main-color border  rounded-lg flex-center main-button`,
              {
                'w-[17%] h-[48px] bg-main-color text-white border  rounded-lg flex-center main-button'
                  : choose == 4
              }
            )
          }>
            App / Bill
          </button>

        </div>
        {choose == 4 ?
          <button onClick={() => handleOpen()} className='w-[22%] h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button self-end'>
            رفع اسعار فواتير
          </button>

          :
          <button onClick={() => handleOpen()} className='w-[22%] h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button self-end'>
            رفع اسعار وحدات
          </button>}
      </div>
      {choose == 1 || choose == 2 || choose == 3 ? <div className='flex mt-4 items-center gap-5' >
        <button className={
          clsx(
            `w-[30%]  h-[48px]   border-main-color text-main-color border  rounded-lg flex-center main-button`,
          )
        }>
          الحد الاعلى لتحويل الوحدات : {max}
        </button>
        <button onClick={() => handleOpenMax()} className={'w-[10%] h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'}>
          تعديل
        </button>
      </div> : null}
      <OrdersContext.Provider value={choose == 1 ? dataUnitsSy : choose == 2 ? dataUnitsMTN : choose == 3 ? dataUnitsWafa : choose == 4 ? dataBills : null}>
        <Tabel.LayoutTable pricesPage={true} handleDownload={handleDownload} title={"الأسعار"}>
          <Tabel.DataTable
            columns={choose == 4 ? pricesListBillsColumns : listColumns}
            pricesPage={true}
            error={errorUnit ? errorUnit :  error}
            bills={choose == 4 ? true : false}
            fetchData={fetchData}
            notFound={"لا يوجد اسعار ارفع ملف"}
          />

        </Tabel.LayoutTable>
      </OrdersContext.Provider>

      <ModalPob open={open} handleClose={handleClose}   >
        <UploadFile submit={submit} choose={choose} fetchData={fetchData} handleClose={handleClose} setSubmit={setSubmit} />
      </ModalPob>

      <ModalPob open={openEditMax} handleClose={handleCloseMax} >
        <EditMax fetchData={fetchMax} oldValue={max} close={handleCloseMax} />
      </ModalPob>
      <div className={
        clsx(
          'w-full z-50 h-full flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
          {
            'hidden'
              : submit == false
          }
        )
      }>
        <CircularProgress />
      </div>
    </>
  )
}
