import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownActions from "../../common/DropDownActions";

const TablePettyCash = React.memo(
  ({ pettyCashData, handleOnEditCLick, deletePettycash }) => {
    const [thead] = useState([
      "Invoice Number",
      "Client",
      "Created Date",
      "Due Date",
      "Amount",
      "Status",
      "Action",
    ]);
    const [trow, setTrow] = useState([]);

    useEffect(() => {
      let trow = pettyCashData.map((el) => ({
        "Invoice Number": (
          <div
            style={{
              width: "180px",
              textAlign: "center",
            }}
          >
            <b> {el.operatingExpenses}</b>
          </div>
        ),
        Client: <div style={{ width: "110px" }}> {el.invoiceAmount}</div>,
        "Created Date": (
          <div style={{ width: "120px" }}>
            {String(el.invoiceDate).substring(0, 16)}
          </div>
        ),
        "Due Date": <div style={{ width: "100px" }}>{el.amountPaid}</div>,
        Amount: <div style={{ width: "70px" }}>{el.billNo}</div>,
        Status: (
          <div style={{ width: "140px" }}>
            <b>{el.modeOfPayment}</b>
          </div>
        ),
        action: (
          <div style={{ width: "70px" }}>
            <DropDownActions
              dropDownOption={[
                { action: "Edit", handleAction: () => handleOnEditCLick(el) },
                {
                  action: "Delete",
                  handleAction: () => deletePettycash(el.pettyCashDetailsId),
                },
              ]}
            ></DropDownActions>
          </div>
        ),
      }));
      setTrow(trow);
    }, [pettyCashData]);
    return (
      <div style={{ maxWidth: "80vw", overflowY: "auto" }}>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </div>
    );
  }
);

export default TablePettyCash;
