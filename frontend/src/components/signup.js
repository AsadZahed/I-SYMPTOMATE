import React from "react";
import Form from "react-bootstrap/Form";
import { Button, Alert } from "react-bootstrap";
import "./Login.css";

import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
//import Image1 from "../components/images/newhome.jpg";

import Image1 from "../components/images/symptoms-intro-img.jpg";
import Image2 from "../components/images/more-info-img.jpg";
import Image3 from "../components/images/symptoms-intro-img.jpg";

// import { BrowserView, MobileView } from "react-device-detect";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Header from "../components/Navbar/LSheader";
import Image from "../components/images/logo2.jpeg";
import { Link } from "react-router-dom";

import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = "117443239646-ni8sjfvdadef3m2h6iju1hkgoeu3vqbs.apps.googleusercontent.com";


export default function Signup() {
  const [fname, setFname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [googleID, setgoogleID] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [otp, setotp] = React.useState()
  var history = useHistory();
  console.log(otp)


  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: fname,
      username: email,
      password: password,
      isAdmin: false
    };

    axios.post('http://localhost:9000/users/signup', data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    })
      .then((res) => {
        if (res.data.user.isAdmin)
          history.push({
            pathname: "/login",
            state: {
              user: res.data.user,
              token: res.data.token
            }
          })
        else
          history.push({
            pathname: "/login",
            state: {
              user: res.data.user,
              token: res.data.token
            }
          })

      }).catch(err => setShowResults(true))

  }

  function GhandleSubmit(event) {
    event.preventDefault();
    console.log(otp)

    const googleData = {
      googleID: googleID,
      name: fname,
      username: email,
      password: otp,
      isAdmin: false

    }
    console.log(googleData.name);
    console.log(googleData.username);

    axios.post('http://localhost:9000/users/signup', googleData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    })
      .then((res) => {
        if (res.data.user.isAdmin)
          history.push({
            pathname: "/login",
            state: {
              user: res.data.user,
              token: res.data.token,
            }
          })
        else
          history.push({
            pathname: "/login",
            state: {
              user: res.data.user,
              token: res.data.token,
              opt : otp,
              googleLogin:true
            }
          })

      }).catch(err => setShowResults(true))


  }


  const [showloginButton, setShowloginButton] = React.useState(true);
  const [showlogoutButton, setShowlogoutButton] = React.useState(false);
  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
    setgoogleID(res.profileObj.googleId);
    setFname(res.profileObj.name);
    setEmail(res.profileObj.email);
    setotp(res.profileObj.googleId.slice(0, 6))
    setShowloginButton(true);
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
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
    }
  }
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "#F8F8F8" }}>
        <div className="btn-toolbar" style={{ paddingLeft: "10%", paddingRight: "10%" }}>

          <div style={{
            display: "flex",
            width: "40%",
            justifyContent: "flex-start",
            marginBottom:"5%"
          }}>
            {/* <img src={Image} alt="img" style={{paddingTop:'7%',height:'500px',width:'400px' }}/> */}
            <AliceCarousel autoPlay autoPlayInterval="2000" infinite disableDotsControls disableButtonsControls>
                <div>
                    <div
                        style={{paddingLeft:'5%',paddingTop:'1%'}}
                    >
                         <img src={Image1} alt="img1" className="sliderimg" style={{height:'100%',width:'100%' }} /> 
                        {/* <div style={{padding:'2%',position: 'absolute',top: '50%',left: '62%',border:'1px solid',color:'#0047b3',fontFamily: "Arial, Helvetica, sans-serif",transform: 'translate(-50%, -50%)',fontSize:'60px'}}>Check if your skin Mole is benign or Malignant in simple steps! </div> */}
                    </div>
                </div>
                <div style={{paddingLeft:'5%',paddingTop:'1%'}}>
                    <div style={{paddingLeft:'5%',paddingTop:'1%'}}>
                         <img src={Image2} alt="img2"  style={{height:'100%',width:'100%' }} />
                        {/*<div style={{padding:'2%',position: 'absolute',top: '50%',left: '62%',border:'1px solid',color:'#0047b3',fontFamily: "Arial, Helvetica, sans-serif",transform: 'translate(-50%, -50%)',fontSize:'60px'}}>Convienient, Easy and simple for poor people! </div>
                     */}
                    </div>
                </div>
                
                
            </AliceCarousel>


          </div>


          <div style={{
            display: "flex",
            flex: "4",
            justifyContent: "flex-start"
          }}>

            <div style={{
              width: '100%',
              backgroundColor: "#F8F8F8",
              padding: "3% 10% 10% 10%"
            }}>

              <div className="main-div"
                style={{
                  border: "1px solid #DCDCDC",
                  //paddingTop:"5%",
                  backgroundColor: "white",
                  
                }}>

                <h1 style={{ color: "black" }}>Registration</h1>
                <div className="Login">
                  <Form onSubmit={handleSubmit} style={{ color: "black" }}>
                    <Form.Group size="lg" controlId="fname">
                      <Form.Label style={{ color: "black" }}>Full Name</Form.Label>
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
                    <Form.Group size="lg" controlId="password"
                      style={{ paddingBottom: "5%" }}>
                      <Form.Label>Confrim Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                    </Form.Group>

                    {showResults ? <Alert variant="danger">Account already registered</Alert> :
                      <div></div>}


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
                        <Button variant="light" size="md" type="submit" href="/login">
                          Have an acount? Login
                        </Button>
                      </div>

                      <div>
                        <Button variant="light" size="md" type="submit" onClick={GhandleSubmit} href="/login">

                          {showloginButton ?
                            <GoogleLogin
                              clientId={clientId}
                              buttonText="Continue With google"
                              onSuccess={onLoginSuccess}
                              onFailure={onLoginFailure}
                              cookiePolicy={'single_host_origin'}
                              isSignedIn={true}
                              href="/login"

                            /> : null}

                    
                        </Button>


                        {/* {showlogoutButton ?
                          <GoogleLogout
                            clientId={clientId}
                            buttonText="Sign Out"
                            onLogoutSuccess={onSignoutSuccess}
                          >
                          </GoogleLogout> : null
                        } */}
                      </div>

                      {/* <div class="col-sm-4">
      <div class="card">
        <div class="card-body">
          <a class="btn btn-block  btn-social btn-google" href="/users/auth/google" role="button">
            <i class="fab fa-google"></i>
            Sign In with Google
          </a>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <a class="btn btn-block  btn-social btn-facebook" href="/auth/google" role="button">
            <i class="fab fa-facebook"></i>
            Sign In with Facebook
          </a>
        </div>
      </div>
    </div> */}
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