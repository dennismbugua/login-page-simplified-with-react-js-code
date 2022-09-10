import React from "react";
import { Badge } from "reactstrap";

const TicketOpration = React.memo(() => {
  return (
    <div className="ticket-operation ">
      <Badge color="primary"> Need Information</Badge>
      <div className="mt-2 d-flex">
        <i className="fas fa-eye-slash"></i>
        <span className="ml-2 link">Don't notify Me</span>
      </div>
      <div className="mt-2 d-flex">
        <i className="fas fa-share-alt"></i>
        <span className="ml-2 link">Share</span>
      </div>
      <hr></hr>
    </div>
  );
});

export default TicketOpration;
