export const findSumOfRewardPoints = (arr, employeeId) => {
  if (arr.length > 0) {
    let filterByEmployeeId = arr.filter(
      (el) => el.employeeId === parseInt(employeeId)
    );
    // find sum of points. --------
    let rewardPointsArr = filterByEmployeeId.map((el) => el.rewardPoints);
    let sumArr = rewardPointsArr.reduce((a, b) => a + b, 0);
    return sumArr;
  }
};

// To find the sum of  redeemed points, to get total points redeemed....
export const findSumOfRewardPointsRedmeeded = (arr, employeeId) => {
  // find sum of points. --------
  let redeemedPointsArr = arr.map((el) => el.redeemedPoints);
  let sumArr = redeemedPointsArr.reduce((a, b) => a + b, 0);
  return sumArr;
};

// To find how many balance point's are needed to get redeem active.
export const findBalPontsNeededToRedeem = (
  totalPointsNeedToRedeem,
  totalPointsAchived,
  totalRedmeededPoints
) => {
  let balPointsNeedToRedeem =
    totalPointsNeedToRedeem - (totalPointsAchived - totalRedmeededPoints);
  if (balPointsNeedToRedeem < 0) balPointsNeedToRedeem = 0;
  return balPointsNeedToRedeem;
};
