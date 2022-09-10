import React, { useState, useEffect } from "react";

const useForTableValues = (empList, projectList) => {
  const [empArr, setEmpArr] = useState([]);

  useEffect(() => {
    let projectArr = [];
    let empTemp = [];

    empList.map((emp) =>
      projectList.map(
        (project) =>
          project.projectTeam.filter((el) =>
            el.memberId === emp.value.employeeId
              ? //   console.log(project.projectName, emp.value.empName)
                projectArr.push({
                  projectId: project.projectId,
                  projectName: project.projectName,
                })
              : null
          ),
        empTemp.push({ emp: emp.value, project: projectArr }),

        // setEmpArr((prevState) => [...prevState, empTemp]),

        (projectArr = [])
      )
    );
    setEmpArr(empTemp);
  }, [empList, projectList]);

  return { empArr };
};

export default useForTableValues;
