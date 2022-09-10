import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Collapse,
  Button,
} from "reactstrap";
import { useApiCalls, GiftCardTable, RedeemPointsModal } from ".";
import {
  findSumOfRewardPoints,
  findSumOfRewardPointsRedmeeded,
  findBalPontsNeededToRedeem,
} from "./useFunction";

import api from "../../../../apis/api";

const TototalpointsNeedToRedeem = 4000;

const TabRewards = ({ employeeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [balPointsToRedeem, setBalPointsToRedeem] = useState(null);
  const [totalPointsAchived, setTotalPointsAchived] = useState(null);
  const [totalRedmeededPoints, setTotalRedmeededPoints] = useState(null);
  const [inputFieldValues, setInputFieldValues] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  // All APi calls....
  const [pointsAchived, pointsRedmeededDeatils] = useApiCalls(employeeId);

  // To find the sum of points, to get total points achived....
  useEffect(() => {
    // Function call.....
    let sumArrOfRewardPointsAchived = findSumOfRewardPoints(
      pointsAchived,
      employeeId
    );
    setTotalPointsAchived(sumArrOfRewardPointsAchived);
  }, [pointsAchived]);

  // To find the sum of  redeemed points, to get total points redeemed....
  useEffect(() => {
    // Function call.....
    let sumArrOdPointsRedeemed = findSumOfRewardPointsRedmeeded(
      pointsRedmeededDeatils,
      employeeId
    );
    setTotalRedmeededPoints(sumArrOdPointsRedeemed);
  }, [pointsRedmeededDeatils]);

  // To find how many balance point's are needed to get redeem active.
  useEffect(() => {
    if (totalPointsAchived !== null && totalRedmeededPoints !== null) {
      // Function call.....
      let balPointsNeedToRedeem = findBalPontsNeededToRedeem(
        TototalpointsNeedToRedeem,
        totalPointsAchived,
        totalRedmeededPoints
      );
      setBalPointsToRedeem(
        isNaN(balPointsNeedToRedeem) ? 0 : balPointsNeedToRedeem
      );
    }
  }, [totalPointsAchived, totalRedmeededPoints]);

  // Functions------------------------------------------------
  // Toggle..
  const toggleHowToGetRedeem = () => setIsOpen(!isOpen);

  // Toggle modal------------------------------------------
  const toggleModal = () => setOpenModal((prevState) => !prevState);

  // Onchange in any input field --------------------------
  const onchangeInputField = (e) => {
    let updateInputValues = {
      ...inputFieldValues,
      [e.target.name]: e.target.value,
    };
    setInputFieldValues(updateInputValues);
  };

  // To add redeemed details to DB with status false.
  const handleSubmitRedmeededPoints = React.useCallback(() => {
    let formData = {
      employeeId: parseInt(employeeId),
      redeemedDate: "2020-09-18T08:34:46.711Z",
      redeemedPoints: parseInt(inputFieldValues.pointsToRedeem),
      redeemStatus: false,
      createdDate: "2020-09-18T08:34:46.711Z",
      createdBy: 0,
      modifiedDate: "2020-09-18T08:34:46.711Z",
      modifiedBy: 0,
      emplyeeName: "string",
    };
    api.reward().addEditRedeemDetail(formData);
    toggleModal();
  }, []);

  return (
    <Fragment>
      <div className="reward-box ">
        <Row>
          <Col md="6">
            <Card className="flex-fill">
              <CardBody>
                <CardTitle>
                  <h3>
                    Rewards{" "}
                    <span className="float-right more-details">
                      <a href={`/empRewards/${employeeId}`}> more details</a>
                    </span>
                  </h3>
                </CardTitle>

                <Row className=" reward-info">
                  <Col sm={4} xs={4}>
                    <div className=" ">
                      <div className="rounded-div one">
                        {totalPointsAchived}
                      </div>
                      <span className="text">Total Points Achieved</span>
                    </div>
                  </Col>
                  <Col sm={4} xs={4}>
                    <div className=" ">
                      <div className="rounded-div two">
                        {totalRedmeededPoints}
                      </div>
                      <span className="text">Points Redeemed</span>
                    </div>
                  </Col>
                  <Col sm={4} xs={4}>
                    <div className=" ">
                      <div className="rounded-div three">
                        {console.log(balPointsToRedeem)}
                        {balPointsToRedeem ?? 0}
                      </div>
                      <span className="text">Points need to Redeem</span>
                    </div>
                  </Col>
                </Row>

                <Collapse isOpen={isOpen}>
                  <hr></hr>
                  <span
                    className="text-muted"
                    // style={{ position: "aboslute" }}
                  >
                    How to get redeem point, by just give your 80% on planing
                    and 20% on your work.
                  </span>
                </Collapse>
                <Row className="mt-4">
                  <Col xs={10} md={10} sm={10} lg={10}>
                    <Button
                      outline
                      color="info"
                      disabled={balPointsToRedeem === 0 ? false : true}
                      style={{ width: "100%", display: "block" }}
                      onClick={toggleModal}
                    >
                      Redeem
                    </Button>
                  </Col>
                  <Col xs={2} md={2} sm={2} lg={2}>
                    <div className="reward-help" onClick={toggleHowToGetRedeem}>
                      <span className="edit-icon">
                        <i className="fas fa-question"></i>
                      </span>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {/* ------------------------------Gift card table component--------------- */}
          <Col md="6">
            <GiftCardTable></GiftCardTable>
          </Col>
        </Row>
        {/* ----------------------Modal Component---------------------------------- */}
        <RedeemPointsModal
          openModal={openModal}
          toggleModal={toggleModal}
          onchangeInputField={onchangeInputField}
          handleSubmitRedmeededPoints={handleSubmitRedmeededPoints}
        ></RedeemPointsModal>
      </div>
    </Fragment>
  );
};
export default TabRewards;
