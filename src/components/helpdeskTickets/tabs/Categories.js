import React, { Fragment } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

const Categories = React.memo(
  ({ category, helpdeskData, activeTab, toggleTabs }) => {
    return (
      <Fragment>
        <Nav tabs vertical className="sideTab sideTab-helpdesk">
          {category.map((category, i) => {
            return (
              <NavItem key={category.categoriesId}>
                <NavLink
                  className={classnames(
                    { activeTab: activeTab === category.categoriesId },
                    "tabName mb-2"
                  )}
                  onClick={() => {
                    toggleTabs(category.categoriesId);
                  }}
                >
                  {`${i + 1}. ${category.categoriesName}`}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </Fragment>
    );
  }
);

export default Categories;
