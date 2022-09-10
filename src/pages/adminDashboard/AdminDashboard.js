import React from "react";
import { Row, Col } from "reactstrap";
import {
  TopRow,
  BarGraph,
  MixedGraph,
  AllRevenu,
  AllStatistics,
  TaskStatistics,
  Absents,
  InvoiceTable,
  PaymentTable,
  ClientTable,
  RecentProject,
} from "../../components/adminDashboard/index";

const AdminDashboard = () => {
  return (
    <div className="admin-dash">
      <Row className="mb-4">
        <Col>
          <h4>Welcome Admin !</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <TopRow></TopRow>
        </Col>
      </Row>
      <Row>
        <Col>
          <BarGraph></BarGraph>
        </Col>
        <Col>
          <MixedGraph></MixedGraph>
        </Col>
      </Row>
      <Row>
        <Col>
          <AllRevenu></AllRevenu>
        </Col>
      </Row>
      <Row className="mt-3 statistics mb-3">
        <Col xs={12} sm={4} md={4} lg={4}>
          <AllStatistics></AllStatistics>
        </Col>
        <Col xs={12} sm={4} md={4} lg={4}>
          <TaskStatistics></TaskStatistics>
        </Col>
        <Col xs={12} sm={4} md={4} lg={4}>
          <Absents></Absents>
        </Col>
      </Row>
      <Row className="admin-dash-tables">
        <Col xs={12} sm={6} md={6} lg={6}>
          <InvoiceTable></InvoiceTable>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <PaymentTable></PaymentTable>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <ClientTable></ClientTable>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <RecentProject></RecentProject>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
