import React from "react";
import NavItem from "../navItem/NavItem";
import Logo from "../logo/Logo";
import { Button } from "antd";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="navbar">
        <Logo />
        <div className="nav-items">
          <NavItem name={"Stories"} />
          <NavItem name={"About"} />
          <NavItem name={"Contact"} />
        </div>
        <div className="button-navbar">
        <Button className="button-link" type="link">Get early acces</Button>
      </div>
      </div>
    </>
  );
}

export default NavBar;
