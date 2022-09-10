import React from "react";

const Listing = React.memo((props) => {
  return (
    <div className="todo-list mb-4">
      <div>
        <h3>{props.heading}</h3>
      </div>
      {props.list.map((el) => (
        <div key={el.id} className="todo-list-card">
          <div className="todo-list-card-icon">{props.icon}</div>
          <div className="todo-list-card-content">{el.content}</div>
          <div className="todo-list-card-checkBox">
            {/* <div className="image">
              <img
                alt=""
                src={require(`../../../img/employee/avatar-01.jpg`)}
              />
            </div> */}

            <i className="fas fa-check  project-task-icon"></i>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Listing;
