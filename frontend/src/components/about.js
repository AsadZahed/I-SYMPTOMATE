import React from "react";
// import Header from "../components/Navbar/header"
// import About from "../components/Settings/about";

// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { useLocation } from "react-router";
import "../styles.css";
import { Button } from "react-bootstrap";
import Image1 from "../components/images/login1.jpeg";

function Aboutus() {
  // var history = useHistory();
  // var location = useLocation();
  // const [user, setUser] = React.useState(null);
  // const [token, setToken] = React.useState(null)

  // useEffect(() => {
  //   if (location.state) {
  //     console.log(location)
  //     setUser(location.state.user);
  //     setToken(location.state.token)
  //   } else {
  //     history.push('/addinfo/conditionlibrary')
  //   }
  // }, [location, history])

  return (
    <div>
      <div>
        <div className="about-section">
          <h1>About Us Page</h1>
          <p>Some text about who we are and what we do.</p>
          <p>
            Resize the browser window to see that this page is responsive by the
            way.
          </p>
        </div>
        <h2 style={{ textAlign: "center" }}>Our Team</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div className="column">
              <div className="card">
                <img src={Image1} alt="Jane" style={{ width: "100%" }} />
                <div className="">
                  <h2>Jane Doe</h2>
                  <p className="title">CEO & Founder</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>jane@example.com</p>
                  <Button className="">Contact</Button>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src={Image1} alt="Mike" style={{ width: "100%" }} />
                <div className="">
                  <h2>Mike Ross</h2>
                  <p className="title">Art Director</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>mike@example.com</p>
                  <Button className="">Contact</Button>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src={Image1} alt="John" style={{ width: "100%" }} />
                <div className="">
                  <h2>John Doe</h2>
                  <p className="title">Designer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>john@example.com</p>
                  <Button className="">Contact</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Aboutus;
