import React, { useState, Fragment, useRef } from "react";
import { withRouter } from "react-router";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Pagination from "../../common/Pagination";

const EmployeeCard = React.memo((props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const setDropdownOpt = useRef(0); // to not to open othe dropdown opt, when 3dots clicked

  const toggle = React.useCallback(
    (whichCard) => {
      setDropdownOpen((prevState) => !prevState);
      setDropdownOpt.current = whichCard;
    },
    [setDropdownOpen]
  );

  const handlePageClick = React.useCallback(
    (pageNumber) => {
      setCurrentPage(pageNumber);
    },
    [setCurrentPage]
  );

  // current post.
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = props.allEmpList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Fragment>
      {console.log("Employee Card")}
      <Row>
        <Col md={3} sm={3}>
          <div
            className="profile-widget"
            style={{ height: "86%" }}
            onClick={props.handleOpenAddForm}
          >
            <div className="profile-img">
              <i className="fas fa-plus fa-3x"></i>
            </div>
          </div>
        </Col>
        {/* List all the employees in card view */}
        {currentPost.map((emp, i) => {
          return (
            <Col md={3} sm={3} key={i}>
              <div className="profile-widget">
                <div className="profile-img">
                  <a href={`/empProfile/${emp.value.employeeId}`}>
                    <img
                      width="100%"
                      src={require(`../../../img/employee/${emp.value.profilePicture}`)}
                      alt="Card cap"
                    />
                  </a>
                </div>
                <div class="dropdown profile-action text-muted">
                  <Dropdown
                    isOpen={setDropdownOpt.current === i ? dropdownOpen : false}
                    toggle={() => toggle(i)}
                  >
                    <DropdownToggle color="">
                      <i class="fas fa-ellipsis-v"></i>
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
                        onClick={() => props.handleOnclickEdit(emp.value)}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() =>
                          props.handleOnclickDelete(emp.value.employeeId)
                        }
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <a href={`/empProfile/${emp.value.employeeId}`}>
                  <h4 class="user-name m-t-10 mb-0 text-ellipsis">
                    {emp.value.employeeName}
                  </h4>
                  <div class="small text-muted">
                    {emp.value.designationName}
                  </div>
                </a>
              </div>
            </Col>
          );
        })}
      </Row>
      <Pagination
        totalPost={props.allEmpList.length}
        postPerPage={postPerPage}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
      />
    </Fragment>
  );
});

export default withRouter(EmployeeCard);
