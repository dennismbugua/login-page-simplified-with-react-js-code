import axios from "axios";

const baseUrl = "http://localhost:63306/api/";
// const baseUrl = "http://20.51.211.208/EmployeeManagementAPI/api/";

export default {
  // Accounts api's-----------------------------------------------------------------
  account(url = baseUrl + "Account/") {
    return {
      // login
      login: (username, password) =>
        axios.get(url + `Login?username=${username}&password=${password}`),
    };
  },
  // -------------------------Admin setting api's-------------------------------------------------

  dbDesignation(url = baseUrl + "Designation/") {
    return {
      GetAllDesignations: () => axios.get(url + "GetAllDesignations"),
      AddEditDesignation: (formData) =>
        axios.post(url + "AddEditDesignation", formData),
      DeleteDesignation: (id) =>
        axios.post(url + `DeleteDesignation?designationId=${id}`),
    };
  },

  dbDepartment(url = baseUrl + "Department/") {
    return {
      GetAllDepartments: () => axios.get(url + "GetAllDepartments"),
      AddEditDepartment: (formData) =>
        axios.post(url + "AddEditDepartment", formData),
      DeleteDepartment: (id) =>
        axios.post(url + `DeleteDepartment?departmentId=${id}`),
    };
  },

  officeLocation(url = baseUrl + "Admin/") {
    return {
      getAllOfficeLocation: () => axios.get(url + "GetOfficeLocationList"),
      addEditOfficeLocation: (formData) =>
        axios.post(url + "AddEditOfficeLocation", formData),
      delOfficeLocation: (delId) =>
        axios.post(url + `DeleteOfficeLocation?officeLocationId=${delId}`),
    };
  },
  workPrimise(url = baseUrl + "Admin/") {
    return {
      getAll: () => axios.get(url + "GetWorkingPremiseList"),
      addEdit: (formData) =>
        axios.post(url + "AddEditWorkingPremise", formData),
      del: (delId) =>
        axios.post(url + `DeleteWorkingPremise?workingPremiseId=${delId}`),
    };
  },
  rewards(url = baseUrl + "Admin/") {
    return {
      getAll: () => axios.get(url + "GetAllRewards"),
      addEdit: (formData) => axios.post(url + "AddEditRewards", formData),
      addEditRewardDetails: (formData) =>
        axios.post(url + "AddEditRewardDetails", formData),
      del: (delId) => axios.post(url + `DeleteRewards?RewardId=${delId}`),
    };
  },

  //employee type api's
  dbEmployeeTypes(url = baseUrl + "Admin/") {
    return {
      GetEmployeeTypeList: () => axios.get(url + "GetEmployeeTypeList"),
      GetEmployeeTypeById: (empTypeId) =>
        axios.get(url + `GetEmployeeTypeById?employeeTypeId=${empTypeId}`),
      AddEditEmployeeType: (formData) =>
        axios.post(url + "AddEditEmployeeType", formData),
      DeleteEmployeeType: (delId) =>
        axios.post(url + `DeleteEmployeeType?employeeTypeId=${delId}`),
    };
  },

  // Skill api's -------------------------------------
  skill(url = baseUrl + "Skills/") {
    return {
      // Get all skill.
      getAllSkills: () => axios.get(url + "GetAllSkills"),
    };
  },

  // empoloyee api's --------------------------------------------------------.
  employee(url = baseUrl + "Admin/") {
    return {
      getAll: () => axios.get(url + "GetAllEmployees"),
      getSelectedEmployee: (empId) =>
        axios.get(url + `GetAllEmployeeDetailsById?employeeID=${empId}`),
      addEdit: (formData) => axios.post(url + "AddEditEmployees", formData),
      del: (delId) => axios.post(url + `DeleteEmployees?employeeId=${delId}`),
    };
  },

  // Employee Skill's api -------------------------------------------------------------.
  empSkill(url = baseUrl + "Employee/") {
    return {
      // Get all skill of an employee.
      getEmpSkillById: (empId) =>
        axios.get(
          url + `GetEmployeeSkillDetailsByEmployeeId?employeeId=${empId}`
        ),
      // Add skill to an employee.
      addEditEmpSkill: (formData) =>
        axios.post(url + "AddEditEmployeeSkillDetails", formData),
      // Delete employee skill.
      deleteEmpSkillById: (empSkillId) =>
        axios.post(
          url + `DeleteEmployeeSkillDetails?employeeSkillId=${empSkillId}`
        ),
    };
  },

  // Employee certifates api -------------------------------------------------------------.
  empCertificates(url = baseUrl + "Employee/") {
    return {
      // Get employee certifcates API.
      getEmpCertificates: (empId) =>
        axios.get(
          url + `EmployeeCertificationDetails?EmployeeCertificationId=${empId}`
        ),
      // AddEdit .
      addEditEmpCertification: (formData) =>
        axios.post(url + "AddEditEmployeeCertificate", formData),
      // Delete.
      delEmpCertification: (delId) =>
        axios.post(url + `DeleteCertificate?EmployeeCertificationId=${delId}`),
    };
  },
  // Employee rewards api ----------------------------------------------------------------.
  empReward(url = baseUrl + "Employee/") {
    return {
      // Get all reward details of an employee.
      getAllEmployeeRewardDetails: () =>
        axios.get(url + "GetAllEmployeeRewardDetails"),
    };
  },

  reward(url = baseUrl + "Rewards/") {
    return {
      // Get details of points redeemed by employee Id.
      getEmployeeRedeemedDetailsById: (employeeId) =>
        axios.get(url + `EmployeeRedeemedDetails?EmployeeId=${employeeId}`),
      // Get proccess reward details with status = 0.
      getAllRedmeededDetails: () => axios.get(url + `GetAllRedmeededDetails`),
      addEditRedeemDetail: (formData) =>
        axios.post(url + "AddEditRedeemDetails", formData),
    };
  },

  // items api's.
  items(url = baseUrl + "Admin/") {
    return {
      getAll: () => axios.get(url + "GetItemsList"),
      addEdit: (itemFormData) => axios.post(url + "AddEditItems", itemFormData),
    };
  },

  // asset api's.
  asset(url = baseUrl + "Admin/") {
    return {
      getAll: () => axios.get(url + "GetAssetList"),
      // addEdit: (formData) => axios.post(url + "AddEditAsset", formData),
      addEdit: (formData) =>
        axios({
          method: "post",
          url: url + "AddEditAsset",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }),

      del: (delId) => axios.post(url + `DeleteAsset?itemNo=${delId}`),
    };
  },
  //leave type api's
  dbLeaveTypes(url = baseUrl + "Admin/") {
    return {
      GetLeaveTypes: () => axios.get(url + "GetLeaveTypes"),
      AddEditLeaveTypes: (formData) =>
        axios.post(url + "AddEditLeaveTypes", formData),
      DeleteLeaveTypes: (leaveTypeId) =>
        axios.post(url + `DeleteLeaveTypes?LeaveTypeId=${leaveTypeId}`),
    };
  },

  //company policy api's
  dbcompanypolicies(url = baseUrl + "Admin/") {
    return {
      GetCompanyPoliciesList: () => axios.get(url + "GetCompanyPoliciesList"),
      AddEditCompanyPolicies: (formData) =>
        axios.post(url + "AddEditCompanyPolicies", formData),
      DeleteCompanyPolicies: (companyPolicyId) =>
        axios.post(
          url + `DeleteCompanyPolicies?companyPolicyId=${companyPolicyId}`
        ),
    };
  },

  //holiday calendar api's
  dbcalendar(url = baseUrl + "Admin/") {
    return {
      GetHolidayCalendarList: () => axios.get(url + "GetHolidayCalendarList"),
      AddEditHolidayCalendar: (formData) =>
        axios.post(url + "AddEditHolidayCalendar", formData),
      DeleteHolidayCalendar: (year) =>
        axios.post(url + `DeleteHolidayCalendar?year=${year}`),
    };
  },

  // Certifications.
  certifications(url = baseUrl + "Employee/") {
    return {
      getAllCertifications: () => axios.get(url + "GetAllCertificationDetails"),
    };
  },

  // -------------------------Admin setting api's End-------------------------------------------------

  // employee educational info
  dbempeducationalinfo(url = baseUrl + "Employee/") {
    return {
      GetEmpEducationalInfo: (employeeId) =>
        axios.get(
          url +
            `GetEmployeeEducationalQualificationByEmployeeId?employeeId=${employeeId}`
        ),
      AddEditEmpEducationalInfo: (formData) => {
        axios.post(url + "AddEditEmployeeEducationalQualification", formData);
      },
      DeleteEmpEducationalInfo: (educationalQualificationId) =>
        axios.post(
          url +
            `DeleteEmployeeEducationalQualificationDetails?educationalQualificationId=${educationalQualificationId}`
        ),
    };
  },

  // Qualification api
  dbqualification(url = baseUrl + "Admin/") {
    return {
      GetQualifications: () => axios.get(url + "GetQualifications"),
    };
  },

  // Work Experience api
  dbworkexperience(url = baseUrl + "Employee/") {
    return {
      GetPreviousProject: (employeeId) =>
        axios.get(
          url + `GetEmployeeWorkExperienceByEmployeeId?employeeId=${employeeId}`
        ),
      GetPreviousProjectDetails: (workExperienceId) =>
        axios.get(
          url +
            `GetEmployeeWorkExperienceById?workExperienceId=${workExperienceId}`
        ),
      AddEditPreviousProjectDetails: (formData) =>
        axios.post(url + "AddEditEmployeeWorkExperience", formData),
      DeletePreviousProject: (workExperienceId) =>
        axios.post(
          url +
            `DeleteEmployeeWorkExperience?workExperienceId=${workExperienceId}`
        ),
    };
  },

  // Previous Company Details api
  dbpreviouscompany(url = baseUrl + "Employee/") {
    return {
      GetEmpPreviousCompanyInfo: (employeeId) =>
        axios.get(
          url +
            `GetAllEmployeePreviousCompanyDetailsByEmployeeId?employeeId=${employeeId}`
        ),
      AddEditPreviousCompanyInfo: (formData) =>
        axios.post(url + "AddEditEmployeePreviousCompanyDetails", formData),
      DeletePreviousCompanyInfo: (employeeCompanyDetailsId) =>
        axios.post(
          url +
            `DeleteEmployeePreviousCompanyDetails?employeeCompanyDetailsId=${employeeCompanyDetailsId}`
        ),
    };
  },

  // skill api.
  skill(url = baseUrl + "Admin/") {
    return {
      getAllSkills: () => axios.get(url + "GetAllSkills"),
    };
  },
  // project api.
  project(url = baseUrl + "Employee/") {
    return {
      getProjectsOfEmployee: (empId) =>
        axios.get(url + `GetProjectDetailByEmployee?EmployeeId=${empId}`),
      addProject: (formData) =>
        axios.post(url + "AddEmployeeProjects", formData),
      editProject: (formData) =>
        axios.post(url + "EditEmployeeProjects", formData),
      delProject: (delId) =>
        axios.post(url + `DeleteProject?ProjectId=${delId}`),
      // Get project by project id.
      getProjectById: (projectId) =>
        axios.get(url + `GetEmployeeProjectsById?ProjectId=${projectId}`),
    };
  },

  // task api.
  task(url = baseUrl + "Employee/") {
    return {
      getProjectDetailsOfEmp: (employeeId) =>
        axios.get(url + `GetProjectDetailByEmployee?EmployeeId=35`),
      // get tasks of a particular employee.
      getAllTaskOfEmployee: (employeeId) =>
        axios.get(
          url +
            `GetAllTaskByEmployeeId?EmployeeId=${employeeId}
        `
        ),
    };
  },

  projectIssue(url = baseUrl + "ProjectIssue/") {
    return {
      // get all issues.(task)
      GetAllProjectIssueList: () => axios.get(url + "GetAllProjectIssueList"),
    };
  },

  //  Helpdesk api's.
  helpdesk(url = baseUrl + "HelpDesk/") {
    return {
      // get all category.
      getAllCategory: () => axios.get(url + "GetAllTicketCategories"),
      // get all sub catgory.
      getallSubCategory: () => axios.get(url + "GetAllTicketSubCategories"),
      // Add edit ticket.
      addEditTicket: (formData) => axios.post(url + "AddEditTicket", formData),
      // get all tickets.
      getAllTickets: () => axios.get(url + "GetAllTicket"),
      // get ticket ny ticketId.
      getTicketById: (ticketId) =>
        axios.get(url + `GetAllTicketById?ticketid=${ticketId}`),
      // delete a ticket.
      deleteTicket: (ticketId) =>
        axios.post(url + `DeleteTicket?ticketid=${ticketId}`),
      // get all comments.
      getAllComments: () => axios.get(url + "GetAllTicketComments"),
      // add edit comment.
      addEditComment: (formData) =>
        axios.post(url + "AddEditTicketComments", formData),
      // delete comment.
      deleteComment: (commentId) =>
        axios.post(url + `DeleteTicketComments?CommentId=${commentId}`),
    };
  },
  // Payroll api's,
  payroll(url = baseUrl + "PayRoll/") {
    return {
      // Add payroll.
      addEditPayroll: (formData) =>
        axios.post(url + "SavePayRollSetup", formData),
      // get payroll by employeeId.
      getPayrollSetup: (employeeId = 0, year = "") =>
        axios.get(url + `GetEmployeePayRollSetup?EmployeeId=${employeeId}`),
      // delete payroll.
      deletePayrollById: (payrollId) =>
        axios.post(url + `DeletePayRoll?PayRollId=${payrollId}`),
      getPayroll: (employeeId = 0, year = "", month = "") =>
        axios.get(
          url +
            `GetEmployeePayRoll?EmployeeId=${employeeId}&year=${year}&month=${month}`
        ),
      // get all privilage details.
      getAllPrivilageLeave: (employeeId = 0) =>
        axios.get(url + `GetAllEmployeePL?EmployeeId=${employeeId}`),
    };
  },
  // Pettycash api's
  pettycash(url = baseUrl + "Finance/") {
    return {
      // get all petty cash.
      getAllPettyCash: () => axios.get(url + "GetPettyCashDetailsList"),
      // add edit petty cash.
      addEditPettyCash: (formData) =>
        axios.post(url + "AddEditPettyCashDetails", formData),
      // deleted petty cash.
      deletePettyCash: (delId) =>
        axios.post(url + `DeletePettyCashDetails?PettyCashDetailsId=${delId}`),
    };
  },
  // Gift voucher api's --------------------------------------------
  giftVoucher(url = baseUrl + "Employee/") {
    return {
      // get all gift voucher's.
      getAllGiftVoucher: () => axios.get(url + "GetGiftVouchersList"),
    };
  },
};
