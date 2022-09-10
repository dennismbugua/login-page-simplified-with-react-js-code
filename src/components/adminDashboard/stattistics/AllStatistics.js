import React, { Fragment } from "react";
import { Card, CardBody, CardTitle, Progress } from "reactstrap";

const StatisticsLayout = ({ title, count, progressPrecentage }) => (
  <div className="statistics-list-info">
    <p>
      {title}
      <strong>
        {count?.value}/<small>{count?.total}</small>
      </strong>
    </p>
    <Progress
      color="info"
      value={progressPrecentage?.value}
      max={progressPrecentage?.total}
      style={{ height: "5px" }}
    ></Progress>
  </div>
);

const AllStatistics = React.memo(() => {
  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle>
            <h5>Statistics</h5>
          </CardTitle>
          <div className="statistics-list">
            <StatisticsLayout
              title={"Today Leave"}
              count={{ value: 4, total: 65 }}
              progressPrecentage={{ value: 4, total: 65 }}
            ></StatisticsLayout>
            <StatisticsLayout
              title={"Pending Invoice"}
              count={{ value: 12, total: 92 }}
              progressPrecentage={{ value: 12, total: 92 }}
            ></StatisticsLayout>
            <StatisticsLayout
              title={"Completed Projects"}
              count={{ value: 85, total: 112 }}
              progressPrecentage={{ value: 50, total: 65 }}
            ></StatisticsLayout>
            <StatisticsLayout
              title={"Open  Tickets"}
              count={{ value: 190, total: 212 }}
              progressPrecentage={{ value: 190, total: 212 }}
            ></StatisticsLayout>
            <StatisticsLayout
              title={"Closed  Tickets"}
              count={{ value: 12, total: 212 }}
              progressPrecentage={{ value: 22, total: 212 }}
            ></StatisticsLayout>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default AllStatistics;
