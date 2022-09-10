import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownActions from "../../common/DropDownActions";

import { AddEdit } from "../index";
import { Button } from "reactstrap";

const DeductionPayRollItems = React.memo(
  ({ empList, payRollItem, handleShowGenerateSalarayBtn }) => {
    const [thead] = useState(["name", "default/unit amount", "action"]);
    const [trow, setTrow] = useState([]);
    const [isOpenAddEditForm, setIsOpenAddEditForm] = useState(false);

    useEffect(() => {
      if (payRollItem !== null) {
        let trow = payRollItem.addition.map((el) => ({
          name: <b>{el.additionName}</b>,
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

    //   Functions.
    // to toggel b/w form a grid.
    const toggleAddEditForm = React.useCallback(() => {
      handleShowGenerateSalarayBtn();
      setIsOpenAddEditForm((prevState) => !prevState);
    }, []);
    console.log("in dedection");

    return (
      <div className="mt-2">
        <Button
          outline
          color="primary"
          className="float-right"
          onClick={toggleAddEditForm}
        >
          <i className="fa fa-plus"></i> Addition
        </Button>
        {isOpenAddEditForm && (
          <AddEdit
            fromComponent={"deduction"}
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

export default DeductionPayRollItems;
