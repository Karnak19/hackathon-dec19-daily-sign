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
import { useQuery } from "@apollo/react-hooks";
import { GET_AVATAR } from "../../gql";

function Header({ isAuth, dispatch, uuid = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const { data, loading } = useQuery(GET_AVATAR, { variables: { id: uuid } });

  const toggle = () => setIsOpen(!isOpen);

  console.log(data);
  return (
    <Navbar color="primary" light expand="md">
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
        {data && data.user && data.user.avatar && (
          <img src={data.user.avatar} style={{ borderRadius: "50%", height: "50px" }} className="ml-3" alt="" />
        )}
      </Collapse>
    </Navbar>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth,
    uuid: state.userId
  };
};

export default connect(mapStateToProps)(Header);
