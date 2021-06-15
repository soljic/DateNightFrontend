import React from "react";
import NavItem from "../navItem/NavItem";
import Logo from "../logo/Logo";
import { Button } from "antd";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Container, Row, Col } from 'reactstrap';
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Container  className="container navbar"  fluid="md">
        <Row >
          <Col className="col-navbar" md={12}>
            <Logo />
            <a href={`/`}>Spiritus</a>
            <Button className="button-link" type="link">
            Get early acces
          </Button>
          </Col>
          </Row>
       
      </Container>
    </>
  );
}

export default NavBar;
