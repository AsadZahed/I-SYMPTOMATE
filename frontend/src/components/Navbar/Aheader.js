import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
function Header(props) {
  return (
    <div>
      <div
        style={{
          paddingBottom: "70px",
          backgroundColor: "#0047b3",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      ></div>

      <Navbar
        style={{ paddingLeft: "12%", fontSize: "22px" }}
        bg="light"
        expand="lg"
      >
        <Navbar.Brand style={{ fontSize: "30px" }}>
          {/* <SiAddthis style={{ width:"10px",height:"10px",paddingRight: "10px", paddingBottom: "9px" }} /> */}
          <Link
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            to={{
              pathname: "/admin/privlages",
              state: {
                token: props.token,
                user: props.user,
              },
            }}
          >
            I-SYMPTOMATE
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title="Account"
              id="basic-nav-dropdown"
              style={{ paddingTop: "8px", color: "#0c0530" }}
            >
              <NavDropdown.Item>
                <Link
                  to={{
                    pathname: "/admin/editprofile",
                    state: {
                      token: props.token,
                      user: props.user,
                    },
                  }}
                >
                  Edit account
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/login">
              <Button variant="warning">
                <Link
                  style={{
                    color: "#0c0530",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                  to={{
                    pathname: "/login",
                    state: {
                      token: props.token,
                      user: props.user,
                    },
                  }}
                >
                  Logout
                </Link>
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
