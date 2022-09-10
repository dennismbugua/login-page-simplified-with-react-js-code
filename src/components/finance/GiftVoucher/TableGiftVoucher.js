import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownActions from "../../common/DropDownActions";

const TableGiftVoucher = React.memo(
  ({ giftVoucherList, handleOnEditCLick, deletePettycash }) => {
    const [thead] = useState([
      "Employee Id",
      "Gift Option",
      "Amount",
      "Gift Card Code",
      "Voucher Id",
      "Given Date",
      "Expiry Date",
      "Attachments",
      "action",
    ]);
    const [trow, setTrow] = useState([]);

    useEffect(() => {
      let trow = giftVoucherList.map((el) => ({
        "Employee Id": (
          <div
            style={{
              width: "180px",
              textAlign: "center",
            }}
          >
            <b> {el.employeeId}</b>
          </div>
        ),
        "Gift Option": <div style={{ width: "110px" }}> {el.giftOption}</div>,
        Amount: (
          <div style={{ width: "120px" }}>
            {String(el.amount).substring(0, 16)}
          </div>
        ),
        "Gift Card Code": (
          <div style={{ width: "100px" }}>{el.giftCardCode}</div>
        ),
        "Voucher Id": <div style={{ width: "70px" }}>{el.voucherId}</div>,
        "Given Date": (
          <div style={{ width: "140px" }}>
            {String(el.givenDate).substring(0, 16)}
          </div>
        ),
        "Expiry Date": (
          <div style={{ width: "120px" }}>
            {String(el.expiryDate).substring(0, 16)}
          </div>
        ),
        Attachments: <div style={{ width: "80px" }}>{""}</div>,
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
    }, [giftVoucherList]);
    return (
      <div style={{ maxWidth: "80vw", overflowY: "auto" }}>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </div>
    );
  }
);

export default TableGiftVoucher;
