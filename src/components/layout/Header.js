import React, { useState, Fragment } from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  NavbarText,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { withRouter } from "react-router-dom";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function.

  const toggle = () => setIsOpen(!isOpen);

  // handle logout.

  const handleLogout = () => {
    // props.history.push("/em");

    localStorage.removeItem("user");
    window.location.href = "/em";
  };

  return (
    <Fragment>
      <Navbar color="" expand="md">
        <NavbarBrand>
          <Button
            color=""
            className="btn-headerToggle"
            onClick={props.handleToggle}
          >
            <i className="fas  fa-align-left"></i>
          </Button>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Nav className="mr-auto" navbar></Nav>
        <NavbarText>
          <UncontrolledDropdown nav inNavbar className="">
            <DropdownToggle nav>
              {" "}
              <i className="fas fa-2x fa-user-circle "></i>
            </DropdownToggle>
            <DropdownMenu right>
              {/* <DropdownItem>Profile</DropdownItem> */}
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </NavbarText>
      </Navbar>
    </Fragment>
  );
};

export default withRouter(Header);
