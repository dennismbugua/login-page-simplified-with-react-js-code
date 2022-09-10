import React, { useState, useEffect } from "react";

import api from "../../../../apis/api";

const useApiCalls = (employeeId) => {
  const [pointsAchived, setPointsAchived] = useState([]);
  const [pointsRedmeededDeatils, setPointsRedmeededDeatils] = useState([]);

  useEffect(() => {
    async function fetchApiCalls() {
      const allEmployeeRewardDetails = await api
        .empReward()
        .getAllEmployeeRewardDetails();
      setPointsAchived(allEmployeeRewardDetails.data);
      // ------------------------------------------------------------------------
      const pointsRedmeededDeatils = await api
        .reward()
        .getEmployeeRedeemedDetailsById(parseInt(employeeId));
      setPointsRedmeededDeatils(pointsRedmeededDeatils.data);
    }
    fetchApiCalls();
  }, []);

  return [pointsAchived, pointsRedmeededDeatils];
};

export default useApiCalls;
