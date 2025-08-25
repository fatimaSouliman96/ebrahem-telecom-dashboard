import { useEffect, useState } from "react";
import { MainButton, ModalPob } from "../../components";
import AddApp from "../../components/forms/AddApp";
import { Tabel } from "../../components/Tabel";
import { OrdersContext } from "../../hooks/UseContext";
import { appsColumns } from "../../constants/data";
import axios from 'axios'
import Cookies from 'js-cookie';
import { baseUrl } from '../../constants/baseUrl'
import toast from 'react-hot-toast';


export default function Apps() {
    const [open, setOpen] = useState(false)
    const [allApps, setAllapps] = useState()
    const [error, setError] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const fetchAllApps = async () => {
        await axios.request(
            {
                url: `${baseUrl}apps`,
                method: "get",
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            }
        ).then((res) => {
            setAllapps(res.data.applications)
        })
            .catch(e => {
                toast.error("Faild to fetch data")
                setError(true)
            })
    }

    useEffect(() => {
        fetchAllApps()
    }, [])

    return (
        <>
            <div className="accounts-header flex items-center justify-between mb-8 rtl">
                <h1 className="text-2xl lg:text-[32px] font-bold text-right">
                    {" "}
                    إدارة التطبيقات
                </h1>
                <MainButton
                    title="إضافة تطبيق"
                    w="219px"
                    h="35px"
                    handleClick={() => setOpen(true)}
                />
            </div>
            <OrdersContext.Provider value={allApps}>
                <Tabel.LayoutTable title={"التطبيقات"}>
                    <Tabel.DataTable
                    error={error}
                        columns={appsColumns}
                        appsPage={true}
                        notFound={"لا يوجد تطبيقات"}
                        fetchData={fetchAllApps}
                    />
                </Tabel.LayoutTable>
            </OrdersContext.Provider>


            <ModalPob open={open} handleClose={handleClose} >
                <AddApp handleClose={handleClose} fetchAllApps={fetchAllApps} />
            </ModalPob>

        </>
    )
}
