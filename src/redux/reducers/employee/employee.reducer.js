import {
  GET_SELECT_EMP_SUCCESS,
  GET_EMP_LIST_SUCCESS,
  ADD_EMP_SUCCESS,
  DEL_EMP_SUCCESS,
  UPDATE_EMP_SUCCESS,
  // -----------------Employee certificates.--------------------
  GET_EMP_CERTIFICATE_SUCCESS,
  DEL_EMP_CERTIFICATE_SUCCESS,
  // -----------------Employee Skill's--------------------------
  GET_EMP_SKILL_SUCCESS,
  ADD_EMP_SKILL_SUCCESS,
  // -----------------Employee Educational Info-----------------
  GET_EMP_EUCATIONAL_INFO_SUCCESS,
  ADD_EMP_EUCATIONAL_INFO_SUCCESS,
  GET_EMP_QUALIFICATION_SUCCESS,
  UPDATE_EMP_EUCATIONAL_INFO_SUCCESS,
  DELETE_EMP_EUCATIONAL_INFO_SUCCESS,
  GET_EMP_PREVIOUS_COMPANY_DETAILS_SUCCESS,
  ADD_PREVIOUS_COMPANY_DETAILS_SUCCESS,
  UPDATE_PREVIOUS_COMPANY_DETAILS_SUCCESS,
  DELETE_PREVIOUS_COMPANY_DETAILS_SUCCESS,
  GET_EMP_WORKEXPERIENCE_SUCCESS,
  GET_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
  ADD_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
  UPDATE_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
  DELETE_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
  UPDATE_EMP_CERTIFICATE_SUCCESS,
  DEL_EMP_SKILL_SUCCESS,
} from "../../actions/actionType";
import { empSkills, empCertificates } from "../../../datas/employee";

const initialState = {
  empList: [],
  selectEmp: [],
  empCertificate: [],
  // empCertificate: empCertificates[0].certificate,

  empSkill: [],
  // empSkill: empSkills[0].skill,
  empeducationalInfo: [],
  qualification: [],
  empworkexp: [],
  prevcompanyinfo: [],
  prevprojects: [],
};

const addEmpSkillFunc = (empSkill, payload, addedNewSkill) => {
  empSkill.map((el) =>
    el.skillId === payload.skillId
      ? {
          ...el,
          skillName: el.skillName.contact(payload.empNewSkill),
        }
      : {
          skillId: payload.skillId,
          skillCategory: payload.whichCategorySkill,
          skillName: [payload.empNewSkill],
        }
  );
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EMP_LIST_SUCCESS:
      return {
        ...state,
        empList: action.payload,
      };
    case ADD_EMP_SUCCESS:
      return {
        ...state,
        empList: [
          ...state.empList,
          { value: action.payload, label: action.payload.employeeName },
        ],
      };
    case UPDATE_EMP_SUCCESS:
      return {
        ...state,
        key: console.log(action.payload),
        empList: state.empList.map((emp) =>
          emp.value.employeeId === action.payload.employeeId
            ? { value: action.payload, label: action.payload.employeeName }
            : emp
        ),
      };
    case DEL_EMP_SUCCESS:
      return {
        ...state,
        empList: state.empList.filter(
          (emp) => emp.value.employeeId !== action.payload
        ),
      };
    case GET_SELECT_EMP_SUCCESS:
      return {
        ...state,
        selectEmp: action.profileInfo, //we get as arr sot take the 1st ele. Ref data/employee
        // empCertificate: action.empCertificate[0].certificate, //we get emp id and certificate take only certificate.  Ref data/employee
        // empSkill: action.empSkill[0].skill, // we get emp id and skill as key value pair so take only skill key.  Ref data/employee
      };

    // ---------------------------------------- Certification ----------------------------
    case GET_EMP_CERTIFICATE_SUCCESS:
      return {
        ...state,
        empCertificate: action.payload,
      };
    case UPDATE_EMP_CERTIFICATE_SUCCESS:
      return {
        ...state,
        empCertificate: state.empCertificate.map((el) =>
          el.employeeCertificationId === action.payload.employeeCertificationId
            ? action.payload
            : el
        ),
      };

    case DEL_EMP_CERTIFICATE_SUCCESS:
      return {
        ...state,
        empCertificate: state.empCertificate.filter(
          (ele) => ele.employeeCertificationId !== action.payload
        ),
      };

    // ---------------------------------------Employee skill ------------------------------------
    case GET_EMP_SKILL_SUCCESS:
      return {
        ...state,
        empSkill: action.payload,
      };
    case ADD_EMP_SKILL_SUCCESS:
      return {
        ...state,
        empSkill: action.payload,
      };

    case DEL_EMP_SKILL_SUCCESS:
      return {
        ...state,
        empSkill: action.payload,
      };

    //------Employee educational Information
    case GET_EMP_EUCATIONAL_INFO_SUCCESS:
      return {
        ...state,
        empeducationalInfo: action.payload,
      };
    case ADD_EMP_EUCATIONAL_INFO_SUCCESS:
      return {
        ...state,
        empeducationalInfo: [...state.empeducationalInfo, action.payload],
      };
    case UPDATE_EMP_EUCATIONAL_INFO_SUCCESS:
      return {
        ...state,
        empeducationalInfo: state.empeducationalInfo.map((el, i) =>
          el.educationalQualificationId ===
          action.payload.educationalQualificationId
            ? action.payload
            : el
        ),
      };
    case DELETE_EMP_EUCATIONAL_INFO_SUCCESS:
      return {
        ...state,
        empeducationalInfo: state.empeducationalInfo.filter(
          (el) => el.educationalQualificationId !== action.payload
        ),
      };
    //----Qualification
    case GET_EMP_QUALIFICATION_SUCCESS:
      return {
        ...state,
        qualification: action.payload,
      };

    //----Previous Company Details
    case GET_EMP_PREVIOUS_COMPANY_DETAILS_SUCCESS:
      return {
        ...state,
        // prevcompanyinfo: action.payload,
        prevcompanyinfo: action.payload,
      };

    case ADD_PREVIOUS_COMPANY_DETAILS_SUCCESS:
      return {
        ...state,
        prevcompanyinfo: [...state.prevcompanyinfo, action.payload],
      };
    case UPDATE_PREVIOUS_COMPANY_DETAILS_SUCCESS:
      return {
        ...state,
        prevcompanyinfo: state.prevcompanyinfo.filter((el, i) =>
          i === action.payload.employeeCompanyDetailsId
            ? action.payload.val
            : el
        ),
      };
    case DELETE_PREVIOUS_COMPANY_DETAILS_SUCCESS:
      return {
        ...state,
        prevcompanyinfo: state.prevcompanyinfo.filter(
          (el) => el.employeeCompanyDetailsId !== action.payload
        ),
      };

    //--------------Work Experience
    case GET_EMP_WORKEXPERIENCE_SUCCESS:
      return {
        ...state,
        empworkexp: action.payload,
      };

    //--------------Previous Project Details
    case GET_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        prevprojects: action.payload,
      };
    case ADD_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        empworkexp: [...state.empworkexp, action.payload],
      };
    case UPDATE_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        empworkexp: state.empworkexp.map((el, i) =>
          el.workExperienceId === action.payload.workExperienceId
            ? action.payload
            : el
        ),
      };
    case DELETE_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        empworkexp: state.empworkexp.filter(
          (el) => el.workExperienceId !== action.payload
        ),
      };

    default:
      return state;
  }
}
