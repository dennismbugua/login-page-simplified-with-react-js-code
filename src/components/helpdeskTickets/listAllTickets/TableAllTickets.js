import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownActions from "../../common/DropDownActions";
import { helpdeskTicket } from "../../../datas/helpdeskTickets";

const TableAllTickets = ({
  listAllTickets,
  handleClickTicket,
  handleClickDelete,
}) => {
  const [thead] = useState([
    "type",
    "reference",
    "summary",
    "service desk",
    "status",
    "requester",
    "action",
  ]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    let trow = listAllTickets.map((el) => ({
      // type: helpdeskTicket
      //   .filter((mainCategory) => mainCategory.tabId === el.serviceId)[0]
      //   .subCategory.map(
      //     (sub) =>
      //       sub.headingId === el.serviceDeskId && (
      //         //   <div className="tab-view-left-icon">
      //         <i className={sub.icon} style={{ fontSize: "30px" }}></i>
      //         //   </div>
      //       )
      //   ),

      type: (
        <i
          className={"far fa-keyboard text-info"}
          style={{ fontSize: "30px" }}
        ></i>
      ),
      reference: <div>{el.ticketId}</div>,
      summary: <div>{el.summary}</div>,
      "service desk": <div>{el.subCategoriesId}</div>,
      status: <div>{el.status}</div>,
      requester: <span style={{ fontSize: "12px " }}>{el.taggedList},</span>,
      action: (
        <DropDownActions
          dropDownOption={[
            {
              action: "Edit",
              handleAction: () => handleClickTicket(el),
            },
            {
              action: "Delete",
              handleAction: () => handleClickDelete(el.ticketId),
            },
          ]}
        ></DropDownActions>
      ),
      // requester: el.requesters.map((el) => (
      //   <span style={{ fontSize: "12px " }}>{el.employeeName},</span>
      // )),
    }));
    console.log(trow);
    setTrow(trow);
  }, [listAllTickets, handleClickTicket]);

  return (
    <div className="" style={{ maxWidth: "80vw", overflowY: "auto" }}>
      <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
    </div>
  );
};

export default TableAllTickets;
