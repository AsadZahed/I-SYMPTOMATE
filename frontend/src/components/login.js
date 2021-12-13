import React,{useEffect} from "react";
import Form from "react-bootstrap/Form";
import { Button, Alert } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import Image1 from "../components/images/symptoms-intro-img.jpg";
//import Image1 from "../components/images/newhome.jpg";
import Image2 from "../components/images/more-info-img.jpg";
import Header from "../components/Navbar/LSheader";
import Image from "../components/images/logo2.jpeg"
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { Link } from "react-router-dom";

const clientId = "117443239646-ni8sjfvdadef3m2h6iju1hkgoeu3vqbs.apps.googleusercontent.com";


export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gdata, setDData] = React.useState("");
  const [otp, setotp] = React.useState("")
  const [showResults, setShowResults] = React.useState(false)
  const [fname, setFname] = React.useState("");
  const [googleID, setgoogleID] = React.useState("");
  const [googleLogin, setgoogleLogin] = React.useState("");
  var history = useHistory();
  var location = useLocation();

 


  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: email,
      password: password,
    };

    axios.post('http://localhost:9000/users/login', data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    })
      .then((res) => {
        if (res.data.user.isAdmin)
          history.push({
            pathname: "/admin/privlages",
            state: {
              user: res.data.user,
              token: res.data.token
            }
          })
        else
          history.push({
            pathname: "/",
            state: {
              user: res.data.user,
              token: res.data.token
            }
          })

      }).catch((res) => setShowResults(true))


  }


  useEffect(() => {
    console.log("this is login",location.state)
       
    if (location.state) {
      console.log(location)
      console.log("issue is in useeffect")
      setotp(location.state.opt);
      console.log(otp)
      setgoogleLogin(location.state.googleLogin)
    } else {
      history.push('/login')
    }
  }, [])


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  return (
    <div>
      <Header />

      <div style={{ backgroundColor: "#F8F8F8" }}>
       {googleLogin && <Alert variant="success" style={{ fontSize: "20px", textAlign: "center" }}><b>Your OTP is {otp}</b></Alert>}
        <div className="btn-toolbar" style={{ paddingLeft: "10%", paddingRight: "10%" }}>

          <div style={{
            display: "flex",
            width: "30%",
            justifyContent: "flex-start"
          }}>
            {/* <img height="90%" src={Image} alt="img" /> */}
            <AliceCarousel autoPlay autoPlayInterval="2000" infinite disableDotsControls disableButtonsControls>
                <div>
                    <div
                        style={{paddingLeft:'5%',paddingTop:'1%'}}
                    >
                         <img src={Image1} alt="img1" className="sliderimg" style={{height:'100%',width:'100%' }} /> 
                        {/* <div style={{padding:'2%',position: 'absolute',top: '50%',left: '62%',border:'1px solid',color:'#0047b3',fontFamily: "Arial, Helvetica, sans-serif",transform: 'translate(-50%, -50%)',fontSize:'60px'}}>Check if your skin Mole is benign or Malignant in simple steps! </div> */}
                    </div>
                </div>
                <div style={{
                    // paddingLeft: "12%",
                    // paddingRight: "12%",
                    paddingBottom: "0%",
                }}>
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
                  // paddingRight: "50%",
                  // paddingTop: "10%",
                  // paddingBottom: "10%"
                }}>
                <h1>Login</h1>

                <div className="Login">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                      <Form.Label style={{ textAlign: "left ", paddingRight: "40%", fontSize: "19px", color: "black" }}>Email</Form.Label>
                      <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group size="lg" style={{ paddingBottom: "5%", width: "100%", fontSize: "19px", color: "black" }} controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    {showResults ? <Alert variant="danger">Incorrect username or password</Alert> : ""}


                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "#ffff" }}>
                        <Button style={{ color: "#0047b3" }} size="lg" variant="warning" type="submit" disabled={!validateForm()}>
                          Login
                        </Button>
                      </div>
                      <div style={{ paddingTop: "3%" }}>
                        <Button variant="light" size="md" type="submit" href="/users/forgotpassword">
                          Forgot Password
                        </Button>
                      </div>
                      <div style={{ paddingTop: "3%" }}>
                        <Button variant="light" size="md" type="submit" href="/signup">
                          Don't have account? Register now
                        </Button>
                      </div>
                      {/* <div style={{ paddingTop: "3%" }}>
                      <Button variant="light" size="md" type="submit" href="/admin/login">
                        Admin Login
                      </Button>
                    </div>  */}
                      {/* <div>
                        <Link
                          to={{
                            pathname: "/",
                          }}
                        >

                          {showloginButton ?
                            <GoogleLogin
                              clientId={clientId}
                              buttonText="Sign In"
                              onSuccess={onLoginSuccess}
                              onFailure={onLoginFailure}
                              cookiePolicy={'single_host_origin'}
                              isSignedIn={true}
                            /> : null}
                        </Link>


                        {showlogoutButton ?
                          <GoogleLogout
                            clientId={clientId}
                            buttonText="Sign Out"
                            onLogoutSuccess={onSignoutSuccess}
                          >
                          </GoogleLogout> : null
                        }
                      </div>
 */}

                    </div>

                  </Form>



                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div >

  );
}
