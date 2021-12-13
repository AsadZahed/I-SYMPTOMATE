import React, { useEffect } from "react";
import Header from "../Navbar/header";
import Disease from "./diseasesListNew.js";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { Button } from "react-bootstrap";

export default function Library() {
  const [post, setPost] = React.useState(Disease);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null)
  var history = useHistory();
  var location = useLocation();
  const [check, setCheck] = React.useState(false);
  const [image, setImage] = React.useState('');
  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user);
      setToken(location.state.token);
      setImage("http://localhost:9000/"+location.state.user.pathprofilepic)
 
    } else {
      history.push('/addinfo/conditionlibrary')
    }
  }, [location, history])


  const showDiseaseCard = (po) => {

    if (po.wiki == "") {
      return null;
    }
    else {
      return (

        <li key={po.name} align="start" className="shome-styles">
          <div>
            <h3>{po.name}</h3>
            {/* <p>{po.text}</p>
            <b><h5>Description: </h5></b><Link href={po.wiki}>{po.wiki}</Link> */}
          </div>
        </li>

      );
    }
  };

  const post1 = post.slice(0, 10);
  const post2 = post.slice(11, post.length);

  function show() {
    setCheck(true);
  }
  function hide() {
    setCheck(false);
  }

  return (
    <div>
      <Header token={token} user={user} image={image}/>
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
              padding: "7%",
              paddingBottom: "5%",
              alignItems: "center",

            }}
          >

            <h1 style={{

              textAlign: "center"
            }}>Know about Diseases! </h1>
            <p style={{

              textAlign: "center"
            }}>Here you can see all the diseases with their short description</p>
            <p style={{

              textAlign: "center"
            }}> For more info click on the card and you will be taken to Wikipedia for more info</p>

            {post1.map(posti => (
              <a href={posti.link} target="_blank" >
                <li key={posti.name} align="start" className="shome-styles">
                  <div>
                    <h3>{posti.name}</h3>
                    {/* <b><h5>Link: </h5></b><Link href={posti.link}>{posti.link}</Link> */}
                  </div>
                </li>
              </a>
            ))
            }
            {check && post2.map(posti => (
              <a href={posti.link} target="_blank" >
                <li key={posti.name} align="start" className="shome-styles">
                  <div>
                    <h3>{posti.name}</h3>
                    {/* <b><h5>Link: </h5></b><Link href={posti.link}>{posti.link}</Link> */}
                  </div>
                </li>
              </a>
            ))
            }

            {check && <Button variant="link" onClick={hide}>Hide</Button>}

            {check !== true && <Button variant="link" onClick={show}>More</Button>}


          </div>
        </div>
      </div>
    </div>
  );
}


