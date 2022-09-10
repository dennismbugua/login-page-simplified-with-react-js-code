export const helpdeskTicket = [
  {
    tabId: 1,
    tabName: "Hardware",
    subCategory: [
      {
        headingId: 1,
        heading: "Accessories",
        subHeading: "If you need accessories for PC, Laptops let us know here.",
        icon: "far fa-keyboard text-info",
      },
      {
        headingId: 2,
        heading: "PC/Laptop/Tablet",
        subHeading:
          "If you have peoblem with PC,Laptop or Tablet let us know here.",
        icon: "fas fa-desktop text-warning",
      },
      {
        headingId: 3,
        heading: "Phone Issues",
        subHeading: "Issue with your telephone.",
        icon: "fas fa-headset text-danger",
      },
      {
        headingId: 4,
        heading: "Printer Support ",
        subHeading:
          "Get assistance connection to a printer, or submit a request for printer support.",
        icon: "fas fa-print text-success",
      },
      {
        headingId: 4,
        heading: "IT Personnel Presence ",
        subHeading: "Request IT presence for on-site meeting.",
        icon: "fas fa-user-plus text-primary",
      },
    ],
  },
  {
    tabId: 2,
    tabName: "Software & Application",
    subCategory: [
      {
        headingId: 1,
        heading: "Update",
        subHeading: "If you need updation to any Software let us know here.",
        icon: "fa fa-edit",
      },
    ],
  },
  {
    tabId: 3,
    tabName: "Accounts & permissions",
    subCategory: [
      {
        headingId: 1,
        heading: "Update",
        subHeading: "If you need updation to any Software let us know here.",
        icon: "fa fa-edit",
      },
    ],
  },
  {
    tabId: 4,
    tabName: "Wireless & Internet Connections",
    subCategory: [
      {
        headingId: 1,
        heading: "Update",
        subHeading: "If you need updation to any Software let us know here.",
        icon: "fa fa-edit",
      },
    ],
  },
  {
    tabId: 5,
    tabName: "Server/Network/Infrastucture",
    subCategory: [
      {
        headingId: 1,
        heading: "Update",
        subHeading: "If you need updation to any Software let us know here.",
        icon: "fa fa-edit",
      },
    ],
  },
  {
    tabId: 6,
    tabName: "Security/Firewall",
    subCategory: [
      {
        headingId: 1,
        heading: "Update",
        subHeading: "If you need updation to any Software let us know here.",
        icon: "fa fa-edit",
      },
    ],
  },
];

export const tickets = [
  {
    ticketId: "09poo1",
    ticketHeading: "To get a new laptop and tablet",
    tabId: 1,
    tabName: "Hardware",
    subCategoryId: 1,
    subCategory: "Accessories",
    currentStatus: "Need Information",
    ticketCreatorId: 29,
    ticketCreatorName: "Jerry Malikakal",
    ticketCreatorPicture: "avatar-06.png",
    activity: [
      {
        activityId: 1,
        type: "comment",
        employeeId: 31,
        employeeName: "Jerry Malikakal",
        employeePicture: "avatar-03.jpg",
        comment:
          "Today, we are publishing the first Release Candidate for React 17. It has been two and a half years since the previous major release of React, which is a long time even by our standards! In this blog post, we will describe the role of this major release, what changes you can expect in it, and how you can try this release.",
        postedDate: new Date(),
      },
      {
        activityId: 2,
        tpye: "other",
        employeeId: 31,
        employeeName: "Jerry Malikakal",
        employeePicture: "avatar-06.png",
        activityType: "status change",
        activityDiscription: "Need Information",
        postedDate: new Date(),
      },
    ],
    sharedWith: [
      {
        employeeId: 30,
        employeeName: "Pranav Mohan Lal",
        employeePicture: "avatar-01.jpg",
      },
      {
        employeeId: 33,
        employeeName: "Dulqar Salman",
        employeePicture: "avatar-02.jpg",
      },
    ],
  },
];

export const listAllTickets = [
  {
    ticketId: "09poo1",
    summary: "To get a new laptop and tablet",
    serviceId: 1,
    serviceName: "Hardware",
    serviceDeskId: 1,
    servieDesk: "Accessories",
    ticketCreatorId: 29,
    ticketCreatorName: "Jerry Malikakal",
    ticketCreatorPicture: "avatar-06.png",
    createdDate: new Date("1 / 10/ 2020"),
    lastUpdated: new Date("1 / 10/ 2020"),
    priority: "low",
    status: "Need Information",
    ticketStatus: "closed",

    requesters: [
      {
        employeeId: 30,
        employeeName: "Pranav Mohan Lal",
        employeePicture: "avatar-01.jpg",
      },
      {
        employeeId: 33,
        employeeName: "Dulqar Salman",
        employeePicture: "avatar-02.jpg",
      },
    ],
  },
  {
    ticketId: "09poo2",
    summary: "To get a new laptop and tablet",
    serviceId: 1,
    serviceName: "Hardware",
    serviceDeskId: 2,
    servieDesk: "Accessories",
    ticketCreatorId: 21,
    ticketCreatorName: "Pranav Mohan Lal",
    ticketCreatorPicture: "avatar-01.jpg",
    createdDate: new Date("11 / 11 / 2019"),
    lastUpdated: new Date("1 / 10/ 2020"),
    priority: "high",
    status: "Need Information",
    ticketStatus: "reopened",

    requesters: [
      {
        employeeId: 30,
        employeeName: "Pranav Mohan Lal",
        employeePicture: "avatar-01.jpg",
      },
      {
        employeeId: 33,
        employeeName: "Dulqar Salman",
        employeePicture: "avatar-02.jpg",
      },
    ],
  },
];
