import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { Bar } from "react-chartjs-2";
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      type: "line",
      data: [41, 65, 40, 49, 60, 37, 40],
      fill: false,
      borderColor: "#EC932F",
      backgroundColor: "#EC932F",
      pointBorderColor: "#EC932F",
      pointBackgroundColor: "#EC932F",
      pointHoverBackgroundColor: "#EC932F",
      pointHoverBorderColor: "#EC932F",
      // yAxisID: "y-axis-2",
    },
    {
      label: "Visitor",
      type: "line",
      data: [30, 51, 30, 39, 50, 27, 30],
      fill: false,
      backgroundColor: "#71B37C",
      borderColor: "#71B37C",
      hoverBackgroundColor: "#71B37C",
      hoverBorderColor: "#71B37C",
      // yAxisID: "y-axis-1",
    },
  ],
};

const options = {
  responsive: true,
  tooltips: {
    mode: "label",
  },
  elements: {
    line: {
      fill: false,
    },
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false,
        },
        labels: {
          show: true,
        },
      },
    ],
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
        gridLines: {
          display: false,
        },
        labels: {
          show: true,
        },
      },
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-2",
        gridLines: {
          display: false,
        },
        labels: {
          show: true,
        },
      },
    ],
  },
};

const plugins = [
  {
    afterDraw: (chartInstance, easing) => {
      const ctx = chartInstance.chart.ctx;
      ctx.fillText("This text drawn by a plugin", 100, 100);
    },
  },
];

const BarGraph = React.memo(() => {
  return (
    <Fragment>
      <Card>
        <CardBody style={{ height: "350px" }}>
          {/* <Bar data={data} options={options} plugins={plugins} /> */}
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
