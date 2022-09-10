import { GET_ALL_TICKET, GET_TICKET_BY_ID } from "../actionType";

// saga calls.

export const getAllTicket = () => {
  return {
    type: GET_ALL_TICKET,
  };
};

export const getTicketById = (ticketId) => {
  return {
    type: GET_TICKET_BY_ID,
    payload: ticketId,
  };
};
