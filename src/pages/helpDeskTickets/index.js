import React from "react";

export const HelpDeskTickets = React.lazy(() => import("./HelpDeskTickets"));

export const TicketDetails = React.lazy(() => import("./TicketDetails"));
export const ListAllTicktes = React.lazy(() => import("./ListAllTicktes"));
export const AdminListAllTickets = React.lazy(() =>
  import("./AdminListAllTickets")
);
