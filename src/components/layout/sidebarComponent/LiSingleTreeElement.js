import React from "react";
import classnames from "classnames";

const LiSingleTreeElement = ({
  route,
  menuName,
  icon,
  activeSideBar,
  toggle,
}) => {
  return (
    <li
      className={classnames({
        active: activeSideBar === route,
      })}
    >
      <a
        href={route}
        onClick={() => {
          toggle(route);
        }}
      >
        <i className="fas fa-home"></i>
        <span>{menuName}</span>
      </a>
    </li>
  );
};

export default LiSingleTreeElement;
