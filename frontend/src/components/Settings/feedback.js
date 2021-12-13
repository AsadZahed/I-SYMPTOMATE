import React, { useEffect } from "react";
import "../../styles.css";
import emailjs from 'emailjs-com';
import Header from "../Navbar/header"


import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

export default function Feedback() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");

  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null);
  var history = useHistory();
  var location = useLocation();
  const [someone, setSomeone] = React.useState(null);
  const [image,setImage] = React.useState('');
  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user);
      setToken(location.state.token);
      setName(location.state.user.name)
      setEmail(location.state.user.username)
      setImage("http://localhost:9000/"+location.state.user.pathprofilepic)
 
    } else {
      history.push('/setting/feedback')
    }
  }, [location, history])


  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_osbt6l1', 'template_7j367il', e.target, 'user_KK7rL2TStB1DLGp46kZVd')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  }
  function validate() {
    return (
      name.length > 0 && email.length > 0 && body.length > 0
    )
  }
  return (
    <div>
      <Header token={token} user={user} image={image} />

      <div>

        <form style={{ padding: "35%", paddingTop: "5%", paddingBottom: "5%" }} onSubmit={sendEmail}>

          <div class="form-group">
            <label for="exampleFormControlInput1">Name</label>
            <input name="user_name" type="text" class="form-control" id="exampleFormControlInput1" placeholder={name} disabled="true" />
          </div>

          <div class="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input name="user_email" type="email" class="form-control" id="exampleFormControlInput1" placeholder={email} disabled="true" />
          </div>

          <div class="form-group">
            <label for="exampleFormControlInput1">Subject</label>
            <input name="subject" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Body</label>
            <textarea name="message" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter text here...." onChange={(e) => setBody(e.target.value)}></textarea>
          </div>
          <div style={{ paddingRight: "45%", paddingLeft: "25%", textAlign: "center" }}>
            <input className="button button3" type="submit" value="Send Feedback" disabled={!validate()} />
          </div>

        </form>

      </div>
    </div>
  );
}