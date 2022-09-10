import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";

const UpcomingHoliday = () => {
  return (
    <Fragment>
      <div className="employee-dash-time-list-title">
        <div>
          <h5>Upcoming Holiday </h5>
        </div>
      </div>
      <Card>
        <CardBody>
          <div className="employee-dash-upcoming-holiday">
            <h4>Mon 2 October 2020 - Gandhi jainthi</h4>
            {/* <div className="employee-dash-content">
              <h4>Mon 2 October 2020 - Gandhi jainthi</h4>
            </div> */}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UpcomingHoliday;
