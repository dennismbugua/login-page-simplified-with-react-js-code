import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProcessRewards } from "../../redux/actions/processRewards/processRewards.action";

import { useTableProcessRewards } from "../../components/processRewards/index";
import TableWithSortPagtn from "../../components/common/TableWithSortPagtn";
import { Container, Row, Col, Input } from "reactstrap";

import api from "../../apis/api";

const ProcessRewards = (props) => {
  const { getProcessRewards } = props;
  const [runApiFetch, setRunApiFetch] = useState(0);
  const { toProcessRewards } = props.toProcessRewards;
  const [processRewardsInitialArr, setProcessRewardsInitialArr] = useState([]);
  const [toProcessRewardsData, setToProcessRewardsData] = useState([]);

  // Api call. -------------------------------------------------------------

  useEffect(() => {
    apiFetch();
  }, []);

  const apiFetch = async () => {
    console.log(runApiFetch);
    let processRewards = await api.reward().getAllRedmeededDetails();
    console.log(processRewards.data);

    setProcessRewardsInitialArr(processRewards.data);
    setToProcessRewardsData(processRewards.data);
  };

  useEffect(() => {
    getProcessRewards();
  }, [getProcessRewards]);

  //   Function....
  // handle search employee.
  const handleSearch = (searchVal) => {
    let tempArr = processRewardsInitialArr.filter(
      (el) =>
        el.employeeName.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1
    );
    setToProcessRewardsData(tempArr);
  };

  // handle process to make redeemed to true.
  const handleProcessClick = async (el) => {
    let formData = {
      redeemId: el.redeemId,
      employeeId: el.employeeId,
      redeemStatus: true,
    };
    await api.reward().addEditRedeemDetail(formData);
    apiFetch();
    setRunApiFetch((prevState) => prevState + 1);
  };

  //   custom hook.
  const { thead, trow } = useTableProcessRewards(
    toProcessRewardsData,
    handleProcessClick
  );

  return (
    <Fragment>
      <Container className="process-rewards">
        <Row>
          <Col>
            <h3>Process Rewards</h3>
          </Col>
          <Col>
            <Input
              type="text"
              className="d-inline"
              placeholder="Search Employee...."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Col>
        </Row>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </Container>
      {/* <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn> */}
    </Fragment>
  );
};

ProcessRewards.prototype = {
  getProcessRewards: PropTypes.func,
};

const mapStateToProps = (state) => ({
  toProcessRewards: state.ProcessRewardsReducer,
});

export default connect(mapStateToProps, { getProcessRewards })(ProcessRewards);
