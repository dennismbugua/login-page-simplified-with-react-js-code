import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getEmpList } from "../../redux/actions/employee/employee.action";
import { getAllPayRollItem } from "../../redux/actions/payroll/payroll.action";
import { Button } from "reactstrap";

import {
  TopRowPayRollItem,
  TabsPayRollItems,
  SalaryBreakUpTemplate,
} from "../../components/payRoll/index";

const PayRollItems = (props) => {
  const { getEmpList, getAllPayRollItem } = props;
  const { empList } = props.empList;
  const { payRollItem } = props.payRollItem;
  const [isOpenSalaryBreakUp, setIsOpenSalaryBreakUp] = useState(false);
  const [
    showBtnGenerateSalaryBreakUp,
    setShowGenerateBtnSalaryBreakUp,
  ] = useState(true);

  useEffect(() => {
    getEmpList();
    getAllPayRollItem();
  }, [getEmpList, getAllPayRollItem]);

  // toggle b/w salary break up & tabs.
  const toggleSalaryBreakUp = React.useCallback(() => {
    setIsOpenSalaryBreakUp((prevState) => !prevState);
    handleShowGenerateSalarayBtn();
  }, [setIsOpenSalaryBreakUp]);

  // to hid & show genarate salary btn.
  const handleShowGenerateSalarayBtn = React.useCallback(() => {
    setShowGenerateBtnSalaryBreakUp((prevState) => !prevState);
  }, [setShowGenerateBtnSalaryBreakUp]);

  return (
    <div>
      <TopRowPayRollItem {...props}></TopRowPayRollItem>
      {isOpenSalaryBreakUp && (
        <Fragment>
          <SalaryBreakUpTemplate
            empList={empList}
            toggleSalaryBreakUp={toggleSalaryBreakUp}
          ></SalaryBreakUpTemplate>
        </Fragment>
      )}
      {!isOpenSalaryBreakUp && (
        <TabsPayRollItems
          empList={empList}
          payRollItem={payRollItem}
          handleShowGenerateSalarayBtn={handleShowGenerateSalarayBtn}
        ></TabsPayRollItems>
      )}
      {/* Genrate salary break up btn */}
      {showBtnGenerateSalaryBreakUp && (
        <Button
          className="btn-color btn-genrateSalaryBreakUp"
          onClick={toggleSalaryBreakUp}
        >
          Gernerate Salary Break Up
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  empList: state.empReducer,
  payRollItem: state.payRollReducer,
});

export default connect(mapStateToProps, { getEmpList, getAllPayRollItem })(
  PayRollItems
);
