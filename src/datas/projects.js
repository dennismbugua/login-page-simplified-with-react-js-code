const projectsList = [
  {
    projectId: 53,
    projectType: "fixed budget",
    projectName: "Employee management",
    client: "Roy Ravendreen",
    projectDescription:
      "Louis Vuitton Malletier, commonly referred to as Louis Vuitton (French pronunciation: ​[lwi vɥitɔ̃]) or shortened to LV, is a French fashion house and luxury retail company founded in 1854 by Louis Vuitton. The label's LV monogram appears on most of its products, ranging from luxury trunks and leather goods to ready-to-wear, shoes, watches, jewelry, accessories, sunglasses and books. Louis Vuitton is one of the world's leading international fashion houses; it sells its products through standalone boutiques, lease departments in high-end department stores, and through the e-commerce section of its website.",
    estResourceCose: "2,00,000",
    projectBudget: "4,00,000",
    managementCost: "50,000",
    estHrPerManDays: "20",
    startDate: "04-02-2019",
    endDate: "02-02-2019",

    domain: "nirasystems.com",
    sourceCodePath: "www.github.com",
    // projectLeaders: [
    //   {
    //     leaderId: 29,
    //     leaderName: "waston",
    //     leaderImg: "avatar-01.jpg",
    //   },
    // ],
    managerID: 32,
    managerName: "Don",
    managerPicture: "avatar-03.jpg",
    projectMembersList: [
      {
        projectMemberID: 57,
        projectID: 54,
        employeeId: 31,
        roleID: 1,
        assignedOn: "0001-01-01T00:00:00",
        assignedBy: 0,
        projectName: null,
        employeeName: "Spike",
        profilePicture: "avatar-05.jpeg",
      },
    ],
    projectTechnologyList: [
      {
        skillId: 6,
        projectID: 54,
        skillName: "Dotnet",
        skillList: null,
      },
      {
        skillId: 9,
        projectID: 54,
        skillName: "ASP.net",
        skillList: null,
      },
    ],

    status: "inProgress",
    progress: "50",
  },
  {
    projectId: 54,
    projectType: "fixed budget",
    projectName: "Marriot Resturent management",
    client: "Roy Ravendreen",
    projectDescription:
      "Giorgio Armani (Italian pronunciation: [ˈdʒordʒo arˈmaːni]; born 11 July 1934) is an Italian fashion designer. He first came to notice, working for Cerruti and then for many others, including Allegri, Bagutta and Hilton. He formed his company, Armani, in 1975, which eventually diversified into music, sport and luxury hotels. By 2001 Armani was acclaimed as the most successful designer of Italian origin, and is credited with pioneering red-carpet fashion.",
    estResourceCose: "2,00,000",
    projectBudget: "4,00,000",
    managementCost: "50,000",
    estHrPerManDays: "20",
    startDate: "04-02-2019",
    endDate: "02-02-2019",

    estHour: "80",
    domain: "nirasystems.com",
    sourceCodePath: "www.github.com",
    managerID: 32,
    managerName: "Don",
    managerPicture: "avatar-03.jpg",
    projectMembersList: [
      {
        projectMemberID: 57,
        projectID: 54,
        employeeId: 31,
        roleID: 1,
        assignedOn: "0001-01-01T00:00:00",
        assignedBy: 0,
        projectName: null,
        employeeName: "Spike",
        profilePicture: "avatar-05.jpeg",
      },
    ],
    projectTechnologyList: [
      {
        skillId: 6,
        projectID: 54,
        skillName: "Dotnet",
        skillList: null,
      },
      {
        skillId: 9,
        projectID: 54,
        skillName: "ASP.net",
        skillList: null,
      },
    ],
    status: "new",
    progress: "80",
  },
];

let projectNamesOnly = [];
projectsList.map((project) =>
  projectNamesOnly.push({
    value: {
      projectId: project.projectId,
      projectName: project.projectName,
    },
    label: project.projectName,
  })
);

export { projectsList, projectNamesOnly };
