import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

import logo from "../../images/logo-wcs.png";
import style from "./header.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Header({ isAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    { id: 1, url: "/", label: "Home", requireAuth: false },
    { id: 2, url: "/sign", label: "Sign", requireAuth: true }
  ];

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img className={style.logo} src={logo} alt="wcs"></img>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {routes
              .filter(route => isAuth === route.requireAuth || !route.requireAuth)
              .map(route => {
                return (
                  <NavItem>
                    <NavLink tag={Link} to={route.url}>
                      {route.label}
                    </NavLink>
                  </NavItem>
                );
              })}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth
  };
};

export default connect(mapStateToProps)(Header);
