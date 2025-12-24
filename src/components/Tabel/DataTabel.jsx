
import "./table.css";
import { DataGrid } from "@mui/x-data-grid";
import ActionsManageModal from "./../Modals/ActionsManageModal";
import { useContext, useMemo, useState } from "react";
import { IOSSwitch } from "../elements/SwitchItem";
import lisIcon from "/public/assets/icons/listMenu.svg"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import dollar from '../../../public/assets/icons/dolar.svg'
import editIcon from '../../../public/assets/icons/Edit 3.svg'
import { CircularProgress } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormGroup } from "@mui/material";
import ModalPob from "../Modals/Modal";
import Delete from "../elements/Delete";
import EditPriceForm from "../forms/EditPriceForm";
import TrancferReDiricte from "../forms/TrancferReDiricte";
import toast from "react-hot-toast";
import clsx from "clsx";
import { OrdersContext } from "../../hooks/UseContext";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import Cookies from 'js-cookie';
import EditSpecialPrice from "../forms/EditSpecialPrice";
import { useNavigate } from "react-router-dom";
import ActionProvider from "../actionProviders/ActionProvider.jsx";
import DeleteApp from "../forms/DeleteApp.jsx";
import AppPrices from "../appPrices/AppPrices.jsx";
import ModalDetails from "../Modals/ModalDetails";
import DetalisFinancial from "../Modals/DetalisFinancial.jsx";
import ModalDetailsInquries from "../Modals/ModalDetailsInquries.jsx";
import AgentTrancferReDiricte from "../forms/AgentTrancferReDiricte.jsx";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";


const DataTable = ({
  columns,
  mainPage,
  accountsPage,
  transferPage,
  finincalPage,
  ordersPage,
  pricesPage,
  notFound,
  rolles,
  fetchData,
  users,
  Account,
  bills,
  agents,
  special,
  providersPage,
  appsPage,
  error,
  inquiresPage,
  agentPage,
  total,
  loading
}) => {


  const navigate = useNavigate()
  const rows = useContext(OrdersContext)
  const [offset, setOffset] = useState(0);
  console.log(offset)
  const [submit, setSubmit] = useState(false)
  const [app, setApp] = useState()
  const [actionPopup, setActionsPopup] = useState(false);
  const [stepNum, setStepNum] = useState(1);
  const [user, setUser] = useState();
  const [openModalOrder, setOpenModalOrder] = useState(false);
  const [openModalInquires, setOpenModalInquires] = useState(false);
  const [openTrancfer, setOpenTrancfer] = useState(false);
  const [openTrancferAgent, setOpenTrancferAgent] = useState(false);
  const [userPoint, setUserPoint] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [useId, setUserId] = useState()
  const [appName, setAppName] = useState()
  const [anchorEl, setAnchorEl] = useState(null);
  const [fixed, setFixed] = useState()
  const [name, setName] = useState()
  const [amount, setAmount] = useState()
  const [transferMethod, setTransferMethod] = useState()
  const [transferNum, setTransferNum] = useState()
  const [notes, setNotes] = useState()
  const [openApp, setOpenApp] = useState(false)
  const [openDetailsfinincal, setOpenDetailsfinincal] = useState(false)
  const [billName, setBillName] = useState()
  const [stutas, setStutas] = useState()
  const [page, setPage] = useState(1)

  const getPaginationRange = (current, total) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let last;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (last) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (i - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      last = i;
    }

    return rangeWithDots;
  };
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > total) return;

    setPage(newPage);
    setOffset(newPage - 1);
    fetchData(newPage - 1);
  };

  const handleOpenApp = () => {
    setOpenApp(true)
  }

  const handleCloseApp = () => {
    setOpenApp(false)
  }


  const open = Boolean(anchorEl);
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }
  const handleCloseTrancfer = () => {
    setOpenTrancfer(false)
  }
  const handleCloseTrancferAent = () => {
    setOpenTrancferAgent(false)
  }

  const handleOpenTrancfer = (value, id, aomut, billable) => {
    setOpenTrancfer(true)
    setUserPoint(value)
    setUserId(id)
    setAmount(aomut)
    setTransferMethod(billable.transfer_method)
    setTransferNum(billable.transfer_number)
    setNotes(billable.notes)
  }
  const handleOpenTrancferAgent = (value, id, aomut, billable) => {
    setOpenTrancferAgent(true)
    setUserPoint(value)
    setUserId(id)
    setAmount(aomut)
    setTransferMethod(billable.transfer_method)
    setTransferNum(billable.transfer_number)
    setNotes(billable.notes)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    setUser(data)
    setFixed(data.is_fixed)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showDetailsOrder = (value) => {

    setOpenModalOrder(true);
    setUserId(value);
  };
  const showDetailsInquires = (value) => {
    setOpenModalInquires(true);
    setUserId(value);
  };

  const showDetailsfinincal = (row) => {
    setOpenDetailsfinincal(true)
    setUserId(row.id)
    setBillName(row.billable_type)
    setStutas(row.status)

  }
  const closeDetailsfinincal = () => {
    setOpenDetailsfinincal(false)
  }
  const extendedColumns = useMemo(() => {

    const newColumns = [...columns];

    if (ordersPage || Account) {

      rows?.map(ele => {
        return ele.details = "عرض التفاصيل"
      }
      )

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: (params) => (
          <button
            onClick={() => showDetailsOrder(params.row.id)}
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });
    }
    if (agentPage) {
      rows?.map(ele => {
        return ele.details = "عرض التفاصيل"
      }
      )

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: (params) => (
          <button
            onClick={() => handleOpenTrancferAgent(params.row.customer_name ? params.row.customer_name : params.row.employee_name ? params.row.employee_name : null, params.row.id, params.row.amount, params.row.billable)}
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });

    }
    if (inquiresPage) {

      rows?.map(ele => {
        return ele.details = "عرض التفاصيل"
      }
      )

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: (params) => (
          <button
            onClick={() => showDetailsInquires(params.row.id)}
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });
    }
    if (finincalPage) {

      rows?.map(ele => {
        return ele.details = "عرض التفاصيل"
      }
      )

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: (params) => (
          <button
            onClick={() => showDetailsfinincal(params.row)}
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });
    }
    if (transferPage) {

      rows?.map(ele => {
        return ele.details = "عرض التفاصيل"
      }
      )

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: (params) => (
          <button
            onClick={() => handleOpenTrancfer(params.row.customer_name ? params.row.customer_name : params.row.employee_name ? params.row.employee_name : null, params.row.id, params.row.amount, params.row.billable)}
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });
    }

    if (accountsPage) {
      newColumns.push(
        {
          field: "agent_id",
          headerName: "تابع لوكيل",
          width: 195,
          renderCell: (params) => (
            <p className="flex gap-5">
              {
                params.row.agent_id ? agents.map(ele => {
                  if (params.row.agent_id == ele.id) {
                    return ele.username
                  }

                })
                  :
                  "_"
              }
            </p>
          ),
        },
        {
          field: "is_disabled",
          type: "string",
          headerName: "حظر | فك الحظر",
          width: 150,
          renderCell: (params) => (
            params.row.is_disabled == 0 ?
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch title={"تعطيل الحساب"} sx={{ m: 1 }} onChange={e => handelStateUser(e, params.row.id)} />
                  }
                />

              </FormGroup>
              :
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch title={"تفعيل الحساب"} sx={{ m: 1 }} defaultChecked onChange={e => handelStateUser(e, params.row.id)} />
                  }
                />

              </FormGroup>


          ),
        },
        {
          field: "is_agent",
          type: "string",
          headerName: "تحديد وكيل | الغاء التحديد",
          width: 220,
          renderCell: (params) => (
            params.row.agent_id == null ?
              params.row.is_agent == 0 ?
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch title={"تحديد كوكيل"} sx={{ m: 1 }} onChange={e => handelAgentUser(e, params.row.id, params.row.is_agent)} />
                    }
                  />

                </FormGroup>
                :
                <FormGroup>
                  <FormControlLabel
                    control={
                      <IOSSwitch title={"الغاء التحديد كوكيل"} sx={{ m: 1 }} defaultChecked onChange={e => handelAgentUser(e, params.row.id, params.row.is_agent)} />
                    }
                  />

                </FormGroup>
              :
              `عميل تابع لوكيل معتمد `

          ),
        },
        {
          field: "actions",
          headerName: "",
          width: 195,
          renderCell: (params) => (
            <div className="flex gap-5">
              {[{
                id: 1,
                title: "تعديل"
              }, {
                id: 2,
                title: " الصلاحيات"
              }, {
                id: 3,
                title: "الاسعار"
              }, {
                id: 4,
                title: "حذف"
              },
              {
                id: 5,
                title: "العمليات"
              }
              ].map((num) => {
                if (num.id == 3) {
                  if (params.row.rank == "private") {
                    return <img
                      key={num.id}
                      src={`/assets/icons/icon${num.id}.svg`}
                      alt=""
                      width={22}
                      height={22}
                      className="cursor-pointer"
                      onClick={() => {
                        setActionsPopup(true);
                        setStepNum(num.id);
                        setUser(params.row)
                        setName(params.row.username)
                      }}
                      title={num.title}
                    />
                  } else {
                    null
                  }
                } else {
                  return <img
                    key={num.id}
                    src={`/assets/icons/icon${num.id}.svg`}
                    alt=""
                    width={22}
                    height={22}
                    className="cursor-pointer"
                    onClick={() => {
                      setActionsPopup(true);
                      setStepNum(num.id);
                      setUser(params.row)
                    }}
                    title={num.title}
                  />
                }

              })}
            </div>
          ),
        },
      );
    }

    if (pricesPage) {
      newColumns.push(
        {
          field: "action",
          headerName: "",
          width: 195,
          renderCell: (params) => (
            <img
              className="cursor-pointer"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => handleClick(e, params.row)} src={lisIcon} />
          ),
        },
      );
    }
    if (providersPage) {
      newColumns.push(
        {
          field: "action",
          headerName: "",
          width: 195,
          renderCell: (params) => (
            <ActionProvider fetchData={fetchData} data={params.row} />
          ),
        },
      );
    }
    if (appsPage) {
      newColumns.push(
        {
          field: "actions",
          headerName: "",
          width: 195,
          renderCell: (params) => (
            <div className="flex gap-5">
              <img
                src={`/assets/icons/icon4.svg`}
                alt=""
                width={22}
                height={22}
                onClick={() => {
                  handleOpenApp()
                  setUserId(params.row.id);
                  setApp(1)
                }}
                className="cursor-pointer"
                title={"حذف"}
              />
              <img
                src={`/assets/icons/icon3.svg`}
                alt=""
                width={22}
                height={22}
                onClick={() => {
                  handleOpenApp()
                  setUserId(params.row.id);
                  setAppName(params.row.name)
                  setApp(2)
                }}
                className="cursor-pointer"
                title={"الأسعار"}
              />

            </div>
          ),
        },
      );
    }
    // if (pricesProviderPage) {
    //  newColumns.push(
    //     {
    //       field: "action",
    //       headerName: "",
    //       width: 195,
    //       renderCell: (params) => (
    //         <ActionProviderPrices fetchData={fetchData} data={params.row.name} />
    //       ),
    //     },
    //   );
    // }
    return newColumns;

  }, [columns, accountsPage, transferPage, mainPage, finincalPage, ordersPage, pricesPage, rows]);

  const handelStateUser = async (e, id) => {
    e.preventDefault()
    setSubmit(true)
    if (e.target.checked == true) {
      await axios.request(
        {
          url: `${baseUrl}users/${id}/update-user-state`,
          method: "put",
          data: {
            is_disabled: 1
          },

          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${Cookies.get('token')}`,
          }
        }

      )
        .then(res => {
          fetchData()
          toast.success("تم  تعطيل الحساب بنجاح")
          setSubmit(false)
        })
        .catch(e => {
          toast.error("فشلت العملية")
          setSubmit(false)
          navigate(0)
        })

    } else {
      await axios.request(
        {
          url: `${baseUrl}users/${id}/update-user-state`,
          method: "put",
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          data: {
            is_disabled: 0
          }
        })
        .then(res => {
          fetchData()
          toast.success("تم تفعيل الحساب بنجاح")
          setSubmit(false)
        })
        .catch(e => {
          toast.error("فشلت العملية")
          setSubmit(false)
          navigate(0)
        })
    }

  }

  const handelAgentUser = async (e, id, agent) => {
    e.preventDefault()
    setSubmit(true)
    console.log(e.target.checked)
    if (e.target.checked == true) {
      await axios.request(
        {
          url: `${baseUrl}makeUserAgent/${id}`,
          method: "get",
          data: {
            is_agent: 1
          },
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${Cookies.get('token')}`,
          }
        }

      )
        .then(res => {
          fetchData()
          toast.success("تمت العملية بنجاح")
          setSubmit(false)
        })
        .catch(e => {
          toast.error("فشلت العملية")
          setSubmit(false)
        })
    } else {
      await axios.request(
        {
          url: `${baseUrl}unmakeUserAgent/${id}`,
          method: "get",
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          data: {
            is_agent: 0
          },
        })
        .then(res => {
          fetchData()
          toast.success("تمت العملية بنجاح")
          setSubmit(false)
        })
        .catch(e => {
          toast.error("فشلت العملية")
          setSubmit(false)
        })
    }



  }

  const handleFixed = async (e) => {
    e.preventDefault()
    setSubmit(true)

    if (e.target.checked == true) {
      let urlBills = `${special == true ? "special-" : ""}bill-prices/${user.id}/update-is-fixed?is_fixed=1`
      let urlUnits = `${special == true ? "special-" : ""}unit-prices/${user.id}/update-is-fixed?is_fixed=1`
      await axios.request({
        url: `${baseUrl}${bills == true ? urlBills : urlUnits}`,
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      })
        .then(res => {
          toast.success("تمت التعديل الي قيمة ثابتة بنجاح")
          setSubmit(false)
          fetchData()
        })
        .catch(e => {
          toast.error("فشلت العملية")
          setSubmit(false)
        })
    } else {
      let urlBills = `${special == true ? "special-" : ""}bill-prices/${user.id}/update-is-fixed?is_fixed=0`
      let urlUnits = `${special == true ? "special-" : ""}unit-prices/${user.id}/update-is-fixed?is_fixed=0`
      await axios.request({
        url: `${baseUrl}${bills == true ? urlBills : urlUnits}`,
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        }
      })
        .then(res => {
          toast.success("تمت الغاء القيمة ثابتة بنجاح")
          setSubmit(false)
          fetchData()
        })
        .catch(e => {
          toast.error("فشلت العملية")
          setSubmit(false)
        })
    }

  }
  return (

    <div className="table-data">
      {loading && (
        <CircularProgress className="ml-[50%] mt-[10%]" />
      )}

      {!loading && error && (
        <p className="text-center">
          يوجد خطأ في الشبكة، الرجاء المحاولة لاحقًا أو تسجيل الخروج
        </p>
      )}

      {!loading && !error && rows && rows.length === 0 && (
        <p className="text-center">{notFound}</p>
      )}

      {!loading && !error && rows && rows.length > 0 && (
        <div className="dataTable" style={{ direction: "rtl" }}>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            <MenuItem className="text-right" onClick={handleClose}>
              <img width={24} height={24} src={dollar} />
              <p className="pr-2 text-base font-medium text-[#282561]">
                مبلغ ثابت
              </p>

              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={fixed !== 0}
                      onChange={handleFixed}
                    />
                  }
                />
              </FormGroup>
            </MenuItem>

            <hr className="bg-[#CAC4D0] w-[90%] h-[2px] mx-2 mr-4 " />

            <MenuItem
              className="text-right"
              onClick={() => {
                handleOpenEdit()
                handleClose()
              }}
            >
              <img src={editIcon} width={24} height={24} />
              <p className="pr-2 text-base font-medium text-[#282561]">
                تعديل الفئة
              </p>
            </MenuItem>
          </Menu>

          <DataGrid
            className="dataGrid"
            rows={rows}
            sx={{ width: "100%" }}
            columns={extendedColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
            checkboxSelection={false}
            disableRowSelectionOnClick
          />
        </div>
      )}


      {actionPopup && (
        <ActionsManageModal
          handleClose={setActionsPopup}
          open={actionPopup}
          stepNum={stepNum}
          user={user}
          rolles={rolles}
          fetchData={fetchData}
          name={name}
        />
      )}
      {ordersPage || Account ?
        <ModalDetails
          handleClose={setOpenModalOrder}
          open={openModalOrder}
          fetchData={fetchData}
          useId={useId}
        /> : null
      }
      {inquiresPage &&
        <ModalDetailsInquries
          handleClose={setOpenModalInquires}
          open={openModalInquires}
          fetchData={fetchData}
          useId={useId}
        />
      }

      <ModalPob open={openDelete} handleClose={handleCloseDelete} handleOpen={handleOpenDelete} >
        <Delete id={useId} handelClose={handleCloseDelete} />
      </ModalPob>
      <ModalPob open={openEdit} handleClose={handleCloseEdit} handleOpen={handleOpenEdit} >
        {special !== true && <EditPriceForm bills={bills} data={user} close={handleCloseEdit} fetchData={fetchData} />}
        {special == true && <EditSpecialPrice data={user} close={handleCloseEdit} bills={bills} fetchData={fetchData} />}
      </ModalPob>
      <ModalPob open={openTrancfer} handleClose={handleCloseTrancfer}  >
        <TrancferReDiricte note={notes} method={transferMethod} num={transferNum} amountValue={amount} close={handleCloseTrancfer} fetchData={fetchData} users={users} userId={useId} userIdPoint={userPoint && userPoint} />
      </ModalPob>
      <ModalPob open={openTrancferAgent} handleClose={handleCloseTrancferAent}  >
        <AgentTrancferReDiricte note={notes} method={transferMethod} num={transferNum} amountValue={amount} close={handleCloseTrancferAent} fetchData={fetchData} users={users} userId={useId} userIdPoint={userPoint && userPoint} />
      </ModalPob>
      <ModalPob open={openApp} handleClose={handleCloseApp} >
        {app == 1 && <DeleteApp fetchData={fetchData} handelClose={handleCloseApp} id={useId} />}
        {app == 2 && <AppPrices id={useId} name={appName} />}
      </ModalPob>
      <ModalPob open={openDetailsfinincal} handleClose={closeDetailsfinincal} handleOpen={showDetailsfinincal} >

        <DetalisFinancial close={closeDetailsfinincal} stutas={stutas} bill={billName} id={useId} />

      </ModalPob>
      <div className={
        clsx(
          'w-full h-full flex items-center justify-center absolute top-0 left-0 bg-[#ffffff7e]',
          {
            'hidden'
              : submit == false
          }
        )
      }>
        <CircularProgress />
      </div>

      <div className="flex" >
        <p>
          عدد الصفحات :
        </p>
        {total}
      </div>
      <div className="flex" >
        الصفحة {page} من  {total}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">

        {/* السابق */}
        <ArrowBackIos
          className={`cursor-pointer ${page === 1 && "opacity-50 pointer-events-none"}`}
          onClick={() => handlePageChange(page - 1)}
        />

        {/* أرقام الصفحات */}
        {getPaginationRange(page, total).map((item, index) =>
          item === "..." ? (
            <span key={index} className="px-2">...</span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(item)}
              className={clsx(
                "px-3 py-1 rounded",
                item === page
                  ? "bg-[#4880FF] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              )}
            >
              {item}
            </button>
          )
        )}

        {/* التالي */}
        <ArrowForwardIos
          className={`cursor-pointer ${page === total && "opacity-50 pointer-events-none"}`}
          onClick={() => handlePageChange(page + 1)}
        />
      </div>


    </div>

  );
};

export default DataTable;
