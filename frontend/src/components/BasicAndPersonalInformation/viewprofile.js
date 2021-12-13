import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import Header from "../Navbar/header";
export default function Report() {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [name, setName] = React.useState("anonymous");
  const [height, setheight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [ages, setages] = React.useState("");
  const [gender, setgender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState("");
  var history = useHistory();
  var location = useLocation();

  useEffect(() => {
    try {
      if (location.state) {
        console.log(location);
        setUser(location.state.user);
        setToken(location.state.token);
        setName(location.state.user.name);
        setEmail(location.state.user.username);
        setages(location.state.user.age);
        setgender(location.state.user.gender);
        setheight(location.state.user.height + " feet");
        setWeight(location.state.user.weight + " kg");
        setImage("http://localhost:9000/" + location.state.user.pathprofilepic);
      } else {
        history.push("/addinfo/viewprofile");
      }
    } catch (res) {
      console.log(res.error);
    }
  }, [location, history]);

  return (
    <div
      style={{
        paddingBottom: "5%",
      }}
    >
      <Header token={token} user={user} image={image} />

      <div
        id="GFG"
        style={{
          width: "50%",
          margin: "auto",
          border: "2px solid black",
          paddingBottom: "1%",
        }}
      >
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#0047b3",
              border: "2px solid black",
              color: "#fff",
              padding: "10px",
            }}
          >
            <p style={{ fontSize: "20px", fontWeight: "500" }}>
              I-Symptomate | An intelligent
            </p>
            <img
              src={image}
              alt="profile Pic"
              style={{ width: "15%", borderRadius: "40px" }}
            />
          </div>
          <div style={{ backgroundColor: "#ffff", padding: "10px" }}>
            <div
              style={{
                padding: "0px 10px 0px 10px",
                color: "#282c34",
                display: "flex",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "500",
                  textDecoration: "underline",
                }}
              >
                Patient Information:
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                color: "#282c34",
                textDecoration: "none",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              <div style={{ marginRight: "-10%" }}>
                <p>
                  <strong>Full Name: </strong> {name}
                </p>
                <p>
                  <strong>Gender: </strong> {gender}
                </p>
                <p>
                  <strong>Age: </strong> {ages}
                </p>
              </div>
              <div>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Height: </strong> {height}
                </p>
                <p>
                  <strong>Weight:</strong> {weight}
                </p>
              </div>
            </div>
            <hr />
          </div>
        </form>
      </div>
    </div>
  );
}
