import React from "react";
import { Row, Col } from "reactstrap";

const SelectedEmpAssignRewards = React.memo(
  ({ selectedEmp, delSelectedEmp }) => {
    return (
      <div className="selected-card">
        {/* <h5>Selected Employee</h5> */}
        <Row className="selected-emp">
          {selectedEmp.map((el, i) => (
            <Col
              key={i}
              xs={12}
              sm={4}
              md={4}
              lg={4}
              style={{ display: "table" }}
            >
              <div className="selected-emp-info ">
                <div className="emp-img">
                  <img
                    src={require(`../../../img/employee/${el.profilePicture}`)}
                    alt="no img"
                  />
                  <div className="overlay">
                    <div className="text">
                      <i
                        className="fas fa-times user-del-icon"
                        onClick={() => delSelectedEmp(el.empId)}
                      ></i>
                    </div>
                  </div>
                </div>

                <span className="emp-name">{el.employeeName}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
);

export default SelectedEmpAssignRewards;
