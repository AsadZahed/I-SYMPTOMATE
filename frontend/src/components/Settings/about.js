import React, { useEffect } from 'react'
import '../../styles.css'
import { BrowserView, MobileView } from 'react-device-detect'
import Aboutus from '../about'
import Header from '../Navbar/header'
import FaheemImg from "../../components/images/Faheem.jpeg";
import AsadImg from "../../components/images/Asad.jpeg";
import sirImg from "../../components/images/sirTanveer.jpg";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { Button } from "react-bootstrap";

export default function About () {
  var history = useHistory()
  var location = useLocation()
  const [user, setUser] = React.useState(null)
  const [token, setToken] = React.useState(null)
  const [image, setImage] = React.useState('')

  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('/addinfo/conditionlibrary')
    }
  }, [location, history])

  return (
    <div style={{ backgroundColor: '#F8F8F8' }}>
      <Header token={token} user={user} image={image} />
      <BrowserView>
        <div
          style={{
            paddingLeft: '12%',
            paddingRight: '12%',
            paddingTop: '5%',
            paddingBottom: '5%',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              border: '1px solid #DCDCDC',
              backgroundColor: '#fff',
              padding: '7%'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                alignItems: 'left'
              }}
            >
              <div className='about-section'>
                <h1>About Us Page</h1>
              </div>
              <h2 style={{ textAlign: 'center' }}>Our Team</h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <div className='column' style={{width:"50%",height:"80%"}}>
                    <div className='card'>
                      <img src={AsadImg} alt='Mike' style={{ width: '100%' }} />
                      <div className=''>
                        <h2>Asad Ahmed Zahid</h2>
                        <p className='title'>CEO and Founder</p>
                        <p>
                        Hi, i am a bachelors student of Computer science in last semester. I have interests in both Web development and Machine learning. I have worked with different organizations to gain skills. Currently working as a OneScreen as a software developer.
                        </p>
                        <p>asad.zahid840@gmail.com</p>
                        {/* <Button className=''>Contact</Button> */}
                      </div>
                    </div>
                  </div>
                  <div className='column' style={{width:"50%",height:"80%"}}>
                    <div className='card'>
                      <img src={FaheemImg} alt='Jane' style={{ width: '100%' }} />
                      <div className=''>
                        <h2>Faheem Riaz</h2>
                        <p className='title'>CEO & Founder</p>
                        <p>
                        Currently Studying BS in Computer Science from COMSATS University Islamabad. I have hands on experience in different React.js projects, Good knowledge, skills, and Strong understanding of Reactjs, Passionate about learning and see my future as front-end React.js developer, Always passionate about what I do and aim to get to the top of this
                        </p>
                        <p>faheemraiz177@gmail.com</p>
                       
                      </div>
                    </div>
                  </div>

                  

                
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                alignItems: 'left'
              }}
            >
              <div className='about-section'>
                <h1>About Us Page</h1>
              </div>
              <h2 style={{ textAlign: 'center' }}>Our Team</h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  
                  <div className='column' style={{width:"50%",height:"80%"}}>
                    <div className='card'>
                      <img src={sirImg} alt='Jane' style={{ width: '100%' }} />
                      <div className=''>
                        <h2>Mr. Tanveer Ahmed Siddique</h2>
                        <p className='title'>Supervisor</p>
                        <p>
                        Tanveer Ahmed is a data enthusiast and loves to work on data to solve challenging problems. He did master's degrees in Applied Mathematics (2001) and Computer Science (2003) from GC University Lahore. He joined COMSATS Institute of Information Technology in 2007, where he is currently an Assistant Professor. He admires mathematics a lot and always tries to use it to gain maximum profit for businesses. He is fond of using open source tools for data analysis. He contributed in revising and upgraded the CS curriculum to match it to international standards steered by ABET and the ACM. His research interest includes Natural Language Processing, Machine Learning, and Text Mining.
                        </p>
                        <p>+92-51-9247000</p>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div
          style={{
            paddingTop: '5%',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              border: '1px solid #DCDCDC',
              backgroundColor: '#fff',
              padding: '7%',
              alignItems: 'center'
            }}
          >
            <h5>About us</h5>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '5%',

                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <p>
                Welcome to Intelligent Symptomate, your number one source for
                all things [product]. We're dedicated to providing you the very
                best of [product], with an emphasis on [store characteristic 1],
                [store characteristic 2], [store characteristic 3].Founded in
                [year] by [founder name], Intelligent Symptomate has come a long
                way from its beginnings in [starting location]. When [founder
                name] first started out, [his/her/their] passion for [brand
                message - e.g. "eco-friendly cleaning products"]drove them to
                start their own business.We hope you enjoy our products as much
                as we enjoy offering them to you. If you have any questions or
                comments, please don't hesitate to contact us. Sincerely,
                [founder name]
              </p>
            </div>
          </div>
        </div>
      </MobileView>
    </div>
  )
}
