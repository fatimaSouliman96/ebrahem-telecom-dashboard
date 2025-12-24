import CircularProgress from "@mui/material/CircularProgress";
import  { useState } from 'react'
import ModalPob from '../Modals/Modal';
import Cookies from 'js-cookie';
import axios from 'axios';
import clsx from 'clsx';
import toast from 'react-hot-toast';


export default function ActionProviderPrices() {

    const [openEdit, setOpenEdit] = useState(false);

    const [submit, setSubmit] = useState(false)


    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleOpenEdit = () => {
        setOpenEdit(true)
    }




    return (
        <>
            <div className='flex items-center gap-2' >

                <img title='تعديل' onClick={handleOpenEdit} className='w-6 h-6 cursor-pointer ' src='/public/assets/icons/edit.svg' />


            </div>
            <ModalPob open={openEdit} handleClose={handleCloseEdit} handleOpen={handleOpenEdit} >
                {/* <EditProvider fetchData={fetchData} data={data} close={handleCloseEdit} /> */}
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

            {/* <Actions.SpecialPrices name={data?.name} id={id} /> */}
        </>

    )
}
