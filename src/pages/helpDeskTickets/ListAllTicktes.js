import React, { Fragment, useState, useEffect } from "react";
import {
  TopRowListAllTickets,
  TableAllTickets,
  AddEditTicketForm,
} from "../../components/helpdeskTickets";
import api from "../../apis/api";
import { listAllTickets } from "../../datas/helpdeskTickets";

var loginUser = JSON.parse(localStorage.getItem("user"));

const ListAllTicktes = () => {
  const [isOpenAddEditTicketForm, setIsOpenAddEditTicketForm] = useState(false);
  const [error, setError] = useState(null);
  const [alltickets, setAllTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({});

  // api call.-----------------------------------------------------------------------------
  useEffect(() => {
    const fetchApi = async () => {
      let response = await api.helpdesk().getAllTickets();

      if (response.status === 200) {
        console.log(response.data);
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

  // Onclick on a ticket in table,
  // then set that ticket details to state & open edit form.------------------------------
  const handleClickTicket = (selectedTicket) => {
    console.log(selectedTicket);
    setSelectedTicket(selectedTicket);
    toggleAddEditTicketFrom();
  };

  // when a ticket is updated then, update state.-------------------------------------------
  const updateTicketList = (updatedTicket) => {
    let tempList = alltickets;
    let updatedTicketList = tempList.map((el) =>
      el.ticketId === updatedTicket.ticketId ? updatedTicket : el
    );
    setAllTickets(updatedTicketList);
  };

  // when a ticket is deleted, then filter that ticket from state.--------------------------
  const handleClickDelete = (ticketId) => {
    api
      .helpdesk()
      .deleteTicket(ticketId)
      .then((res) => {
        let tempList = alltickets;
        let updatedTicketList = tempList.filter(
          (el) => el.ticketId !== ticketId
        );
        setAllTickets(updatedTicketList);
      });
  };

  // Toggle add edit ticket from.----------------------------------------------------------
  const toggleAddEditTicketFrom = React.useCallback(() => {
    setIsOpenAddEditTicketForm((prevState) => !prevState);
  }, []);

  return (
    <Fragment>
      <TopRowListAllTickets></TopRowListAllTickets>
      {!isOpenAddEditTicketForm && (
        <TableAllTickets
          listAllTickets={alltickets}
          // listAllTickets={listAllTickets}
          handleClickTicket={handleClickTicket}
          handleClickDelete={handleClickDelete}
        ></TableAllTickets>
      )}
      {isOpenAddEditTicketForm && (
        <AddEditTicketForm
          selectedSubCatgory={selectedTicket}
          toggleAddEditTicketFrom={toggleAddEditTicketFrom}
          updateTicketList={updateTicketList}
        ></AddEditTicketForm>
      )}
    </Fragment>
  );
};

export default ListAllTicktes;
