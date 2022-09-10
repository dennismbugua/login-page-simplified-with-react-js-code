import React from "react";
import { Card, Row, Col } from "reactstrap";

const RewardListAssignRewards = React.memo(
  ({ rewards, handleSelectedReward }) => {
    return (
      <Row className="admin-settings   py-3">
        {rewards
          .filter((el) => el.isActive === true)
          .map((el, i) => (
            <Col
              key={i}
              lg={4}
              md={6}
              sm={6}
              xs={12}
              className="mb-3 "
              onClick={() => handleSelectedReward(el)}
            >
              <Card body inverse className="card-tile">
                {el.rewardType}
              </Card>
            </Col>
          ))}
      </Row>
    );
  }
);

export default RewardListAssignRewards;
