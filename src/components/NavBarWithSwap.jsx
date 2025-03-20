import React from "react";
import { useLocation } from "react-router"; // Import useLocation
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logout from "./LogOut"; // Import the Logout component

function BasicExample() {
  const location = useLocation(); // Get the current route location

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">skill-Xchange</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            {location.pathname === "/user" ? (
              <>
                <Nav.Link href="/swapreq">Swap Skills</Nav.Link>
                {/* Use the Logout component directly */}
                <Logout />
              </>
            ) : (
              <>
                <Nav.Link href="/signin">Sign In</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Browse Skills"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Browse</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
