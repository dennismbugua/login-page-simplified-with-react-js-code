// <- viewPage.js
import React, { Fragment, useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const UploadedFilesProject = React.memo(() => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const setDropdownOpt = useRef(0); // to not to open othe dropdown opt, when 3dots clicked

  const toggle = React.useCallback((whichProject) => {
    setDropdownOpen((prevState) => !prevState);
    setDropdownOpt.current = whichProject;
  }, []);

  console.log("UploadFilesProjects");
  return (
    <Fragment>
      <Card className="project-view-crad mb-4">
        <CardBody>
          <CardTitle>
            <h4 className="project-title">
              {/* <a href={`/viewProject/${project.projectId}`}>
                    {project.projectName}
                  </a> */}
              Uploaded files
            </h4>
          </CardTitle>
          <ul className="files-list">
            <li>
              <div className="files-cont">
                <div className="file-type">
                  <span className="files-icon">
                    <i className="fas fa-file-pdf"></i>
                  </span>
                </div>
                <div className="files-info">
                  <span className="file-name text-ellipsis">
                    {/* <a href="#"> */}
                    AHA Selfcare Mobile Application Test-Cases.xls
                    {/* </a> */}
                  </span>
                  <span className="file-author">
                    <a href="#John Doe">John Doe</a>
                  </span>
                  <span className="file-date">&nbsp;May 31st at 6:53 PM</span>
                  <div className="file-size">Size: 14.8Mb</div>
                </div>
                <div className="dropDown-action">
                  <Dropdown
                    isOpen={
                      // true
                      dropdownOpen
                      // setDropdownOpt.current === i ? dropdownOpen : false
                    }
                    // toggle={() => toggle(i)}
                    toggle={toggle}

                    // onClick={() => toggle(i)}
                  >
                    <DropdownToggle color="">
                      <i className="fas fa-ellipsis-v text-muted"></i>
                    </DropdownToggle>
                    <DropdownMenu
                      right
                      modifiers={{
                        setMinWidth: {
                          enabled: true,
                          order: 890,
                          fn: (data) => {
                            return {
                              ...data,
                              styles: {
                                ...data.styles,
                                minWidth: "100px",
                              },
                            };
                          },
                        },
                      }}
                    >
                      <DropdownItem
                      // onClick={() => handleProjectEdit(project)}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                {/* <ul className="files-action">
                  <li className="dropdown dropdown-action">
                     
                  </li>
                </ul> */}
              </div>
            </li>
          </ul>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default UploadedFilesProject;
