import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getSelectedEmp } from "../../redux/actions/employee/employee.action";
import { TopCardReward } from "../../components/employee/employeeReward/TopCardReward";
import { RewardAchieved } from "../../components/employee/employeeReward/RewardAchieved";

const rewardsAchivedArr = [
  {
    date: "10-29-2020",
    reward: "Best performer",
    points: 100,
  },
  {
    date: "09-28-2018",
    reward: "Best Team player",
    points: 70,
  },
  {
    date: "12-15-2019",
    reward: "Motivator",
    points: 100,
  },
];

const pointsRedeemedArr = [
  {
    date: "10-29-2020",
    description: "For trip to Bali",
    points: 1000,
  },
  {
    date: "09-28-2018",
    description: "For leave compensation",
    points: 800,
  },
];

const EmployeeRewards = (props) => {
  let empId = props.match.params.empId;

  const { getSelectedEmp } = props;
  const { selectEmp } = props.selectEmp;
  const [rewardsAchived, setRewardAchived] = useState([]);
  const [pointsRedeemed, setPointsRedeemed] = useState([]);

  useEffect(() => {
    getSelectedEmp(empId);
    setRewardAchived(rewardsAchivedArr);
    setPointsRedeemed(pointsRedeemedArr);
  }, [getSelectedEmp, empId]);

  // Functions.

  // filter year func for reward achived year change.
  const handleAchivedYearChange = React.useCallback(
    (year) => {
      let filterArr =
        year !== ""
          ? rewardsAchivedArr.filter(
              (el) =>
                // console.log(typeof new Date(el.date).getFullYear())
                String(new Date(el.date).getFullYear()) === year
            )
          : rewardsAchivedArr;
      setRewardAchived(filterArr);
    },
    [setRewardAchived]
  );

  // filter year func for redeemed reward achived year change.
  const handleRedeemedYearChange = React.useCallback(
    (year) => {
      let filterArr =
        year !== ""
          ? pointsRedeemedArr.filter(
              (el) => String(new Date(el.date).getFullYear()) === year
            )
          : pointsRedeemedArr;
      console.log(filterArr);

      setPointsRedeemed(filterArr);
    },
    [setPointsRedeemed]
  );

  console.log(selectEmp);
  return (
    <Fragment>
      <TopCardReward {...props} selectEmp={selectEmp}></TopCardReward>
      <RewardAchieved
        rewardsAchived={rewardsAchived}
        pointsRedeemed={pointsRedeemed}
        handleAchivedYearChange={handleAchivedYearChange}
        handleRedeemedYearChange={handleRedeemedYearChange}
      ></RewardAchieved>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  selectEmp: state.empReducer,
});

export default connect(mapStateToProps, {
  getSelectedEmp,
})(EmployeeRewards);
