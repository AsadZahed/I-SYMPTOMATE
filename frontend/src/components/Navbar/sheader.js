import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Nav, Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div>
      <div style={{paddingBottom: "30px", backgroundColor: "#0047b3", fontFamily: "Arial, Helvetica, sans-serif" }}></div>
{/* <div style={{flex:2,flexDirection:"row",justifyContent:'space-between',padding:'10'}}> */}
      <Navbar style={{ paddingLeft: "5%",fontSize:"18px", flex:2,flexDirection:"row",justifyContent:"space-evenly"}} bg="light" expand="lg">
        <Navbar.Brand style={{fontSize:"30px"}}>
          {/* <SiAddthis style={{ width:"10px",height:"10px",paddingRight: "10px", paddingBottom: "9px" }} /> */}
          <Link
            to={{
              pathname: '',
              state: {
                token: props.token,
                user: props.user,
              },
            }}
            style={{color:'#0047b3'}}
          >
            I-SYMPTOMATE
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{ paddingLeft: "85%"}}>
          <Nav.Link href="/signup" style={{color:'#0047b3'}}>Signup</Nav.Link>
          <Nav.Link  style={{color:'#0047b3'}}>|</Nav.Link>
          <Nav.Link href="/login" style={{color:'#0047b3'}}>Login</Nav.Link>

         </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    </div>
  );
}

export default Header;
