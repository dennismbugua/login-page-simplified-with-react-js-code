// <- ListProjects.js

import React from "react";

import { useEffect, useState } from "react";
import DropDownBtn from "../../common/DropDownBtn";
import DropDownActions from "../../common/DropDownActions";

const useProjectsTableEle = (projectList) => {
  const [trow, setTrow] = useState([]);
  const [thead] = useState([
    "Project",
    "Project id",
    "Leader",
    "Team",
    "Deadline",
    "Status",
    "Action",
  ]);

  const handleEditProject = (project) => {
    console.log(project);
  };

  useEffect(() => {
    if (projectList !== undefined) {
      console.log("in usePRoject table ele hook", projectList);
      let trow = [];
      projectList.map((ListOfProjects, i) => {
        let rowVal = ListOfProjects.projectList.map((project) => ({
          Project: <span className="project-name"> {project.projectName}</span>,
          "Project id": project.projectID,
          Leader: (
            //  project.projectLeaders.map((leader, i) => (
            <h2 className="table-avatar">
              <img
                className="profile-img-table"
                alt=""
                src={require(`../../../img/employee/${
                  project?.managerPicture ?? "user.png"
                }`)}
              />
            </h2>
          ),
          // ))
          Team: (
            <div style={{ width: "150px" }}>
              {project.projectMembersList.map((member, i) => (
                <h2 key={i} className="table-avatar">
                  <img
                    className="profile-img-table"
                    alt=""
                    src={require(`../../../img/employee/${member.profilePicture}`)}
                  />
                </h2>
              ))}
              ,
            </div>
          ),
          Deadline: <div>{project.endDate.substring(0, 10)} </div>,
          Status: (
            <div style={{ width: "150px" }}>
              <DropDownBtn
                selectedOpt={
                  project.activeStatus === true ? "Completed" : "Completed"
                }
                dropDownOption={[
                  {
                    icon: <i className="far fa-dot-circle text-danger"></i>,
                    option: "New",
                  },
                  {
                    icon: <i className="far fa-dot-circle text-warning"></i>,
                    option: "Inprogress",
                  },
                  {
                    icon: <i className="far fa-dot-circle text-success"></i>,
                    option: "Completed",
                  },
                ]}
                // handleDropDownOnChange={props.handleDropDownOnChange}
              ></DropDownBtn>
            </div>
          ),
          Action: (
            <div>
              <DropDownActions
                selectedOpt={project.status}
                dropDownOption={[
                  {
                    action: "Edit",
                    handleAction: () => handleEditProject(project),
                  },
                  {
                    action: "Delete",
                    handleAction: () => handleEditProject(project),
                  },
                ]}
              ></DropDownActions>
            </div>
          ),
        }));
        trow.push(rowVal[0]);
      });
      console.log("trow", trow);
      setTrow(trow);
    }
  }, [projectList]);

  return { thead, trow };
};

export default useProjectsTableEle;
