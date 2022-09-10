import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownActions from "../../common/DropDownActions";

import { AddEdit } from "../index";
import { Button } from "reactstrap";

const AdditionPayRollItems = React.memo(
  ({ empList, payRollItem, handleShowGenerateSalarayBtn }) => {
    const [thead] = useState([
      "name",
      "category",
      "default/unit amount",
      "action",
    ]);
    const [trow, setTrow] = useState([]);
    const [isOpenAddEditForm, setIsOpenAddEditForm] = useState(false);

    useEffect(() => {
      console.log(payRollItem);
      if (payRollItem !== null) {
        let trow = payRollItem.addition.map((el) => ({
          name: <b>{el.additionName}</b>,
          category: el.additionCategory,
          "default/unit amount": (
            <h6 className="ml-4">{el.defaultUnitAmount}</h6>
          ),
          action: (
            <DropDownActions
              dropDownOption={[
                { action: "Edit", handleAction: "" },
                { action: "Delete", handleAction: "" },
              ]}
            ></DropDownActions>
          ),
        }));
        setTrow(trow);
      }
    }, [payRollItem]);

    // //   Functions.
    // to toggel b/w form a grid.
    const toggleAddEditForm = React.useCallback(() => {
      handleShowGenerateSalarayBtn();
      setIsOpenAddEditForm((prevState) => !prevState);
    }, [handleShowGenerateSalarayBtn]);
    console.log("in addition");

    return (
      <div className="mt-2">
        <Button
          outline
          color="primary"
          className="float-right"
          onClick={toggleAddEditForm}
        >
          <i className="fa fa-plus"></i> Addition{" "}
        </Button>
        {isOpenAddEditForm && (
          <AddEdit
            fromComponent={"addition"}
            empList={empList}
            toggleAddEditForm={toggleAddEditForm}
          ></AddEdit>
        )}
        {!isOpenAddEditForm && (
          <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
        )}
      </div>
    );
  }
);

export default AdditionPayRollItems;
