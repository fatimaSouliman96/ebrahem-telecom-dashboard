import clsx from "clsx";
import { Link } from "react-router-dom";
import NumberDisplay from '../hooks/NumberDisplay'

// ===================================================================
// ========================== Operations ===============================

export const billName = [
  {
    en: "TopUpRequest",
    ar: "رصيد"
  },
  {
    en: "ApplicationPay",
    ar: "طلب ألعاب"
  },
  {
    en: "FixedLineBill",
    ar: "فاتورة أرضي"
  },
  {
    en: "InternetBill",
    ar: "فاتورة إنترنت"
  },
  {
    en: "ElectricityBill",
    ar: "فاتورة كهرباء"
  },
  {
    en: "WaterBill",
    ar: "فاتورة مياه"
  },
  {
    en: "CashRequest",
    ar: "كاش"
  }

]
export const orderType = [
  {
    en: "wholesale",
    ar: "جملة"
  },
  {
    en: "retail",
    ar: "مفرق"
  },
  {
    en: "private",
    ar: "خاص"
  }

]
export const billStatus = [
  {
    en: "pending",
    ar: "انتظار"
  },
  {
    en: "completed",
    ar: "منجزة"
  },
  {
    en: "rejected",
  
    ar: "مرفوضة"
  },
  {
    en: "processing",
    ar: "جار المعالجة"
  }
]
export const rolles = [
  {
    en: "generalManager",
    ar: "مدير عام"
  },
  {
    en: "financialManager",
    ar: "مدير مالي"
  },
  {
    en: "employee",
    ar: "موظف"
  },
  {
    en: "pointOfSale",
    ar: "نقطة بيع"
  },
]

export const companyNames = [
  {
    en: "Syriatel",
    ar: "سيرياتيل"
  },
  {
    en: "MTN",
    ar: "MTN"
  },
  {
    en: "Wafaa",
    ar: "وفا"
  }
]
export const billBalanceType = [
  {
    en: "prepaid",
    ar: "مسبق الدفع"
  },
  {
    en: "lastpaid",
    ar: "لاحق الدفع"
  },
  {
    en: "cash",
    ar: "كاش"
  },
]


export const permissions = [
  {
    en: "authorizedAgent",
    ar: "وكيل معتمد",
    roles: ["generalManager", "pointOfSale"]
  },
  {
    en: "sendRequestNewBalance",
    ar: "ارسال طلب تجديد رصيد",
    roles: ["generalManager", "pointOfSale"]
  },
  {
    en: "sendPaymentAndInquiryRequests",
    ar: "ارسال طلبات الدفع و الاستلام",
    roles: ["generalManager"]
  },
  {
    en: "processPaymentAndInquiryRequests",
    ar: "معالجة طلبات الدفع و الاستلام",
    roles: ["generalManager", "employee"]
  },
  {
    en: "accountStatement",
    ar: "كشف حساب",
    roles: ["generalManager", "employee"]
  },
  
  {
    en: "mangSerAndPriceBalance",
    ar: "ادارة خدمات و اسعار",
    roles: ["generalManager", "financialManager"]
  },
  {
    en: "processRequestNewBalance",
    ar: "معالجة طلبات الرصيد المرسلة",
    roles: ["generalManager", "financialManager"]
  },
  {
    en: "amountDispatch",
    ar: "ارسال المبلغ",
    roles: ["generalManager", "financialManager"]
  },
  {
    en: "permissionsAssignment",
    ar: "تعيين الأذونات",
    roles: [ "generalManager" ]
  },
  {
    en: "enableAgents",
    ar: "تمكين ميزات الوكيل",
    roles: ["generalManager"]
  },
  {
    en: "accountCreateAndEdit",
    ar: "انشاء و تعديل الحساب",
    roles: ["generalManager"]
  }

]



export const OperationsColumns = [
  {
    field: "id",
    headerName: "رقم العملية",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "billable_type",
    headerName: "اسم العملية",
    width: 150,
    renderCell: (params) => {
      return (

        <p className="font-semibold text-[#202224]/80 ">
          {
            billName.map(ele => {
              if (ele.en == params.row.billable_type.slice(11)) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "order_type",
    headerName: "نوع الطلب",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {
            orderType.map(ele => {
              if (ele.en == params.row.order_type) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "created_at",
    type: "string",
    headerName: "الوقت - التاريخ",
    width: 210,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{new Date(params.row.created_at).toLocaleString()}</p>
      );
    },
  },
  {
    field: "amount",
    type: "string",
    headerName: "المبلغ",
    width: 100,
    renderCell: (params) => {
      return (
         <p className="font-extrabold text-[#202224]/80" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(params.row.amount))} L.S</p>
      );
    },
  },
  {
    field: "quantity",
    type: "string",
    headerName: "الكمية",
    width: 100,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">
          {params.row.quantity ? params.row.quantity + "" + "Unit" : "_"}
        </p>
      );
    },
  },
  {
    field: "employee_name",
    type: "string",
    headerName: "الموظف",
    width: 150,
    renderCell: (params) => {
      return (
        <Link to="#" className="underline text-[#4880FF]">
          {params.row.employee_name ? params.row.employee_name : "_"}
        </Link>
      );
    },
  },
  {
    field: "status",
    type: "string",
    headerName: "حالة الطلب",
    width: 100,

    renderCell: (params) => {
      return (
        <div
          className={clsx(
            "bg-opacity-20 w-full flex items-center justify-center h-6 rounded text-xs",
            {
              "bg-[#83FF48]  text-[#408236]": params.row.status == "completed",
            },
            {
              "bg-[#FFE248] text-[#826336] ": params.row.status == "pending",
            },
            {
              "bg-[#6248FF] text-[#573682] ":
                params.row.status == "processing",
            },
            {
              "bg-[#FF4848] text-[#823636] ": params.row.status == "rejected",
            }
          )}
        >
          <p>{
            billStatus.map(ele => {
              if (params.row.status == ele.en) {
                return ele.ar
              }
            })
          }</p>
        </div>
      );
    },
  }
];
export const todayOperationsRows = [
  {
    id: 1,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    employee: "@Ahmed123",
    state: "منجزة",
    details: "عرض التفاصيل",
  },
  {
    id: 2,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    employee: "@Ahmed123",
    state: "منجزة",
    details: "عرض التفاصيل",
  },
  {
    id: 3,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    employee: "@Ahmed123",
    state: "منجزة",
    details: "عرض التفاصيل",
  },
  {
    id: 4,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    employee: "@Ahmed123",
    state: "جار المعالجة",
    details: "عرض التفاصيل",
  },
  {
    id: 5,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    employee: "@Ahmed123",
    state: "مرفوضة",
    details: "عرض التفاصيل",
  },
  {
    id: 6,
    balance: "10.000.000",
    credit: "5.000.000",
    date: "12.09.2019 - 12.53 PM",
    rest: "-",
    notes: "لا يوجد",
  },
];

// ===================================================================
// ========================== Recharge ===============================

export const RechargColumns = [
  {
    field: "billable_id",
    headerName: "رقم العملية",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.billable_id}</p>
      );
    },
  },
  {
    field: "customer_name",
    type: "string",
    headerName: "اسم المستخدم",
    width: 150,
    renderCell: (params) => {
      return (
        <Link to="#" className="underline text-[#4880FF]">
          {params.row.customer_name ? params.row.customer_name : "_"}
        </Link>
      );
    },
  },
  {
    field: "id",
    type: "string",
    headerName: "كود العملية",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "amount",
    type: "string",
    headerName: "المبلغ",
    width: 100,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(params.row.amount))} L.S</p>
      );
    },
  },
  {
    field: "quantity",
    type: "string",
    headerName: "الكمية",
    width: 100,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">
          {params.row.quantity ? params.row.quantity + "" + "Unit" : "_"}
        </p>
      );
    },
  },
  {
    field: "created_at",
    type: "string",
    headerName: "الوقت - التاريخ",
    width: 210,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{new Date(params.row.created_at).toLocaleString()}</p>
      );
    },
  },
  {
    field: "status",
    type: "string",
    headerName: "حالة الطلب",
    width: 100,

    renderCell: (params) => {
      return (
        <div
          className={clsx(
            "bg-opacity-20 w-full flex items-center justify-center h-6 rounded  text-xs",
            {
              "bg-[#83FF48]  text-[#408236]": params.row.status == "completed",
            },
            {
              "bg-[#FFE248] text-[#826336] ": params.row.status == "pending",
            },
            {
              "bg-[#6248FF] text-[#573682] ":
                params.row.status == "processing",
            },
            {
              "bg-[#FF4848] text-[#823636] ": params.row.status == "rejected",
            }
          )}
        >
          <p>{
            // params.row.status
            billStatus.map(ele => {
              if (ele.en == params.row.status) {
                return ele.ar
              }

            })
          }</p>
        </div>
      );
    },
  }
];
export const rechargRows = [
  {
    id: 1,
    username: "@Ahmed123",
    code: "70987355",
    amount: "100.00",
    quantity: "100.00",
    date: "12.09.2019 - 12.53 PM",
    state: "مرفوضة",
    details: "عرض التفاصيل",
  },
  {
    id: 2,
    username: "@Ahmed123",
    code: "70987355",
    amount: "100.00",
    quantity: "100.00",
    date: "12.09.2019 - 12.53 PM",
    details: "عرض التفاصيل",
    state: "مرفوضة"
  },
  {
    id: 3,
    username: "@Ahmed123",
    code: "70987355",
    amount: "100.00",
    quantity: "100.00",
    date: "12.09.2019 - 12.53 PM",
    details: "عرض التفاصيل",
    state: "مرفوضة"
  },
  {
    id: 4,
    username: "@Ahmed123",
    code: "70987355",
    amount: "100.00",
    quantity: "100.00",
    date: "12.09.2019 - 12.53 PM",
    details: "عرض التفاصيل",
    state: "مرفوضة"
  },
  {
    id: 5,
    username: "@Ahmed123",
    code: "70987355",
    amount: "100.00",
    quantity: "100.00",
    date: "12.09.2019 - 12.53 PM",
    details: "عرض التفاصيل",
    state: "مرفوضة"
  },
];

// ===================================================================
// ===================== Finincial Statement =========================

export const finincialColumns = [
  {
    field: "id",
    headerName: "رقم العملية",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "billable_type",
    headerName: "اسم العملية",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {
            billName.map(ele => {
              if (ele.en == params.row.billable_type.slice(11)) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "order_type",
    headerName: "نوع الطلب",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {
            orderType.map(ele => {
              if (ele.en == params.row.order_type) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "created_at",
    type: "string",
    headerName: "الوقت - التاريخ",
    width: 210,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{new Date(params.row.created_at).toLocaleString()}</p>
      );
    },
  },
  {
    field: "base_amount",
    type: "string",
    headerName: "المبلغ الاساسي",
    width: 100,
    renderCell: (params) => {
      return (
         <p className="font-extrabold text-[#202224]/80" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(params.row.base_amount))} L.S</p>
      );
    },
  },
  {
    field: "amount",
    type: "string",
    headerName: "المبلغ المقطوع",
    width: 100,
    renderCell: (params) => {
      return (
         <p className="font-extrabold text-[#202224]/80" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(params.row.amount))} L.S</p>
      );
    },
  },
  {
    field: "unit_price",
    type: "string",
    headerName: "الكمية",
    width: 100,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">
          {params.row.unit_price ? params.row.unit_price + "" + "Unit" 
          : params.row.special_client_unit_prices ? params.row.special_client_unit_prices + "" + "Unit"
          : "_"}
        </p>
      );
    },
  },
  {
    field: "customer_name",
    type: "string",
    headerName: "الزبون",
    width: 150,
    renderCell: (params) => {
      return (
        <Link to="#" className="underline text-[#4880FF]">
          {params.row.customer_name ? params.row.customer_name : "_"}
        </Link>
      );
    },
  },
  {
    field: "employee_name",
    type: "string",
    headerName: "الموظف",
    width: 150,
    renderCell: (params) => {
      return (
        <Link to="#" className="underline text-[#4880FF]">
          {params.row.employee_name ? params.row.employee_name : "_"}
        </Link>
      );
    },
  },
  {
    field: "status",
    type: "string",
    headerName: "حالة الطلب",
    width: 100,

    renderCell: (params) => {
      return (
        <div
          className={clsx(
            "bg-opacity-20 w-full flex items-center justify-center h-6 rounded text-xs",
            {
              "bg-[#83FF48]  text-[#408236]": params.row.status == "completed",
            },
            {
              "bg-[#FFE248] text-[#826336] ": params.row.status == "pending",
            },
            {
              "bg-[#6248FF] text-[#573682] ":
                params.row.status == "processing",
            },
            {
              "bg-[#FF4848] text-[#823636] ": params.row.status == "rejected",
            }
          )}
        >
          <p>{
            billStatus.map(ele => {
              if (params.row.status == ele.en) {
                return ele.ar
              }
            })
          }</p>
        </div>
      );
    },
  }
];
export const finincialRows = [
  {
    id: 1,
    order: "رصيد سيرياتيل جملة",
    code: "70897335",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    details: "عرض التفاصيل",
  },
  {
    id: 2,
    order: "رصيد سيرياتيل جملة",
    code: "70897335",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    details: "عرض التفاصيل",
  },
  {
    id: 3,
    order: "رصيد سيرياتيل جملة",
    code: "70897335",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    details: "عرض التفاصيل",
  },
  {
    id: 4,
    order: "رصيد سيرياتيل جملة",
    code: "70897335",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    details: "عرض التفاصيل",
  },
  {
    id: 5,
    order: "رصيد سيرياتيل جملة",
    code: "70897335",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    details: "عرض التفاصيل",
  },
  {
    id: 6,
    order: "رصيد سيرياتيل جملة",
    code: "70897335",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    details: "عرض التفاصيل",
  },
];

// ===================================================================
// ===================== Accounts Management  ========================

export const accountManageColumns = [
  {
    field: "id",
    headerName: "الرقم",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "username",
    headerName: "اسم المستخدم",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {params.row.username}
        </p>
      );
    },
  },
  {
    field: "rank",
    type: "string",
    headerName: "نوع الحساب",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {
            orderType.map(ele => {
              if (params.row.rank == ele.en) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "الاسم",
    width: 100,
    renderCell: (params) => {
      return <p className=" text-[#202224]/80 ">{params.row.name}</p>;
    },
  },
  {
    field: "roles[0].name",
    type: "string",
    headerName: "المجموعة",
    width: 100,
    renderCell: (params) => {
      return <p className="text-[#202224]/80 ">{
        rolles.map(ele => {
          if (params.row.roles[0]?.name == ele.en) {
            return ele.ar
          }
        })
      }</p>;
    },
  },
];
export const accountManageRows = [
  {
    id: 1,
    username: "Jafar 123",
    accountId: "70987355",
    name: "إدارة",
    group: "إدارة الموقع",
  },
  {
    id: 2,
    username: "Jafar 123",
    accountId: "70987355",
    name: "إدارة",
    group: "إدارة الموقع",
  },
  {
    id: 3,
    username: "Jafar 123",
    accountId: "70987355",
    name: "إدارة",
    group: "إدارة الموقع",
  },
  {
    id: 4,
    username: "Jafar 123",
    accountId: "70987355",
    name: "إدارة",
    group: "إدارة الموقع",
  },
  {
    id: 5,
    username: "Jafar 123",
    accountId: "70987355",
    name: "إدارة",
    group: "إدارة الموقع",
  },
  {
    id: 6,
    username: "Jafar 123",
    accountId: "70987355",
    name: "إدارة",
    group: "إدارة الموقع",
  },
];
// ===================================================================
// ======================== Orders Today =============================

export const OrdersColumns = [
  {
    field: "id",
    headerName: "الرقم",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "billable_id",
    headerName: "رقم العملية",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.billable_id}</p>
      );
    },
  },
  {
    field: "billable_type",
    headerName: "اسم العملية",
    width: 150,
    renderCell: (params) => {
      return (

        <p className="font-semibold text-[#202224]/80 ">
          {
            billName.map(ele => {
              if (ele.en == params.row.billable_type.slice(11)) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "created_at",
    type: "string",
    headerName: "الوقت - التاريخ",
    width: 210,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{new Date(params.row.created_at).toLocaleString()}</p>
      );
    },
  },
  {
    field: "amount",
    type: "string",
    headerName: "المبلغ",
    width: 100,
    renderCell: (params) => {
      return (
         <p className="font-extrabold text-[#202224]/80" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(params.row.amount))} L.S</p>
      );
    },
  },
  {
    field: "base_amount",
    type: "string",
    headerName: "المبلغ الاساسي",
    width: 100,
    renderCell: (params) => {
      return (
         <p className="font-extrabold text-[#202224]/80" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(params.row.base_amount))} L.S</p>
      );
    },
  },
  {
    field: "quantity",
    type: "string",
    headerName: "الكمية",
    width: 100,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">
          {params.row.quantity ? params.row.quantity + "" + "Unit" : "_"}
        </p>
      );
    },
  },
  {
    field: "status",
    type: "string",
    headerName: "حالة الطلب",
    width: 100,

    renderCell: (params) => {
      return (
        <div
          className={clsx(
            "bg-opacity-20 w-full flex items-center justify-center h-6 rounded text-xs",
            {
              "bg-[#83FF48]  text-[#408236]": params.row.status == "completed",
            },
            {
              "bg-[#FFE248] text-[#826336] ": params.row.status == "pending",
            },
            {
              "bg-[#6248FF] text-[#573682] ":
                params.row.status == "processing",
            },
            {
              "bg-[#FF4848] text-[#823636] ": params.row.status == "rejected",
            }
          )}
        >
          <p>{
            billStatus.map(ele => {
              if (params.row.status == ele.en) {
                return ele.ar
              }
            })
          }</p>
        </div>
      );
    },
  },
   {
    field: "source",
    type: "string",
    headerName: " مصدر الطلب",
    width: 100,

    renderCell: (params) => {
      return (
        <p>
          {params.row.billable?.source ?  
          params.row?.billable?.source == "mobile" ?
          "موبايل"
          :
          "كازية"
           :  "_"  }
        </p>
      );
    },
  }
];
export const ordersRows = [
  {
    id: 1,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    state: "منجزة",
    details: "عرض التفاصيل",
  },
  {
    id: 2,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    state: "مرفوضة",
    details: "عرض التفاصيل",
  },
  {
    id: 3,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    state: "انتظار",
    details: "عرض التفاصيل",
  },
  {
    id: 4,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    state: "جار المعالجة",
    details: "عرض التفاصيل",
  },
  {
    id: 5,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    state: "مرفوضة",
    details: "عرض التفاصيل",
  },
  {
    id: 6,
    name: "رصيد سيرياتيل جملة",
    date: "12.09.2019 - 12.53 PM",
    amount: "100.00",
    quantity: "100.00",
    state: "منجزة",
    details: "عرض التفاصيل",
  },
];

// ==================inquries=========================
export const inquriesColumns = [
  {
    field: "id",
    headerName: "الرقم",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "billable_id",
    headerName: "رقم العملية",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.billable_id}</p>
      );
    },
  },
  {
    field: "billable_type",
    headerName: "اسم العملية",
    width: 150,
    renderCell: (params) => {
      return (

        <p className="font-semibold text-[#202224]/80 ">
          {
            billName.map(ele => {
              if (ele.en == params.row.billable_type.slice(11)) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "created_at",
    type: "string",
    headerName: "الوقت - التاريخ",
    width: 210,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{new Date(params.row.created_at).toLocaleString()}</p>
      );
    },
  },
  {
    field: "amount",
    type: "string",
    headerName: "المبلغ",
    width: 100,
    renderCell: (params) => {
      return (
         <p className="font-extrabold text-[#202224]/80" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(params.row.amount))} L.S</p>
      );
    },
  },
  {
    field: "quantity",
    type: "string",
    headerName: "الكمية",
    width: 100,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">
          {params.row.quantity ? params.row.quantity + "" + "Unit" : "_"}
        </p>
      );
    },
  },
  {
    field: "status",
    type: "string",
    headerName: "حالة الطلب",
    width: 100,

    renderCell: (params) => {
      return (
        <div
          className={clsx(
            "bg-opacity-20 w-full flex items-center justify-center h-6 rounded text-xs",
            {
              "bg-[#83FF48]  text-[#408236]": params.row.status == "completed",
            },
            {
              "bg-[#FFE248] text-[#826336] ": params.row.status == "pending",
            },
            {
              "bg-[#6248FF] text-[#573682] ":
                params.row.status == "processing",
            },
            {
              "bg-[#FF4848] text-[#823636] ": params.row.status == "rejected",
            }
          )}
        >
          <p>{
            billStatus.map(ele => {
              if (params.row.status == ele.en) {
                return ele.ar
              }
            })
          }</p>
        </div>
      );
    },
  },
   {
    field: "source",
    type: "string",
    headerName: " مصدر الطلب",
    width: 100,

    renderCell: (params) => {
      return (
        <p>
          {params.row.billable?.source ?  
          params.row?.billable?.source == "mobile" ?
          "موبايل"
          :
          "كازية"
           :  "_"  }
        </p>
      );
    },
  }
];


// ===================================================================
// ======================== Add Balance  =============================

export const addBalanceColumns = [
  {
    field: "id",
    headerName: "رقم العملية",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "amount",
    headerName: "الرصيد",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(params.row.amount))} L.S</p>
      );
    },
  },
  {
    field: "creditAmount",
    headerName: "الرصيد الائتماني",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 " style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}>{
          params.row.creditAmount !== null ?
          NumberDisplay(parseInt(params.row.creditAmount)) + "" + "L.S"
            : "_"
        }</p>
      );
    },
  },
  {
    field: "created_at",
    type: "string",
    headerName: "الوقت - التاريخ",
    width: 210,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80">{new Date(params.row.created_at).toLocaleString()}</p>
      );
    },
  },
  {
    field: "notes",
    headerName: "ملاحظات",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="text-[#202224]/80">{params.row.notes !== null ? params.row.notes : "_"}</p>
      );
    },
  },
];
export const addBalancesRows = [
  {
    id: 1,
    balance: "10.000.000",
    credit: "5.000.000",
    date: "12.09.2019 - 12.53 PM",
    rest: "-",
    notes: "لا يوجد",
  },
  {
    id: 2,
    balance: "10.000.000",
    credit: "5.000.000",
    date: "12.09.2019 - 12.53 PM",
    rest: "-",
    notes: "لا يوجد",
  },
  {
    id: 3,
    balance: "10.000.000",
    credit: "5.000.000",
    date: "12.09.2019 - 12.53 PM",
    rest: "-",
    notes: "لا يوجد",
  },
  {
    id: 4,
    balance: "10.000.000",
    credit: "5.000.000",
    date: "12.09.2019 - 12.53 PM",
    rest: "-",
    notes: "لا يوجد",
  },
  {
    id: 5,
    balance: "10.000.000",
    credit: "5.000.000",
    date: "12.09.2019 - 12.53 PM",
    rest: "-",
    notes: "لا يوجد",
  },
  {
    id: 6,
    balance: "10.000.000",
    credit: "5.000.000",
    date: "12.09.2019 - 12.53 PM",
    rest: "-",
    notes: "لا يوجد",
  },
];

// ===================================================================
// ======================== prices list  =============================

export const listColumns = [
  {
    field: "id",
    headerName: "id",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "description",
    headerName: "الوصف",
    width: 120,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.description}</p>
      );
    },
  },
  {
    field: "company",
    headerName: "الشركة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">
          {params.row.company}
        </p>
      );
    },
  },
  {
    field: "top_up_type",
    headerName: "نوع التعبئة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">{
          billBalanceType.map(ele => {
            if (params.row.top_up_type == ele.en) {
              return ele.ar
            }
          })

        }</p>
      );
    },
  },
  {
    field: "minimum",
    type: "string",
    headerName: "الحد الادنى",
    width: 210,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80">{params.row.minimum} Unit</p>
      );
    },
  },
  {
    field: "retail",
    headerName: "سعر المفرق",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 " style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}>
          {NumberDisplay(parseInt(params.row.retail))} L.S</p>
      );
    },
  },
  {
    field: "wholesale",
    headerName: "سعر الجملة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 " style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}>
          {NumberDisplay(parseInt(params.row.wholesale))} L.S</p>
      );
    },
  },
  
]
export const pricesListBillsColumns = [
  {
    field: "id",
    headerName: "id",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "description",
    headerName: "الوصف",
    width: 120,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.description}</p>
      );
    },
  },
  {
    field: "minimum",
    type: "string",
    headerName: "الحد الادنى",
    width: 210,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80">{params.row.minimum} Unit</p>
      );
    },
  },
  {
    field: "retail",
    headerName: "سعر المفرق",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 " style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}>
          {NumberDisplay(parseInt(params.row.retail))} L.S</p>
      );
    },
  },
  {
    field: "wholesale",
    headerName: "سعر الجملة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 " style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}>
          {NumberDisplay(parseInt(params.row.wholesale))} L.S</p>
      );
    },
  },
  {
    field: "is_fixed",
    headerName: "القيمة الثابتة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.is_fixed == 0 ? "ليست قيمة ثابتة" : "قيمة تابثة"}</p>
      );
    },
  },
];
export const ispData = [
  {
    id: 1,
    description: "hhh",
    billable_type: "cc",
    minimum: "100",
    retail: "200",
    wholesale: "500",
    is_fixed: 0
  },
  {
    id: 2,
    description: "hhh",
    billable_type: "cc",
    minimum: "100",
    retail: "200",
    wholesale: "500",
    is_fixed: 0
  },

]

export const pricesSpecialColumns = [
  {
    field: "id",
    headerName: "id",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "description",
    headerName: "الوصف",
    width: 120,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.description}</p>
      );
    },
  },
  {
    field: "company",
    headerName: "الشركة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">
          {params.row.company}
        </p>
      );
    },
  },
  {
    field: "top_up_type",
    headerName: "نوع التعبئة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">{
          billBalanceType.map(ele => {
            if (params.row.top_up_type == ele.en) {
              return ele.ar
            }
          })

        }</p>
      );
    },
  },
  {
    field: "price",
    type: "string",
    headerName: "السعر",
    width: 100,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 " style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}>
          {NumberDisplay(parseInt(params.row.price))} L.S</p>
      );
    },
  },

];

export const pricesBillsSpecialColumns = [
  {
    field: "id",
    headerName: "id",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "description",
    headerName: "الوصف",
    width: 120,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.description}</p>
      );
    },
  },
  {
    field: "billable_type",
    headerName: "نوع الفاتورة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">
          {
            billName.map(ele => {
              if (params.row.billable_type.slice(11) == ele.en) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "price",
    type: "string",
    headerName: "السعر",
    width: 100,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 " style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}>
          {NumberDisplay(parseInt(params.row.price))} L.S</p>
      );
    },
  },

];

// ========================================================
// ========================== acconut details

export const AccountColumns = [
  {
    field: "id",
    headerName: "رقم العملية",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "billable_type",
    headerName: "الطلب",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {
            billName.map(ele => {
              if (ele.en == params.row.billable_type.slice(11)) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "order_type",
    headerName: "نوع الطلب",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {
            orderType.map(ele => {
              if (ele.en == params.row.order_type) {
                return ele.ar
              }
            })
          }
        </p>
      );
    },
  },
  {
    field: "created_at",
    type: "string",
    headerName: "الوقت - التاريخ",
    width: 210,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{new Date(params.row.created_at).toLocaleString()}</p>
      );
    },
  },
  {
    field: "amount",
    type: "string",
    headerName: "المبلغ",
    width: 100,
    renderCell: (params) => {
      return (
         <p className="font-extrabold text-[#202224]/80" style={{ direction: 'ltr', unicodeBidi: 'plaintext' }} >{NumberDisplay(parseInt(params.row.amount))} L.S</p>
      );
    },
  },
  {
    field: "quantity",
    type: "string",
    headerName: "الكمية",
    width: 100,
    renderCell: (params) => {
      return (
        <p className="font-extrabold text-[#202224]/80 ">
          {params.row.quantity ? params.row.quantity + "" + "Unit" : "_"}
        </p>
      );
    },
  },
  {
    field: "status",
    type: "string",
    headerName: "حالة الطلب",
    width: 100,

    renderCell: (params) => {
      return (
        <div
          className={clsx(
            "bg-opacity-20 w-full flex items-center justify-center h-6 rounded text-xs",
            {
              "bg-[#83FF48]  text-[#408236]": params.row.status == "completed",
            },
            {
              "bg-[#FFE248] text-[#826336] ": params.row.status == "pending",
            },
            {
              "bg-[#6248FF] text-[#573682] ":
                params.row.status == "processing",
            },
            {
              "bg-[#FF4848] text-[#823636] ": params.row.status == "rejected",
            }
          )}
        >
          <p>{
            billStatus.map(ele => {
              if (params.row.status == ele.en) {
                return ele.ar
              }
            })
          }</p>
        </div>
      );
    },
  }
];


// ======================== servise providers =====================

export const providersPricesColumns = [
  {
    field: "id",
    headerName: "الرقم",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "bundel",
    headerName: "اسم الباقة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {params.row.bundel}
        </p>
      );
    },
  },
  {
    field: "price",
    type: "string",
    headerName: "السعر",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {
            params.row.price 
          }
        </p>
      );
    },
  }
 
];

export const providersColumns = [

  {
    field: "id",
    headerName: "الرقم",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "name",
    headerName: "اسم المزود",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {params.row.name}
        </p>
      );
    },
  },
  {
    field: "is_active",
    type: "string",
    headerName: "حالة المزود",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {
            params.row.is_active == 1 ?
            <div className="flex items-center gap-1" >
               <div className="w-2 h-2 rounded bg-green-500" ></div>
              <p>مفعل</p>
             
            </div>
            :
             <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-red-500" ></div>
              <p>غير مفعل</p>
              
            </div>
          }
        </p>
      );
    },
  } 
];
export const appsColumns = [

  {
    field: "id",
    headerName: "الرقم",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "name",
    headerName: "اسم التطبيق",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {params.row.name}
        </p>
      );
    },
  },
];

export const appsPricesColumns = [
  {
    field: "id",
    headerName: "الرقم",
    width: 90,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">{params.row.id}</p>
      );
    },
  },
  {
    field: "game",
    headerName: "التطبيق \ اللعبة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {params.row.game}
        </p>
      );
    },
  }, 
  {
    field: "name",
    headerName: "الباقة",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {params.row.name}
        </p>
      );
    },
  }, 
  {
    field: "price",
    headerName: "السعر",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {params.row.price}
        </p>
      );
    },
  },
  {
    field: "min",
    headerName: "الحد الادنى",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {params.row.min}
        </p>
      );
    },
  },
  {
    field: "mx",
    headerName: "الحد الاعلى",
    width: 150,
    renderCell: (params) => {
      return (
        <p className="font-semibold text-[#202224]/80 ">
          {params.row.max}
        </p>
      );
    },
  },
];