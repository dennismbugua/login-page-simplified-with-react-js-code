import React, { Fragment } from "react";
import classnames from "classnames";

const LiElements = ({
  liData,
  toggleList,
  isOpenList,
  activeSideBar,
  toggle,
}) => {
  return (
    <Fragment>
      <li>
        <a
          href="#null"
          onClick={toggleList}
          data-toggle="collapse"
          className="dropdown-toggle"
        >
          <i className="fab fa-product-hunt"></i>
          <span>{liData.menuName}</span>
        </a>
        {/* <Collapse isOpen={isOpenProjectsDropDown} className="pl-4"> */}
        {isOpenList && (
          <ul className="list-unstyled components">
            {liData.subMenu.map((el, i) => (
              <li
                className={classnames({
                  active: activeSideBar === el.route,
                })}
              >
                <a
                  href={el.route}
                  onClick={() => {
                    toggle(el.route);
                  }}
                >
                  <i className="fas fa-comment-alt"></i>
                  <span> {el.subMenuName}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* </Collapse> */}
      </li>
    </Fragment>
  );
};

export default LiElements;
