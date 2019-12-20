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
import { toast } from "react-toastify";

import logo from "../../images/logo-wcs.png";
import style from "./header.module.scss";
import { LOGOUT } from "../../reducers/reducer";

function Header({ isAuth, dispatch }) {
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    { id: 1, url: "/", label: "Home", requireAuth: false },
    { id: 2, url: "/sign", label: "Signer", requireAuth: true },
    { id: 3, url: "/recap", label: "Récapitulatif", requireAuth: true },
    { id: 4, url: "/profile", label: "Profile", requireAuth: true }
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
              .filter(
                route => isAuth === route.requireAuth || !route.requireAuth
              )
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
            <Button
              color="danger"
              onClick={() => {
                dispatch({ type: LOGOUT });
                toast.error("Logout successfull !", {
                  position: "bottom-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true
                });
              }}
            >
              Log Out
            </Button>
          )}
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
