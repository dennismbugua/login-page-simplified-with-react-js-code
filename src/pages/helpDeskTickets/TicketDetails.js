import React, { useEffect, useState, Fragment } from "react";
import { Row, Col } from "reactstrap";
import {
  TopRowTicketDetails,
  Activity,
  TicketOpration,
  SharedWith,
} from "../../components/helpdeskTickets";

import api from "../../apis/api";
// common....
import Notifications from "../../components/common/Notifications";

// datas.
import { tickets } from "../../datas/helpdeskTickets";

var loginUser = JSON.parse(localStorage.getItem("user"));

const TicketDetails = (props) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  // fetch all comment, then filter by url ticketId.------------------------------------
  const fetchComments = async () => {
    let ticketId = parseInt(props.match.params.ticketId);

    let response = await api.helpdesk().getAllComments();
    let ticketDetails = await api.helpdesk().getTicketById(ticketId);

    if (response.status === 200) {
      let tempArr = response.data.filter((el) => el.ticketId === ticketId);
      setAllComments(tempArr);
    } else {
      setError({ ...error, message: "Bad Connection", status: 400 });
    }

    if (ticketDetails.status === 200) {
      setSelectedTicket(ticketDetails.data[0]);
    } else {
      setError({ ...error, message: "Bad Connection", status: 400 });
    }
  };

  // Function to add comment.-----------------------------------------------------

  const handleAddComment = (data) => {
    let formData = {
      ticketId: selectedTicket.ticketId,
      employeeId: loginUser.employeeId,
      subcategoriesId: selectedTicket.subcategoriesId,
      commentedDate: new Date(),
      comments: data.comment,
    };
    api
      .helpdesk()
      .addEditComment(formData)
      .then((res) => {
        if (res.status === 200) {
          fetchComments();
          setError({ ...error, message: "Comment Added", status: 200 });
        } else {
          setError({ ...error, message: "Bad Connection", status: 400 });
        }
      });
  };

  // Function to delete ticket.
  const handleDeleteTicket = (commentId) => {
    console.log(commentId);
    api
      .helpdesk()
      .deleteComment(commentId)
      .then((res) => {
        if (res.status === 200) {
          fetchComments();
          setError({ ...error, message: "Comment Deleted", status: 200 });
        } else {
          setError({ ...error, message: "Bad Connection", status: 400 });
        }
      });
  };

  return (
    <Fragment>
      <Row>
        <Col xs={12} sm={9} md={9} lg={9}>
          <div className="pr-4 pb-4 ticket-details">
            <TopRowTicketDetails
              selectedTicket={selectedTicket}
              handleAddComment={handleAddComment}
            ></TopRowTicketDetails>
            <Activity
              activities={allComments ?? []}
              handleDeleteTicket={handleDeleteTicket}
            ></Activity>
          </div>
        </Col>
        <Col xs={12} sm={3} md={3} lg={3}>
          <div className="pr-4 pb-4 ticket-details">
            <TicketOpration></TicketOpration>
            <SharedWith selectedTicket={tickets[0]}></SharedWith>
          </div>
        </Col>
      </Row>
      <Notifications notifications={error}></Notifications>
    </Fragment>
  );
};

export default TicketDetails;
