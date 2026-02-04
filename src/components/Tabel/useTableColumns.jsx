import { useMemo } from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import { IOSSwitch } from "../elements/SwitchItem";
import lisIcon from "/public/assets/icons/listMenu.svg";
import ActionProvider from "../actionProviders/ActionProvider.jsx";

export const useTableColumns = ({
  columns,
  accountsPage,
  transferPage,
  mainPage,
  finincalPage,
  ordersPage,
  pricesPage,
  agentPage,
  providersPage,
  appsPage,
  inquiresPage,
  rows,
  agents,
  Account,
  fetchData,
  handleOpenTrancferAgent,
  showDetailsOrder,
  showDetailsInquires,
  showDetailsfinincal,
  handleOpenTrancfer,
  handelStateUser,
  handelAgentUser,
  setActionsPopup,
  setStepNum,
  setUser,
  setName,
  handleClick,
  handleOpenApp,
  setUserId,
  setApp,
  setAppName,
  fixed,
}) => {
  const extendedColumns = useMemo(() => {
    const newColumns = [...columns];

    // ================= Orders & Account =================
    if (ordersPage || mainPage || Account) {
      rows?.forEach(ele => (ele.details = "عرض التفاصيل"));

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: params => (
          <button
            onClick={() => showDetailsOrder(params.row.id)}
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });
    }

    // ================= Agent Page =================
    if (agentPage) {
      rows?.forEach(ele => (ele.details = "عرض التفاصيل"));

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: params => (
          <button
            onClick={() =>
              handleOpenTrancferAgent(
                params.row.customer_name
                  ? params.row.customer_name
                  : params.row.employee_name
                  ? params.row.employee_name
                  : null,
                params.row.id,
                params.row.amount,
                params.row.billable
              )
            }
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });
    }

    // ================= Inquires Page =================
    if (inquiresPage) {
      rows?.forEach(ele => (ele.details = "عرض التفاصيل"));

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: params => (
          <button
            onClick={() => showDetailsInquires(params.row.id)}
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });
    }

    // ================= Financial Page =================
    if (finincalPage) {
      rows?.forEach(ele => (ele.details = "عرض التفاصيل"));

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: params => (
          <button
            onClick={() => showDetailsfinincal(params.row)}
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });
    }

    // ================= Transfer Page =================
    if (transferPage) {
      rows?.forEach(ele => (ele.details = "عرض التفاصيل"));

      newColumns.push({
        field: "details",
        type: "string",
        headerName: "",
        width: 120,
        renderCell: params => (
          <button
            onClick={() =>
              handleOpenTrancfer(
                params.row.customer_name
                  ? params.row.customer_name
                  : params.row.employee_name
                  ? params.row.employee_name
                  : null,
                params.row.id,
                params.row.amount,
                params.row.billable
              )
            }
            className="underline text-[#4880FF] details"
          >
            {params.row.details}
          </button>
        ),
      });
    }

    // ================= Accounts Page =================
    if (accountsPage) {
      newColumns.push(
        {
          field: "agent_id",
          headerName: "تابع لوكيل",
          width: 195,
          renderCell: params => (
            <p className="flex gap-5">
              {params.row.agent_id
                ? agents?.map(ele =>
                    params.row.agent_id === ele.id ? ele.username : null
                  )
                : "_"}
            </p>
          ),
        },
        {
          field: "is_disabled",
          type: "string",
          headerName: "حظر | فك الحظر",
          width: 150,
          renderCell: params => (
            <FormGroup>
              <FormControlLabel
                control={
                  <IOSSwitch
                    title={params.row.is_disabled === 0 ? "تعطيل الحساب" : "تفعيل الحساب"}
                    sx={{ m: 1 }}
                    defaultChecked={params.row.is_disabled !== 0}
                    onChange={e => handelStateUser(e, params.row.id)}
                  />
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
          renderCell: params =>
            params.row.agent_id == null ? (
              <FormGroup>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      title={params.row.is_agent === 0 ? "تحديد كوكيل" : "الغاء التحديد كوكيل"}
                      sx={{ m: 1 }}
                      defaultChecked={params.row.is_agent !== 0}
                      onChange={e =>
                        handelAgentUser(e, params.row.id, params.row.is_agent)
                      }
                    />
                  }
                />
              </FormGroup>
            ) : (
              `عميل تابع لوكيل معتمد`
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

    // ================= Prices Page =================
    if (pricesPage) {
      newColumns.push({
        field: "action",
        headerName: "",
        width: 195,
        renderCell: params => (
          <img
            className="cursor-pointer"
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            onClick={e => handleClick(e, params.row)}
            src={lisIcon}
          />
        ),
      });
    }

    // ================= Providers Page =================
    if (providersPage) {
      newColumns.push({
        field: "action",
        headerName: "",
        width: 195,
        renderCell: params => <ActionProvider fetchData={fetchData} data={params.row} />,
      });
    }

    // ================= Apps Page =================
    if (appsPage) {
      newColumns.push({
        field: "actions",
        headerName: "",
        width: 195,
        renderCell: params => (
          <div className="flex gap-5">
            <img
              src={`/assets/icons/icon4.svg`}
              alt=""
              width={22}
              height={22}
              onClick={() => {
                handleOpenApp();
                setUserId(params.row.id);
                setApp(1);
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
                handleOpenApp();
                setUserId(params.row.id);
                setAppName(params.row.name);
                setApp(2);
              }}
              className="cursor-pointer"
              title={"الأسعار"}
            />
          </div>
        ),
      });
    }

    return newColumns;
  }, [
    columns,
    accountsPage,
    transferPage,
    mainPage,
    finincalPage,
    ordersPage,
    pricesPage,
    agentPage,
    providersPage,
    inquiresPage,
    appsPage,
    rows,
    agents,
    handleOpenTrancferAgent,
    showDetailsOrder,
    showDetailsInquires,
    showDetailsfinincal,
    handleOpenTrancfer,
    handelStateUser,
    handelAgentUser,
    setActionsPopup,
    setStepNum,
    setUser,
    setName,
    handleClick,
    handleOpenApp,
    setUserId,
    setApp,
    setAppName,
    fixed,
  ]);

  return extendedColumns;
};

