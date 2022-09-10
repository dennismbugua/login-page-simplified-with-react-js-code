import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const useTableProcessRewards = (toProcessRewards, handleProcessClick) => {
  const [trow, setTrow] = useState([]);
  const [thead] = useState([
    "Id",
    "Name",
    "Redeem Points",
    "Redeem Date",
    "Action",
  ]);

  useEffect(() => {
    let trow =
      // toProcessRewards.length > 0 &&
      toProcessRewards.map((el, i) => {
        return {
          Id: <div>{el.redeemId}</div>,
          Name: (
            <h2 class="table-avatar">
              <img
                class="profile-img-table"
                alt=""
                src={require(`../../img/employee/${el.profilePicture}`)}
              />
              <span className="ml-2">
                <span style={{ fontWeight: "400", color: "black" }}>
                  {el.employeeName}
                </span>
                {/* <span> {el.empDesignation}</span> */}
              </span>
            </h2>
          ),
          "Redeem Points": <div>{el.redeemedPoints}</div>,
          "Redeem Date": <div>{el.redeemedDate.substring(0, 10)}</div>,
          Action: (
            <Button
              color="danger"
              outline
              onClick={() => handleProcessClick(el)}
            >
              Process
            </Button>
          ),
        };
      });
    setTrow(trow);
  }, [toProcessRewards]);

  return { thead, trow };
};

export default useTableProcessRewards;
