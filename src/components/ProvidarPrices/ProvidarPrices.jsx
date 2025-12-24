import React, { useEffect, useState } from 'react'
import { Tabel } from '../Tabel'
import { providersPricesColumns } from '../../constants/data'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import axios from 'axios'
import { baseUrl } from '../../constants/baseUrl'
import { OrdersContext } from '../../hooks/UseContext'
import CircularProgress from "@mui/material/CircularProgress";
import ModalPob from '../Modals/Modal'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



export default function ProvidarPrices({ id, name }) {



  const [dataPrices, setDataPrices] = useState()

  const [submit, setSubmit] = useState(false)
  const [open, setOpen] = useState(false);

  const [unitFile, setUnitFile] = useState()
  const [fileSet, setFileSet] = useState(false)
  const [fileValue, setFileValue] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }



  const fetchData = async () => {
      setLoading(true)
    await axios.request(
      {
        url: `${baseUrl}isp/isp-bundles/${id}`,
        method: "get",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      }
    ).then((res) => {
        setLoading(false)
      setDataPrices(res.data)
    })
      .catch(e => {
        setError(true)
         setLoading(false)
        toast.error("Faild to log out")
      })
  }

  const handleUpadteProviders = async (e) => {
    e.preventDefault()
    setSubmit(true)
    const data = new FormData()
    data.append("file", unitFile)

    await axios.request({
      url: `${baseUrl}isp/isp-bundles/import/${id}`,
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

  const handleDownload = async () => {
    setSubmit(true)

    await fetch(`${baseUrl}isp/isp-bundles/export/${id}`, {
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
        link.download = `${`${name}-provider-prices.xlsx`}`;
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

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='h-[500px] w-[700px] overflow-y-scroll pr-2'>

      <h1 className="text-2xl lg:text-[32px] font-bold text-right">
        لائحة الأسعار
      </h1>

      <div className='flex justify-between items-center w-full'>
        <button onClick={() => handleOpen()} className='w-full mt-8 h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'>
          رفع ملف اسعار المزود
        </button>
        {/* <button onClick={() => handleOpenAdd()} className='w-2/5 mt-8 h-[48px]  bg-main-color text-white border  rounded-lg flex-center main-button'>
          إضافة سعر مزود  
        </button> */}
      </div>

      <OrdersContext.Provider value={dataPrices}>
        <Tabel.LayoutTable pricesPage={true} handleDownload={handleDownload} title={"الأسعار"}>

          <Tabel.DataTable
            columns={providersPricesColumns}
            error={error}
            pricesProviderPage={true}
            fetchData={fetchData}
            special={true}
            loading={loading}
            notFound={"لا يوجد اسعار ارفع ملف"}
          />

        </Tabel.LayoutTable>
      </OrdersContext.Provider>
      <ModalPob open={open} handleClose={handleClose}   >
        <form onSubmit={e => handleUpadteProviders(e)} className='flex flex-col gap-4 items-center justify-center'>
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
      {/* <ModalPob open={openAdd} handleClose={handleCloseAdd} >
        <AddPriceProvider fetchData={fetchData} close={handleCloseAdd} />
      </ModalPob> */}
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
