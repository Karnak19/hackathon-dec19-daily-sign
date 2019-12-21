import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../images/logo-wcs.png";
import style from "./header.module.scss";

import { logOut } from "../../store/actions";

function Header({ isAuth, dispatch }) {
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    { id: 1, url: "/", label: "Home", requireAuth: false },
    { id: 2, url: "/sign", label: "Sign", requireAuth: true },
    { id: 4, url: "/weekly", label: "Planning", requireAuth: true },
    { id: 3, url: "/profile", label: "Profile", requireAuth: true }
  ];

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="primary" expand="md">
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
                <NavItem key={route.id}>
                  <NavLink tag={Link} to={route.url}>
                    {route.label}
                  </NavLink>
                </NavItem>
              );
            })}
        </Nav>
        {isAuth && (
          <Button color="danger" onClick={() => dispatch(logOut())}>
            Log Out
          </Button>
        )}
      </Collapse>
    </Navbar>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth
  };
};

export default connect(mapStateToProps)(Header);
