import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownBtn from "../../common/DropDownBtn";
import DropDownActions from "../../common/DropDownActions";

const ticketStatus = [
  "open",
  "reopened",
  "on hold",
  "closed",
  "in progress",
  "cancelled",
];

const AdminTableListAllTictets = ({ allTicket }) => {
  const [thead] = useState([
    "ticket id",
    "ticket subject",
    "asigned staff",
    "created date",
    "last replay",
    "priority",
    "status",
    "action",
  ]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    let trow = allTicket.map((el) => ({
      "ticket id": (
        <div>
          {" "}
          <Link to={`/ticketDetails/${el.ticketId}`}> {el.ticketId} </Link>
        </div>
      ),
      "ticket subject": <div>{el.summary}</div>,
      "asigned staff": (
        <h2 class="table-avatar">
          <img
            class="profile-img-table"
            alt=""
            src={require(`../../../img/employee/${"avatar-01.jpg"}`)}
          />
          <span className="ml-2">
            <span style={{ fontWeight: "600", color: "black" }}>
              {el.employeeName}
            </span>
          </span>
        </h2>
      ),
      "created date": <div>{String(el.createdDate).substr(0, 16)}</div>,
      "last replay": <div>{String(el.lastUpdated).substr(0, 16)}</div>,
      priority: (
        <div style={{ width: "100px" }}>
          {/* selectedOpt & option string should be same */}
          <DropDownBtn
            selectedOpt={
              "high"
              // el.priority === "high"
              //   ? "high"
              //   : el.priority === "medium"
              //   ? "medium"
              //   : "low"
            }
            dropDownOption={[
              {
                icon: <i className="far fa-dot-circle text-success"></i>,
                option: "high",
              },
              {
                icon: <i className="far fa-dot-circle text-danger"></i>,
                option: "medium",
              },
              {
                icon: <i className="far fa-dot-circle text-danger"></i>,
                option: "low",
              },
            ]}
            // handleDropDownOnChange={props.handleDropDownOnChange}
          ></DropDownBtn>
        </div>
      ),
      status: (
        <div style={{ width: "120px" }}>
          {" "}
          {/* selectedOpt & option string should be same */}
          <DropDownBtn
            selectedOpt={
              "open"
              // ticketStatus.includes(el.ticketStatus) && el.ticketStatus
            }
            dropDownOption={[
              {
                icon: <i className="far fa-dot-circle text-success"></i>,
                option: "open",
              },
              {
                icon: <i className="far fa-dot-circle text-warning"></i>,
                option: "reopened",
              },
              {
                icon: <i className="far fa-dot-circle text-info"></i>,
                option: "on hold",
              },

              {
                icon: <i className="far fa-dot-circle text-success"></i>,
                option: "closed",
              },
              {
                icon: <i className="far fa-dot-circle text-warning"></i>,
                option: "in progress",
              },
              {
                icon: <i className="far fa-dot-circle text-danger"></i>,
                option: "cancelled",
              },
            ]}
            // handleDropDownOnChange={props.handleDropDownOnChange}
          ></DropDownBtn>
        </div>
      ),
      action: (
        <div style={{ width: "70px" }}>
          <DropDownActions
            // selectedOpt={el.status}
            dropDownOption={[
              {
                action: "Edit",
                // handleAction: () => handleEditProject(project),
              },
              {
                action: "Delete",
                // handleAction: () => handleEditProject(project),
              },
            ]}
          ></DropDownActions>
          ,
        </div>
      ),
    }));
    setTrow(trow);
  }, [allTicket]);

  return (
    <div className="mt-3" style={{ maxWidth: "80vw", overflowY: "auto" }}>
      <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
    </div>
  );
};

export default AdminTableListAllTictets;
