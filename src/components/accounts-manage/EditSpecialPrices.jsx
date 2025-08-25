import React, { useEffect, useState } from 'react'
import { Tabel } from '../Tabel'
import { pricesBillsSpecialColumns, pricesSpecialColumns } from '../../constants/data'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import { OrdersContext } from '../../hooks/UseContext'
import CircularProgress from "@mui/material/CircularProgress";
import ModalPob from '../Modals/Modal'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function SpecialPrices({ id, name }) {

  const [choose, setChoose] = useState(1)
  const [dataUnitsSy, setDataUnitsSy] = useState()
  const [dataUnitsMTN, setDataUnitsMTN] = useState()
  const [dataUnitsWafa, setDataUnitsWafa] = useState()
  const [dataBills, setDataBills] = useState()
  const [submit, setSubmit] = useState(false)
  const [open, setOpen] = useState(false);
  const [unitFile, setUnitFile] = useState()
  const [fileSet, setFileSet] = useState(false)
  const [fileValue, setFileValue] = useState()
  const [error, setError] = useState(false)
  const [errorUnit, setErrorUnit] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleChoose = (num) => {
    setChoose(num)
  }

  const fetchDataBills = async () => {
    await axios.request(
      {
        url: `${baseUrl}${id}/getSpecialClientBillPrices`,
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

  const handleUpadteUntis = async (e) => {
    e.preventDefault()
    setSubmit(true)
    const data = new FormData()
    data.append("file", unitFile)
    let unitUrl = `special-unit-prices/${id}/import`
    let billUrl = `special-bill-prices/${id}/import`
    await axios.request({
      url: `${baseUrl}${choose == 4 ? billUrl : unitUrl}`,
      method: "post",
      headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: data
    })
      .then(res => {
        toast.success("تم رفع الملف الجديد بنجاح")
        fetchData()
        handleClose()
        setSubmit(false)
        setFileValue("")
        setUnitFile("")
        setFileSet(false)
      })
      .catch(e => {
        toast.error("فشلت العملية")
        handleClose()
        setSubmit(false)
        setFileValue("")
        setUnitFile("")
        setFileSet(false)
      })

  }
  const fetchDataUnits = async () => {
    await axios.request(
      {
        url: `${baseUrl}${id}/getSpecialClientUnitPrices`,
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
      .catch(e => {
        setErrorUnit(true)
        toast.error("Faild to log out")
      })
  }

  const handleDownload = async () => {
    setSubmit(true)
    let unitUrl = `special-unit-prices/${id}/export`
    let billUrl = `special-bill-prices/${id}/export`
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

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${choose == 4 ? `${name}-bill-prices.xlsx` : `${name}-unit-prices.xlsx`}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setSubmit(false)
      })
      .catch(error => {
        setSubmit(false)
        console.log(error);
      });

  }
  const fetchData = () => {
    fetchDataUnits()
    fetchDataBills()
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='h-[500px] overflow-y-scroll pr-2'>

      <h1 className="text-2xl lg:text-[32px] font-bold text-right">
        لائحة الأسعار
      </h1>
      <div className='flex justify-between items-center w-full'>
        <div className='flex w-full gap-3  pt-4' >
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
          <button onClick={() => handleOpen()} className='w-[25%] h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'>
            رفع اسعار فواتير
          </button>
          :
          <button onClick={() => handleOpen()} className='w-[25%] h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'>
            رفع اسعار وحدات
          </button>}
      </div>

      <OrdersContext.Provider value={choose == 1 ? dataUnitsSy : choose == 2 ? dataUnitsMTN : choose == 3 ? dataUnitsWafa : choose == 4 ? dataBills : null}>
        <Tabel.LayoutTable pricesPage={true} handleDownload={handleDownload} title={"الأسعار"}>

          <Tabel.DataTable
            columns={choose == 4 ? pricesBillsSpecialColumns : pricesSpecialColumns}
            pricesPage={true}
            error={errorUnit ? errorUnit :  error}
            bills={choose == 4 ? true : false}
            fetchData={fetchData}
            special={true}
            notFound={"لا يوجد اسعار ارفع ملف"}
          />

        </Tabel.LayoutTable>
      </OrdersContext.Provider>
      <ModalPob open={open} handleClose={handleClose}   >
        <form onSubmit={e => handleUpadteUntis(e)} className='flex flex-col gap-4 items-center justify-center'>
          <input value={fileValue} onChange={e => {
            setUnitFile(e.target.files[0])
            setFileSet(true)
            setFileValue(e.target.value)
          }} id="file" type='file' accept='xlsx' className='hidden' />
          <label htmlFor='file' className='flex flex-col items-center cursor-pointer'  >
            <CloudUploadIcon sx={{ fontSize: 40, color: "#282561" }} />
            <p>{fileSet == false ? " اختر ملف اكسل" : unitFile.name}</p>
          </label>
          {fileSet == true && <button type='submit' className='w-fit px-20  h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'>
            حفظ التغييرات
          </button>}
        </form>
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
    </div>
  )
}
