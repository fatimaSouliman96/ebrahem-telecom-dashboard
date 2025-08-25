export const sideBarLinks = [
  {
    path: "/",
    text: "الرئيسية",
    icon: "/assets/sideBarIcons/iconHome.svg",
    iconA: "/assets/sideBarIcons/iconHomeActive.svg",
    allowed: ["generalManager","financialManager","employee", "pointOfSale"]
  },
  {
    path: "transfer",
    text: "التعبئة",
    icon: "/assets/sideBarIcons/iconFild.svg",
    iconA: "/assets/sideBarIcons/iconFilldActive.svg",
    allowed: ["generalManager","financialManager"]
  },
  {
    path: "financial",
    text: "بياني المالي",
    icon: "/assets/sideBarIcons/iconMone.svg",
    iconA: "/assets/sideBarIcons/iconMoneActive.svg",
    allowed: ["generalManager"]
  },
];

export const sideBarLinksMnage = [
  {
    path: "accounts",
    text: "ادارة الحسابات",
    icon: "/assets/sideBarIcons/iconAccounts.svg",
    iconA: "/assets/sideBarIcons/iconAccountActive.svg",
    allowed: ["generalManager"]
  },
  {
    path: "prices_list",
    text: "لائحة الاسعار",
    icon: "/assets/sideBarIcons/iconPrice.svg",
    iconA: "/assets/sideBarIcons/priceBold.svg",
    allowed: ["generalManager","financialManager"]
  },
  {
    path: "balance",
    text: "اضافة رصيد",
    icon: "/assets/sideBarIcons/iconAdd.svg",
    iconA: "/assets/sideBarIcons/iconPriceActive.svg",
    allowed: ["generalManager"]
  },
  {
    path: "providers",
    text: "مزودات خدمة الانترنت",
    icon: "/assets/icons/router-01.svg",
    iconA: "/assets/icons/router-01 (1).svg",
    allowed: ["generalManager","financialManager"]
  },
  {
    path: "application",
    text: "ادارة التطبيقات",
    icon: "/assets/icons/Box (1).svg",
    iconA: "/assets/icons/Box.svg",
    allowed: ["generalManager", "financialManager"]
  },
];

export const sideBarLinksEmploee = [
  {
    path: "orders",
    text: "طلباتي",
    icon: "/assets/sideBarIcons/iconOrders.svg",
    iconA: "/assets/sideBarIcons/iconOrderActive.svg",
    allowed: ["generalManager","employee", "financialManager", "pointOfSale"]
  },
  {
    path: "inquries",
    text: "الاستعلامات",
    icon: "/assets/sideBarIcons/iconOrders.svg",
    iconA: "/assets/sideBarIcons/iconOrderActive.svg",
    allowed: ["generalManager","employee", "financialManager"]
  },
  {
    path: "account-statement",
    text: "كشف حساب زيون",
    icon: "/assets/sideBarIcons/iconClient.svg",
    iconA: "/assets/sideBarIcons/clientBold.svg",
    allowed: ["generalManager", "employee", "financialManager"]
  }
];

export const allLinks = [
  ...sideBarLinks, ...sideBarLinksEmploee, ...sideBarLinksMnage
]