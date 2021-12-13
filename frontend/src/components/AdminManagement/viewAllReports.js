import React, { useEffect } from "react";
import "../Login.css";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import Header from "../Navbar/Aheader";
import { Table } from "react-bootstrap";

export default function ViewAllReports() {
  const [patients, setPatients] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  var history = useHistory();
  var location = useLocation();

  React.useEffect(() => {
    if (location.state) {
      console.log(location);
      setUser(location.state.user);
      setToken(location.state.token);
    } else {
      history.push("/admin/viewallreports");
    }
  }, [location, history]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/users/admin/viewallreports")
      .then((res, i) => {
        const patient = res.data;
        setPatients(patient);
      });
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: "#F8F8F8" }}>
        <Header token={token} user={user} />
        <div
          style={{
            paddingLeft: "12%",
            paddingRight: "12%",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}
        >
          <div
            style={{
              border: "1px solid #DCDCDC",
              backgroundColor: "#fff",
              padding: "7%",
            }}
          >
            <h1>View Reports</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((name, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{name.name}</td>
                        <td>{name.time}</td>
                        <td>{name.cancer}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
