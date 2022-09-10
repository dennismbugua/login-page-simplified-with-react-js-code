import React, { Fragment } from "react";
import { Row, Col, Card, CardBody, CardTitle, Table, Input } from "reactstrap";

export const RewardAchieved = React.memo(
  ({
    rewardsAchived,
    pointsRedeemed,
    handleAchivedYearChange,
    handleRedeemedYearChange,
  }) => {
    console.log("rewards achived");
    return (
      <Fragment>
        <Row className="mt-2 reward-box ">
          <Col md="6">
            <Card className="flex-fill">
              <CardBody>
                <CardTitle>
                  <h3>
                    Rewards Achived
                    <span className="float-right">
                      <Input
                        type="select"
                        name="select"
                        onChange={(e) =>
                          handleAchivedYearChange(e.target.value)
                        }
                      >
                        <option value="">All</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                      </Input>
                    </span>
                  </h3>
                </CardTitle>
                <Table style={{ border: "" }}>
                  <thead>
                    <tr>
                      <th width="10%">#</th>
                      <th>Date</th>
                      <th width="50%">Reward</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rewardsAchived.map((rowData, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{rowData.date}</td>
                        <td>{rowData.reward}</td>
                        <td>{rowData.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="flex-fill">
              <CardBody>
                <CardTitle>
                  <h3>
                    Points Redeemed
                    <span className="float-right">
                      <Input
                        type="select"
                        name="select"
                        onChange={(e) =>
                          handleRedeemedYearChange(e.target.value)
                        }
                      >
                        <option value="">All</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                      </Input>
                    </span>
                  </h3>
                </CardTitle>
                <Table style={{ border: "" }}>
                  <thead>
                    <tr>
                      <th width="10%">#</th>
                      <th>Date</th>
                      <th width="50%">Description</th>
                      <th>points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pointsRedeemed.map((rowData, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{rowData.date}</td>
                        <td>{rowData.description}</td>
                        <td>{rowData.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
);
