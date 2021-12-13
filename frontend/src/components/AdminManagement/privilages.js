import React from "react";
import Button from "react-bootstrap/Button";
import "../Login.css";
import Header from "../Navbar/Aheader"

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { AiOutlineMail } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { HiOutlineDocumentSearch } from "react-icons/hi";

export default function Privilages() {

  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null)
  var history = useHistory();
  var location = useLocation();

  React.useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user);
      setToken(location.state.token)
    } else {
      history.push('/admin/privlages')
    }
  }, [location, history])
  return <div> <div style={{ backgroundColor: "#F8F8F8" }}>
    <Header token={token} user={user} />
    <div
      style={{
        paddingLeft: "12%",
        paddingRight: "12%",
        paddingTop: "5%",
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
        <h1>View Users by email, name and view Reports</h1>

        <div
          style={{
            display: "flex",
            textAlign: "left"
          }}
        >
          <div style={{ justifyContent: "space-between", flexDirection: "column" }}>
            <Button variant="link" style={{ textDecoration: "none" }}>
              <Link
                style={{ color: "#0c0530" }}
                to={{
                  pathname: "/users/admin/viewusers",
                  state: {
                    token: token,
                    user: user,
                  },
                }}
              >
                <AiOutlineMail size="40%" color="#0047b3" style={{ paddingTop: "3%" }} />
                <br />
                <h5 style={{ color: "#0047b3" }}>View users by Email</h5>

              </Link>
            </Button>

          </div>
          <div style={{ justifyContent: "space-between", flexDirection: "column" }}>


            <Button variant="link" style={{ margin: "5px", textDecoration: "none" }}>
              <Link
                style={{ color: "#0c0530" }}
                to={{
                  pathname: "/users/admin/viewusersname",
                  state: {
                    token: token,
                    user: user,
                  },
                }}
              >
                <BiUser size="40%" color="#0047b3" />
                <br />
                <h5 style={{ color: "#0047b3" }}>View users by name</h5>
              </Link>

            </Button>

          </div>
          <div style={{ justifyContent: "space-between", flexDirection: "column" }}>
            <Button variant="link" style={{ margin: "5px", textDecoration: "none" }}>
              <Link
                style={{ color: "#0c0530" }}
                to={{
                  pathname: "/users/admin/viewallreports",
                  state: {
                    token: token,
                    user: user,
                  },
                }}
              >
                <HiOutlineDocumentSearch size="40%" color="#0047b3" />
                <br />
                <h5 style={{ color: "#0047b3" }}>View all Reports</h5>
              </Link>
            </Button>
          </div>
          <div style={{ justifyContent: "space-between", flexDirection: "column" }}>
            <Button variant="link" style={{ margin: "5px", textDecoration: "none" }}>
              <Link
                style={{ color: "#0c0530" }}
                to={{
                  pathname: "/reports/analysis",
                  state: {
                    token: token,
                    user: user,
                  },
                }}
              >
                <HiOutlineDocumentSearch size="40%" color="#0047b3" />
                <br />
                <h5 style={{ color: "#0047b3" }}>View Analysis</h5>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>;
}
