import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Total Income",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "Total Outcome",
      type: "bar",
      data: [51, 65, 40, 49, 60, 37, 40],
      fill: false,
      borderColor: "#EC932F",
      borderWidth: 1,
      backgroundColor: "#EC932F",
      hoverBackgroundColor: "#EC935F",
      hoverBorderColor: "rgba(255,99,132,1)",
      // pointBorderColor: "#EC932F",
      // pointBackgroundColor: "#EC932F",
      // pointHoverBackgroundColor: "#EC932F",
      // pointHoverBorderColor: "#EC932F",
      // yAxisID: "y-axis-2",
    },
  ],
};

const BarGraph = React.memo(() => {
  return (
    <Fragment>
      <Card>
        <CardBody style={{ height: "350px" }}>
          <Bar
            data={data}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default BarGraph;
