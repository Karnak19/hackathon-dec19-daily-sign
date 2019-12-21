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
import { Link, useHistory } from "react-router-dom";

import logo from "../../images/logo-wcs.png";
import style from "./header.module.scss";

import { logOut } from "../../store/actions";
import { routes } from "../../Router";

function Header({ isAuth, dispatch }) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="primary" expand="md">
      <NavbarBrand onClick={() => history.push("/")} style={{ cursor: "pointer" }}>
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
