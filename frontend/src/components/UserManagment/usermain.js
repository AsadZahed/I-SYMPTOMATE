import React, { useEffect } from "react";
import Header from "../Navbar/header"

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiUserCheck } from "react-icons/bi";
import { FcManager } from "react-icons/fc";
import { MdDateRange } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { GiBodyHeight } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";

export default function UserMain() {
  var history = useHistory();
  var location = useLocation();

  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null);
  const[image,setImage] = React.useState('')

  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user);
      setToken(location.state.token);
      setImage("http://localhost:9000/"+location.state.user.pathprofilepic)
 
    } else {
      history.push('/editprofile')
    }
  }, [location, history])
  return (
    <div>
      <Header token={token} user={user} image={image} />

      <div style={{ backgroundColor: "#F8F8F8" }}>
        <div
          style={{
            paddingLeft: "12%",
            paddingRight: "12%",
            paddingTop: "1%",
            paddingBottom: "5%"
          }}
        >
          <div
            style={{
              border: "1px solid #DCDCDC",
              backgroundColor: "#fff",
              padding: "7%"
            }}
          >
            <h1>Edit profile</h1>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                color: "#ffff"
              }}
            >
              <Button variant="link" style={{ margin: "5px", textDecoration: "none" }}>
                <Link
                  style={{ color: "#0c0530" }}
                  to={{
                    pathname: "/users/editprofile/changeusername",
                    state: {
                      token: token,
                      user: user,
                    },
                  }}
                >
                  <FcManager size="40%" color="#0047b3" style={{ paddingTop: "3%" }} />
                  <br />
                  Change username
                </Link>
              </Button>
              {/* <div style={{ textAlign: "center" }}>
                    <div style={{color: "#ffff"}}>
                      <Button style = {{color: "black"}} size="lg" variant="warning" type="submit" >
                        Login
                    </Button>
                    </div>
                    </div> */}



              <Button variant="link" style={{ margin: "5px", textDecoration: "none" }}>
                <Link
                  style={{ color: "#0c0530" }}
                  to={{
                    pathname: "/users/editprofile/changepassword",
                    state: {
                      token: token,
                      user: user,
                    },
                  }}
                >
                  <RiLockPasswordFill size="40%" color="#0047b3" style={{ paddingTop: "3%" }} />
                  <br />
                  Change password
                </Link>
              </Button>
              <Button variant="link" style={{ margin: "5px", textDecoration: "none" }}>
                <Link
                  style={{ color: "#0c0530" }}
                  to={{
                    pathname: "/addinfo/basicinfo",
                    state: {
                      token: token,
                      user: user,
                    },
                  }}
                >
                  <MdDateRange size="40%" color="#0047b3" style={{ paddingTop: "3%" }} />
                  <br />
                  Change Age and gender
                </Link>
              </Button>


              <Button variant="link" style={{ margin: "5px", textDecoration: "none" }}>
                <Link
                  style={{ color: "#0c0530" }}
                  to={{
                    pathname: "/addinfo/personalinfo",
                    state: {
                      token: token,
                      user: user,
                    },
                  }}
                >
                  <GiBodyHeight size="40%" color="#0047b3" style={{ paddingTop: "3%" }} />
                  <br />
                  Change height and weight
                </Link>
              </Button>

              <Button variant="link" style={{ margin: "5px", textDecoration: "none" }}>
                <Link
                  style={{ color: "#0c0530" }}
                  to={{
                    pathname: "/users/editprofile/profilepic",
                    state: {
                      token: token,
                      user: user,
                    },
                  }}
                >
                  <GrUserManager size="40%" color="#0047b3" style={{ paddingTop: "3%" }} />
                  <br />
                  Profile Picture
                </Link>
              </Button>


              <Button variant="link" style={{ margin: "5px", textDecoration: "none" }}>
                <Link
                  style={{ color: "#0c0530" }}
                  to={{
                    pathname: "/users/editprofile/deleteuser",
                    state: {
                      token: token,
                      user: user,
                    },
                  }}
                >
                  <AiFillDelete size="40%" color="#0047b3" style={{ paddingTop: "3%" }} />
                  <br />
                  Delete account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
