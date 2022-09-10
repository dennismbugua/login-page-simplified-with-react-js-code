export const adminSideBar = {
  dashboard: {
    menuName: "Dashboard",
    menuIcon: "fab fa-product-hunt",
    route: "/em/adminDashboard",
  },
  adminSettings: {
    menuName: "Admin Settings",
    menuIcon: "fas fa-briefcase",
    route: "/em/companylocation",
  },
  project: {
    menuName: "Project Board",
    menuIcon: "fab fa-product-hunt",
    subMenu: [
      {
        subMenuName: "Project List",
        icon: "fas fab fa-product-hunt",
        route: "/em/listProjects",
      },
      {
        subMenuName: "Back Logs",
        icon: "fas fab fa-product-hunt",
        route: "/em/taskManagment",
      },
      {
        subMenuName: "Task Board",
        icon: "fas fab fa-product-hunt",
        route: "/em/taskBoard/54",
      },
    ],
  },
  employeeSettings: {
    menuName: "Employee Settings",
    menuIcon: "fas fa-user-tie",
    subMenu: [
      {
        subMenuName: "All Employee",
        icon: "fas fab fa-product-hunt",
        route: "/em/emplist",
      },
      {
        subMenuName: "Assign Rewards",
        icon: "fas fab fa-product-hunt",
        route: "/em/assignRewards",
      },
      {
        subMenuName: "Process Rewards",
        icon: "fas fab fa-product-hunt",
        route: "/em/processRewards",
      },
    ],
  },
  payRoll: {
    menuName: "Pay Roll",
    menuIcon: "fas fa-user-tie",
    subMenu: [
      {
        subMenuName: "Pay Roll Items",
        icon: "fas fab fa-product-hunt",
        route: "/em/payRollItems",
      },
      {
        subMenuName: "Employee salary",
        icon: "fas fab fa-product-hunt",
        route: "/em/employeeSalary",
      },
      {
        subMenuName: "Process Salary",
        icon: "fas fab fa-product-hunt",
        route: "/em/processSalary",
      },
      {
        subMenuName: "Salary Report",
        icon: "fas fab fa-product-hunt",
        route: "/em/salaryReport",
      },
      {
        subMenuName: "Privlage Leave",
        icon: "fas fab fa-product-hunt",
        route: "/em/plReport",
      },
    ],
  },
  finance: {
    menuName: "Finance",
    menuIcon: "fas fa-user-tie",
    subMenu: [
      {
        subMenuName: "Petty Cash",
        icon: "fas fab fa-product-hunt",
        route: "/em/pettyCash",
      },
      {
        subMenuName: "Gift Voucher",
        icon: "fas fab fa-product-hunt",
        route: "/em/giftVoucher",
      },
      {
        subMenuName: "Invoice",
        icon: "fas fab fa-product-hunt",
        route: "/em/invoice",
      },
    ],
  },
};
