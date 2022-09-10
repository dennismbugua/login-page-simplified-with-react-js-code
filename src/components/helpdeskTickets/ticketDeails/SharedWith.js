import React from "react";

const SharedWithPersonLayout = ({ name, image, creatorOrRemove }) => (
  <div className="d-flex mb-3 mt-3">
    <div className=" ">
      <img
        class="profile-img-table"
        alt=""
        src={require(`../../../img/employee/${image}`)}
      />
    </div>
    <div className="ticket-details-activity-comments">
      <div className=" ">
        <h6 className="mb-0">{name}</h6>
        <span>{creatorOrRemove}</span>
      </div>
    </div>
  </div>
);

const SharedWith = React.memo(({ selectedTicket }) => {
  return (
    <div className="shared-with">
      <h5>Shared with</h5>
      <SharedWithPersonLayout
        name={selectedTicket?.ticketCreatorName ?? ""}
        image={selectedTicket?.ticketCreatorPicture ?? "user.png"}
        creatorOrRemove={"creator"}
      ></SharedWithPersonLayout>
      {selectedTicket !== null &&
        selectedTicket.sharedWith.map((el) => (
          <SharedWithPersonLayout
            key={el.employeeId}
            name={el.employeeName}
            image={el.employeePicture}
            creatorOrRemove={"Remove"}
          ></SharedWithPersonLayout>
        ))}
    </div>
  );
});

export default SharedWith;
