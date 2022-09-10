import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import {
  TopRowAdminListTickets,
  AllTicketsStatistics,
  AdminTableListAllTictets,
} from "../../components/helpdeskTickets";
import { getAllTicket } from "../../redux/actions/tickets/tickets.action";
import api from "../../apis/api";

var loginUser = JSON.parse(localStorage.getItem("user"));

const AdminListAllTickets = (props) => {
  const { getAllTicket } = props;
  // const { allTickets } = props.allTickets;

  const [error, setError] = useState(null);
  const [allTickets, setAllTickets] = useState([]);

  // api call.-----------------------------------------------------------------------------
  useEffect(() => {
    const fetchApi = async () => {
      let response = await api.helpdesk().getAllTickets();

      if (response.status === 200) {
        let tempArr = response.data.filter(
          (el) => el.employeeId === loginUser.employeeId
        );
        setAllTickets(tempArr);
      } else {
        setError({ ...error, message: "Bad Connection" });
      }
    };

    fetchApi();
  }, []);

  useEffect(() => {
    getAllTicket();
  }, [getAllTicket]);
  return (
    <Fragment>
      <TopRowAdminListTickets></TopRowAdminListTickets>
      <AllTicketsStatistics></AllTicketsStatistics>
      <AdminTableListAllTictets
        allTicket={allTickets}
      ></AdminTableListAllTictets>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  allTickets: state.ticketReducer,
});

export default connect(mapStateToProps, { getAllTicket })(AdminListAllTickets);
