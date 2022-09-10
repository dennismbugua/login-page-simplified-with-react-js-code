import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_TICKET,
  GET_ALL_TICKET_SUCCESS,
  GET_TICKET_BY_ID,
  GET_TICKET_BY_ID_SUCCESS,
} from "../redux/actions/actionType";
import { tickets, listAllTickets } from "../datas/helpdeskTickets";

// api functions.

function getAllTicketApi() {
  // api call here.
  return listAllTickets;
}

function getTicketByIdApi(ticketId) {
  // api call here.
  console.log(ticketId);
  let selectedTicket = tickets.filter((el) => el.ticketId === ticketId);
  return selectedTicket[0];
}

export function* handleGetAllTicket() {
  try {
    const response = yield call(getAllTicketApi);
    yield put({ type: GET_ALL_TICKET_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetTicketById({ payload }) {
  try {
    let ticketId = payload;
    const response = yield call(getTicketByIdApi, ticketId);
    yield put({ type: GET_TICKET_BY_ID_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

export function* ticketWahtchFunc() {
  yield takeLatest(GET_TICKET_BY_ID, handleGetTicketById);
  yield takeLatest(GET_ALL_TICKET, handleGetAllTicket);
}
