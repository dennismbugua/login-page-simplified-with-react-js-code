import React, { Fragment } from "react";
import DropDownActions from "../../common/DropDownActions";

var loginUser = JSON.parse(localStorage.getItem("user"));

const ActivityCommentLayout = ({ data, handleDeleteTicket }) => (
  <div className="d-flex mb-3">
    <div className=" ">
      <img
        class="profile-img-table"
        alt=""
        src={require(`../../../img/employee/${data.profilePicture}`)}
      />
    </div>
    <div className="ticket-details-activity-comments">
      <div className="d-flex">
        <h6>{data.employeeName}</h6>
        <span className="text-muted ml-1 time-date">
          {String(data.commentedDate).substring(0, 25)}
        </span>
        {loginUser.employeeId === data.employeeId && (
          <Fragment>
            <span
              className="text-muted ml-1 time-date"
              onClick={() => handleDeleteTicket(data.commentId)}
            >
              <i className="fas fa-trash"></i>
            </span>
            <span className="text-muted ml-1 time-date">
              <i className="fas fa-edit ml-2"></i>
            </span>
          </Fragment>
        )}
      </div>
      <div className="">{data.comments}</div>
    </div>
  </div>
);

const ActivityOtherLayout = () => (
  <div className="ticket-details-activity-other">
    <hr></hr>
    <p>
      Your request status changed to <b> Need Information</b>
      <span className="text-muted ml-2 time-date"> 02/jul/20 7:54 AM </span>
    </p>

    <hr></hr>
  </div>
);

const Activity = React.memo(({ activities, handleDeleteTicket }) => {
  return (
    <div className="mt-4 ticket-details-activity ">
      <h5>Activity</h5>
      <hr></hr>
      {activities.map((el) => (
        <Fragment key={el.commentId}>
          {/* comments layout */}
          <ActivityCommentLayout
            key={el.commentId}
            data={el}
            handleDeleteTicket={handleDeleteTicket}
          ></ActivityCommentLayout>
          {/* {el.type === "comment" ? (
            <ActivityCommentLayout
              key={el.commentId}
              data={el}
            ></ActivityCommentLayout>
          ) : (
            
            <ActivityOtherLayout
              key={el.commentId}
              data={el}
            ></ActivityOtherLayout>
          )} */}
        </Fragment>
      ))}
    </div>
  );
});

export default Activity;
