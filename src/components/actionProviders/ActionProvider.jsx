import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import  { useState } from 'react'
import { IOSSwitch } from '../elements/SwitchItem'
import ModalPob from '../Modals/Modal';
import EditProvider from '../forms/EditProvider';
import Delete from '../elements/Delete';
import Cookies from 'js-cookie';
import axios from 'axios';
import clsx from 'clsx';
import { baseUrl } from '../../constants/baseUrl';
import toast from 'react-hot-toast';
import ProvidarPrices from '../ProvidarPrices/ProvidarPrices';


export default function ActionProvider({ data, fetchData }) {

    const id = data?.id
    const [openEdit, setOpenEdit] = useState(false);
    const [openPrices, setOpenPrices] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [fixedValue, setFixedValue] = useState(data.is_active)
    const [submit, setSubmit] = useState(false)

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleOpenEdit = () => {
        setOpenEdit(true)
    }

    const handleOpenPrices = () => {
        setOpenPrices(true)
    }
    const handleClosePrices = () => {
        setOpenPrices(false)
    }




    const handleActive = async (e) => {
        e.preventDefault()
        setSubmit(true)
        if (e.target.checked == true) {
            setFixedValue(1)
        } else {
            setFixedValue(0)
        }
        await axios.request({
            url: `${baseUrl}isp/toggle-active/${id}`,
            method: "PATCH",
            data: { is_active: fixedValue },
            headers: {
                "Accept": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        })
            .then(res => {
                
                    setSubmit(false)
                    toast.success(`${fixedValue == 1 ? "تم التعطيل بنجاح" : "تم التفعيل بنجاح"} `)
                    fetchData()
                    close()
                
               
            })
            .catch(e => {
                e&&toast.error("فشلت العملية")
                setSubmit(false)
            })
    }
    return (
        <>
            <div className='flex items-center gap-2' >

                <img title='تعديل' onClick={handleOpenEdit} className='w-6 h-6 cursor-pointer ' src='/assets/icons/edit.svg' />
                <img title='حذف' onClick={handleOpenDelete} className='w-6 cursor-pointer h-6 mr-4' src='/assets/icons/trash-red.svg' />

                {fixedValue == 0 ? <FormGroup>
                    <FormControlLabel
                        control={
                            <IOSSwitch title={"تفعيل لمزود"} sx={{ m: 1 }} onChange={e => handleActive(e)} />
                        }
                    />

                </FormGroup>
                    :
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <IOSSwitch title={"تعطيل المزود"} sx={{ m: 1 }} defaultChecked onChange={e => handleActive(e)} />
                            }
                        />

                    </FormGroup>}
                 <img onClick={handleOpenPrices} className='w-6 h-6 mr-4 cursor-pointer ' src='/assets/icons/icon3.svg' />   

            </div>
            <ModalPob open={openEdit} handleClose={handleCloseEdit} handleOpen={handleOpenEdit} >
                <EditProvider fetchData={fetchData} data={data} close={handleCloseEdit} />
            </ModalPob>
            <ModalPob open={openDelete} handleClose={handleCloseDelete} handleOpen={handleOpenDelete} >
                <Delete fetchData={fetchData} id={data?.id} handelClose={handleCloseDelete} />
            </ModalPob>
            <div className={
                clsx(
                    'w-full h-full z-50 flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
                    {
                        'hidden'
                            : submit == false
                    }
                )
            }>
                <CircularProgress />
            </div>
            <ModalPob open={openPrices} handleClose={handleClosePrices} handleOpen={handleOpenPrices} >
                <ProvidarPrices id={id} name={data?.name} />
            </ModalPob>
            {/* <Actions.SpecialPrices name={data?.name} id={id} /> */}
        </>

    )
}
