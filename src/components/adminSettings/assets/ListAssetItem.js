import React, { Fragment, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import classnames from "classnames";

const ListAssetItem = React.memo((props) => {
  const { selectedItem, assetList } = props;
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            All
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            In stock
          </NavLink>
        </NavItem>
      </Nav>
      <Container className="mt-2">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col lg={12} md={3} sm={6} xs={12} className="mb-3 ">
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item No</th>
                      <th>Item Name</th>
                      <th>Model No</th>
                      <th>Unique ID</th>
                      <th>Purchase Date</th>
                      <th>Warenty End</th>
                      <th>Vendor</th>
                      <th>User</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      // props.assetData

                      assetList
                        .filter((el) => el.itemId === selectedItem.itemId)
                        .map((itemData, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{itemData.itemNo}</td>
                              <td>{itemData.itemModel}</td>
                              <td>{itemData.modelNo}</td>
                              <td>{itemData.uniqueIdentificationNumber}</td>
                              <td>{itemData.purchaseDate}</td>
                              <td>
                                {itemData.warrantyEndDate.substring(0, 10)}
                              </td>
                              <td>{itemData.vendor}</td>
                              <td>
                                {/* {itemData.employeeId} */}

                                {props.userList.map((el) =>
                                  el.value.employeeId === itemData.employeeId
                                    ? el.value.employeeName
                                    : ""
                                )}
                              </td>
                              <td>
                                <i
                                  className="fas fa-trash"
                                  onClick={() =>
                                    props.handleDelAsset(itemData.itemNo)
                                  }
                                ></i>
                                &nbsp;
                                <i
                                  className="fas fa-edit"
                                  onClick={() => {
                                    props.handleEditAssetItem(itemData, i);
                                    // props.toggle();
                                  }}
                                ></i>
                              </td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col lg={12} md={3} sm={6} xs={12} className="mb-3 ">
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item No</th>
                      <th>Item Model</th>
                      <th>Model No</th>
                      <th>Unique ID</th>
                      <th>Purchase Date</th>
                      <th>Warenty End</th>
                      <th>Vendor</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {assetItems.filter((ele) => ele.user === "")} */}

                    {
                      // props.assetData
                      //   .filter((ele) => ele.employeeId === 0)

                      assetList
                        .filter(
                          (el) =>
                            el.itemId === selectedItem.itemId &&
                            el.employeeId === 0
                        )
                        .map((itemData, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{itemData.itemNo}</td>
                              <td>{itemData.itemModel}</td>
                              <td>{itemData.modelNo}</td>
                              <td>{itemData.uniqueIdentificationNumber}</td>
                              <td>{itemData.purchaseDate}</td>
                              <td>{itemData.warentyEndDate}</td>
                              <td>{itemData.vendor}</td>
                              <td>
                                <i className="fas fa-trash"></i>
                                &nbsp;
                                <i
                                  className="fas fa-edit"
                                  onClick={() => {
                                    props.handleEditAssetItem(itemData, i);
                                    // props.toggle();
                                  }}
                                ></i>
                              </td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </Fragment>
  );
});

export default ListAssetItem;
