import React, { Fragment } from "react";
import { CardGroup, Card, CardBody, Progress } from "reactstrap";

const CardLayout = ({ topTitle, value, progressPercentage, bottomTitle }) => (
  <Card>
    <CardBody>
      <div className="d-flex justify-content-between mb-3 admin-dash-revenu-titile">
        <div>
          <span className="">{topTitle?.title}</span>
        </div>
        <div>
          <span className="text-success">{topTitle?.percentage}%</span>
        </div>
      </div>
      <h3 className="mb-3 admin-dash-revenu-value">{value}</h3>
      <div className="mb-2">
        <Progress
          color="info"
          value={progressPercentage}
          style={{ height: "6px" }}
        />
      </div>
      <div className="mb-0 admin-dash-revenu-p">
        {bottomTitle?.title}
        <span className="text-muted">&nbsp; {bottomTitle?.value}</span>
      </div>
    </CardBody>
  </Card>
);

const AllTicketsStatistics = () => {
  return (
    <Fragment>
      <CardGroup>
        <CardLayout
          topTitle={{ title: "New Ticket", percentage: "10" }}
          value={"12"}
          progressPercentage={56}
          //   bottomTitle={{ title: "Solved Ticket", value: "218" }}
        ></CardLayout>
        <CardLayout
          topTitle={{ title: "Solved Ticket", percentage: "15.3" }}
          value={"988"}
          progressPercentage={86}
          //   bottomTitle={{ title: "Previous Month", value: "$1,15,852" }}
        ></CardLayout>
        <CardLayout
          topTitle={{ title: "Open Ticket", percentage: "2.8" }}
          value={"6"}
          progressPercentage={16}
          //   bottomTitle={{ title: "Previous Month", value: "$9,008" }}
        ></CardLayout>
        <CardLayout
          topTitle={{ title: "Pending Ticket", percentage: "89" }}
          value={"15"}
          progressPercentage={89}
          //   bottomTitle={{ title: "Previous Month", value: "$9,09,008" }}
        ></CardLayout>
      </CardGroup>
    </Fragment>
  );
};

export default AllTicketsStatistics;
