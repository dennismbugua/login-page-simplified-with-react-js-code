import React, { useState, useEffect, Fragment } from "react";

const useComapnyPolicyTable = (
    companyPolicyData,
    handleDelCompanyPolicies,
    handleEditCompanyPolicies,
    onClickToggleFromTable
) => {
  const [thead] = useState(["Policy Name","Description","Department","Upload File","Action"]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    let trowArr = companyPolicyData.map((el) => {
      return {
        "Policy Name": el.policyName,
        "Description": el.description,
        "Department": el.departmentName,
        Action: (
          <Fragment>
            <i
              className="fas fa-trash"
              onClick={() => handleDelCompanyPolicies(el.CompanyPolicyId)}
            ></i>
            <i
              className="fas fa-edit ml-4"              
              onClick={() => {
                handleEditCompanyPolicies(el, el.CompanyPolicyId);
                onClickToggleFromTable();
             }}
            ></i>
          </Fragment>
        ),
      };
    });

     setTrow(trowArr);
  }, [
    companyPolicyData,
    handleDelCompanyPolicies,
    handleEditCompanyPolicies,
    onClickToggleFromTable
  ]);

  return { thead, trow };
};

export default useComapnyPolicyTable;