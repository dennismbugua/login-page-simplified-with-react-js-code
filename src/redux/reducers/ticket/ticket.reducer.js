import {
  GET_TICKET_BY_ID_SUCCESS,
  GET_ALL_TICKET_SUCCESS,
} from "../../actions/actionType";

const initialState = {
  selectedTicket: null,
  allTickets: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TICKET_SUCCESS:
      return {
        ...state,
        allTickets: action.payload,
      };
    case GET_TICKET_BY_ID_SUCCESS:
      return {
        ...state,
        selectedTicket: action.payload,
      };
    default:
      return state;
  }
}
