import React, { Fragment, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import {
  TopRow,
  Listing,
  HelpDesktickets,
  UpcomingHoliday,
  InfoCard,
} from "../../components/employee/index";
import { connect } from "react-redux";
import { getLoginUser } from "../../redux/actions/loginAuth/LoginAuth";
import { employeeDashboard } from "../../datas/employee";

const EmployeeDashboard = (props) => {
  const { getLoginUser } = props;
  const { loginUser } = props.loginUser;

  useEffect(() => {
    getLoginUser();
  }, []);

  return (
    <Fragment>
      <Row className=" ">
        <Col xs={12} sm={12} md={12} lg={12}>
          <TopRow loginUser={loginUser}></TopRow>
        </Col>
      </Row>
      <Row className="employee-dashboard">
        <Col xs={12} sm={8} md={8} lg={8}>
          <Listing
            list={employeeDashboard.todoList}
            heading={"Todo"}
            icon={<i class="fas fa-clipboard-list"></i>}
          ></Listing>
          <Listing
            list={employeeDashboard.pendingTask}
            heading={"Pending Task"}
            icon={<i class="fas fa-file-signature"></i>}
          ></Listing>
          <HelpDesktickets
            rowData={employeeDashboard.tickets}
          ></HelpDesktickets>
        </Col>
        <Col xs={12} sm={4} md={4} lg={4}>
          <InfoCard
            heading={"PROJECT"}
            leftInfo={{ content: "20", subTitle: "TOTAL TASK" }}
            rightInfo={{
              content: "10",
              subTitle: "PENDING TASK",
            }}
            bottomInfo={
              <Fragment>
                <h4>2</h4>
                <p>Total Projects</p>
              </Fragment>
            }
          ></InfoCard>
          <InfoCard
            heading={"WEEKLY WORKING HOURS"}
            leftInfo={{ content: "8 Hour", subTitle: "APROVED" }}
            rightInfo={{
              content: "5",
              subTitle: "REMAINING",
            }}
            bottomInfo={<Button className="btn-color">Redeem</Button>}
          ></InfoCard>
          <InfoCard
            heading={"Leaves"}
            leftInfo={{ content: "4.5 ", subTitle: "LEAVE TAKEN" }}
            rightInfo={{
              content: "12 ",
              subTitle: "REMAINING",
            }}
            bottomInfo={<Button className="btn-color">Redeem</Button>}
          ></InfoCard>
          <InfoCard
            heading={"My Rewards"}
            leftInfo={{ content: "4300 ", subTitle: "Total Points" }}
            rightInfo={{
              content: "5700 ",
              subTitle: "Points to Redeem",
            }}
            bottomInfo={<Button className="btn-color">Redeem</Button>}
          ></InfoCard>
          <UpcomingHoliday></UpcomingHoliday>
        </Col>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loginUser: state.loginAuthReducer,
});

export default connect(mapStateToProps, {
  getLoginUser,
})(EmployeeDashboard);
