import React from "react";
import "../assets/styles/App.scss";
import { Container, Row, Col } from "reactstrap";
const Header = () => (
  <header className="header">
    <Container>
      <Row>
        <Col xs="12">
          <h1>Naves</h1>
        </Col>
      </Row>
    </Container>
  </header>
);

export default Header;