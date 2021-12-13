import React, { useEffect } from "react";
import "../../styles.css";

import { BrowserView, MobileView } from "react-device-detect";
import axios from 'axios';
import Header from "../Navbar/header"
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Button, Modal,ListGroup } from 'react-bootstrap'
export default function ProfilePic() {
    const [img, setImg] = React.useState();
    const fileInput = React.createRef();
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);
    const [image,setImage] = React.useState('')
    var history = useHistory();
    var location = useLocation();
    const [showResults, setShowResults] = React.useState(false);
    const [c,setc] = React.useState(false);
    const [show, setShow] = React.useState(false)
    const [dummy,setdummy] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false)
  

    const openModal = () => {
        setIsOpen(true)
      }
      const closeModal = () => {
        window.location.reload(false)
        setIsOpen(false)
        setdummy(false)
      }
    useEffect(() => {
        if (location.state) {
            console.log(location)
            setUser(location.state.user);
            setToken(location.state.token);
            setImage("http://localhost:9000/"+location.state.user.pathprofilepic)
 
        } else {
            history.push('/users/editprofile/profilepic')
        }
    }, [location, history,dummy,img])
    
    const mySubmitHandlerADD = () => {
        const data = 123;
        
        axios.post('http://localhost:9000/users/deleteprofilepicture',data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                //alert(JSON.stringify(res.data))
                console.log("Done")
            });
    }
    const mySubmitHandlerDelete = () => {
        const data = 123;
        
        axios.post('http://localhost:9000/users/deleteprofilepicture',data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                //alert(JSON.stringify(res.data))
                console.log("Done")
            });
    }
    const handleChange = event => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', fileInput.current.files[0]);
        axios.post('http://localhost:9000/users/uploadprofilepicture', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                //alert(JSON.stringify(res.data))
                setImg(res.data)
                setc(true);
                console.log("image is", img)
            });
    }
    const validate = ()=>{
        return c!==true;
    }
    return (
        <div>
            <Header token={token} user={user} image={image}/>

            <div style={{ backgroundColor: "#F8F8F8" }}>
                <BrowserView>
                <Modal show={isOpen} onHide={closeModal}>
                    <Modal.Header>
                      <Modal.Title>Profile Picture Upload!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <ul>
                        <li>Are you sure, you want to change your profile picture?</li>
                        
                      </ul>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>
                        Yes!
                      </Button>
                      <Button variant='secondary' onClick={closeModal}>
                        Close
                      </Button>
                      {/* <Button
                        variant='primary'
                        onClick={() => {
                          closeModal()
                        }}
                      >
                        C
                      </Button> */}
                    </Modal.Footer>
                  </Modal>
                    <div
                        style={{
                            paddingLeft: "12%",
                            paddingRight: "12%",
                            paddingTop: "5%",
                            paddingBottom: "5%",
                            alignItems: "center"
                        }}
                    >
                        <div
                            style={{
                                border: "1px solid #DCDCDC",
                                backgroundColor: "#fff",
                                padding: "7%",
                                textAlign: "center"
                            }}
                        >
                            <h5>Change Profile PIcture</h5>
                            {/* <p>{msg}</p> */}

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <form>
                                    <div class="form-group">
                                        <input type='file' ref={fileInput} accept="image/*" onChange={handleChange} class="form-control-file" id="exampleFormControlFile1" />
                                    </div>
                                </form>

                            </div>
                            
                            <div className="right-group">
            <Button
              type='submit'
              variant="warning"
              onClick={openModal}
              //d disabled={!validate()}
            >
              Upload Image!
            </Button>
            <div style={{margin:"2%"}}>

            </div>
            <Button
              type='submit'
              variant="warning"
              onClick={mySubmitHandlerDelete}
              //d disabled={!validate()}
            >
              Delete
            </Button>
          </div>
                        </div>
                    </div>
                </BrowserView>
                <MobileView>
                    <div
                        style={{
                            paddingTop: "5%",
                            textAlign: "center"
                        }}
                    >
                        <div
                            style={{
                                border: "1px solid #DCDCDC",
                                backgroundColor: "#fff",
                                padding: "7%"
                            }}
                        >
                            <h5>Change name</h5>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    textAlign: "left"
                                }}
                            >
                                <form>
                                    <div class="form-group">
                                        <input type='file' ref={fileInput} accept="image/*" onChange={handleChange} class="form-control-file" id="exampleFormControlFile1" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </MobileView>
            </div>
        </div>
    );
}
