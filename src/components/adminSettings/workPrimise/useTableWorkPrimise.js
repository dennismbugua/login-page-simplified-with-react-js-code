import React, { useState, useEffect, Fragment } from "react";

const useTableWorkPrimise = (
  workPrimiseData,
  handleDelWorkPrimsie,
  handleEditClick,
  onClickToggleFromTable
) => {
  const [thead] = useState(["work premise", "action"]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    // let trowArr = [];
    let trowArr = workPrimiseData.map((el) => {
      return {
        "work premise": el.workingPremiseType,
        action: (
          <Fragment>
            <i
              className="fas fa-trash"
              onClick={() => handleDelWorkPrimsie(el.workingPremiseId)}
            ></i>
            <i
              className="fas fa-edit ml-4"
              onClick={() => {
                handleEditClick(el, el.workingPremiseId);
                onClickToggleFromTable();
              }}
            ></i>
          </Fragment>
        ),
      };
    });

    setTrow(trowArr);
  }, [
    workPrimiseData,
    handleDelWorkPrimsie,
    handleEditClick,
    onClickToggleFromTable,
  ]);

  // setTrow(trowArr);

  return { thead, trow };
};

export default useTableWorkPrimise;
