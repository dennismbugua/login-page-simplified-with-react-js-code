import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownActions from "../../common/DropDownActions";

const TableInvoice = React.memo(
  ({ pettyCashData, handleOnEditCLick, deletePettycash }) => {
    const [thead] = useState([
      "operation expenses",
      "invoice amt",
      "invoice date",
      "amt paid",
      "bill no",
      "payment mode",
      "paid date",
      "paid by",
      "action",
    ]);
    const [trow, setTrow] = useState([]);

    useEffect(() => {
      let trow = pettyCashData.map((el) => ({
        "operation expenses": (
          <div
            style={{
              width: "180px",
              textAlign: "center",
            }}
          >
            <b> {el.operatingExpenses}</b>
          </div>
        ),
        "invoice amt": (
          <div style={{ width: "110px" }}> {el.invoiceAmount}</div>
        ),
        "invoice date": (
          <div style={{ width: "120px" }}>
            {String(el.invoiceDate).substring(0, 16)}
          </div>
        ),
        "amt paid": <div style={{ width: "100px" }}>{el.amountPaid}</div>,
        "bill no": <div style={{ width: "70px" }}>{el.billNo}</div>,
        "payment mode": (
          <div style={{ width: "140px" }}>
            <b>{el.modeOfPayment}</b>
          </div>
        ),
        "paid date": (
          <div style={{ width: "120px" }}>
            {String(el.paidDate).substring(0, 16)}
          </div>
        ),
        "paid by": <div style={{ width: "80px" }}>{el.paidBy}</div>,
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

export default TableInvoice;
