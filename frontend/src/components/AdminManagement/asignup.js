import React from "react";
import Form from "react-bootstrap/Form";
import { Button, Alert } from "react-bootstrap";
import "../Login.css";

// import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../Navbar/LSheader";
import Image from "../images/logo2.jpeg";

import { GoogleLogin, GoogleLogout } from "react-google-login";

const clientId =
  "117443239646-ni8sjfvdadef3m2h6iju1hkgoeu3vqbs.apps.googleusercontent.com";

export default function ASignup() {
  const [fname, setFname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [error, setError] = React.useState("");
  var history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: fname,
      username: email,
      password: password,
      isAdmin: true,
    };

    console.log(data);
    axios
      .post("http://localhost:9000/users/signup", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        if (res.data.user.isAdmin)
          history.push({
            pathname: "/login",
            state: {
              user: res.data.user,
              token: res.data.token,
            },
          });
        else
          history.push({
            pathname: "/login",
            state: {
              user: res.data.user,
              token: res.data.token,
            },
          });
      })
      .catch((err) => setShowResults(true));
  }

  const [showloginButton, setShowloginButton] = React.useState(true);
  const [showlogoutButton, setShowlogoutButton] = React.useState(false);
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
    setFname(res.profileObj.name);
    setEmail(res.profileObj.email);
    setPassword("1234");
    console.log(fname + "       " + email);

    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      fname.length > 0 &&
      cpassword.length > 0 &&
      password === cpassword
    );
  }
  function validatePassword() {
    if (password !== cpassword) {
      setError("Password Doesnot match");
    }
  }
  console.clear()
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "#F8F8F8" }}>
        <div
          className="btn-toolbar"
          style={{ paddingBottom: "3%", paddingLeft: "5%", paddingRight: "5%" }}
        >
          <div
            style={{
              display: "flex",
              flex: "1",
              width: "30%",
              justifyContent: "flex-start",
            }}
          >
            <img src={Image} alt="img" />
          </div>

          <div
            style={{
              display: "flex",
              flex: "4",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "#F8F8F8",
                padding: "5%",
              }}
            >
              <div
                className="main-div"
                style={{
                  border: "1px solid #DCDCDC",

                  backgroundColor: "white",
                  paddingRight: "50%",
                }}
              >
                <h1 style={{ color: "black" }}>Registration</h1>
                <div className="Login">
                  <Form onSubmit={handleSubmit} style={{ color: "black" }}>
                    <Form.Group size="lg" controlId="fname">
                      <Form.Label style={{ color: "black" }}>
                        Full Name
                      </Form.Label>
                      <Form.Control
                        autoFocus
                        type="text"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group size="lg" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      size="lg"
                      controlId="password"
                      style={{ paddingBottom: "5%" }}
                    >
                      <Form.Label>Confrim Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                    </Form.Group>
                    {showResults ? (
                      <Alert variant="danger">Error while registering</Alert>
                    ) : (
                      <div></div>
                    )}

                    <div style={{ textAlign: "center", paddingTop: "3%" }}>
                      <div>
                        <Button
                          variant="warning"
                          onClick={validatePassword}
                          size="lg"
                          type="submit"
                          disabled={!validateForm()}
                        >
                          Register
                        </Button>
                      </div>

                      <div style={{ paddingTop: "3%" }}>
                        <Button
                          variant="light"
                          size="md"
                          type="submit"
                          href="/login"
                        >
                          Have an acount? Login
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
