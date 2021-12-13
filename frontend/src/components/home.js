import React, { useEffect } from 'react'
//import { useMediaQuery } from "react-responsive";

//import HomeImage1 from "../components/images/newhome.PNG";
import HomeImage1 from '../components/images/home.png'

import ChatbotImg from '../components/images/chatbot-img.PNG'
import MoreInfoImg from '../components/images/more-info-img.PNG'
import Header from './Navbar/header'
import { Link } from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'
//import { Checkmark } from "react-checkmark";
import { BsArrowRight } from 'react-icons/bs'
import { Col, Row, Container } from '@kunukn/react-bootstrap-grid'
import { BrowserView, MobileView } from 'react-device-detect'
import ChatBotHelper from "../components/Chatbot/chatbot";

import '../styles.css'
//import uselocation
import { useHistory, useLocation } from 'react-router'
import { OmitProps } from 'antd/lib/transfer/ListBody'

function Home (props) {
  const location = useLocation()
  const history = useHistory()

  const [user, setUser] = React.useState()
  const [token, setToken] = React.useState()
  const [show, setShow] = React.useState(0)
  const [name, setName] = React.useState('')
  const [image, setImage] = React.useState('')

  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setName(location.state.user.name)
      setToken(location.state.token)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('./shomepage')
    }
  }, [history, location])

  setTimeout(() => {
    setShow(1)
  }, 3000)

  console.log('image is home ', image)

  return (
    <div>
      <Header user={user} token={token} image={image} />
      {/* <img src={image} alt='Profile Picture' style={{width:"10%",borderRadius:"40px"}} />
       */}
      <div style={{ backgroundColor: '#F8F8F8' }}>
        <div
          style={{
            paddingLeft: '12%',
            paddingRight: '12%',
            paddingTop: '1%'
          }}
        >
          {show !== 1 && (
            <Alert
              variant='success'
              style={{ fontSize: '20px', textAlign: 'center' }}
            >
              <b>Welcome {name}</b>
            </Alert>
          )}
          <BrowserView>
            <div
              style={{
                backgroundImage: `url(${HomeImage1})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                border: '1px solid #DCDCDC',
                backgroundColor: '#0047b3',
                height: '50%',
                width: '100%',
                paddingTop: '5%',
                borderRadius: '10px'
                // zIndex: -10
              }}
            >
              {/* <h1 style={{paddingTop:"5%", paddingRight:"50%", paddingLeft:"5%"}}>What concerns you about your health today?</h1> */}
              <div
                className='vertical-center'
                style={{
                  margin: '28% 0px 0px 15px',
                  padding: '0px 0px 10px 0px'
                }}
              >
                <div style={{ paddingBottom: '15%', paddingLeft: '10%' }}>
                  {/* <Button href="/option" className="homeButton" variant="warning">
                    Start Checkup
                  </Button> */}
                </div>
              </div>
              <ChatBotHelper token={token} user = {user}/>
            </div>
          </BrowserView>
        </div>
        <div>
          <MobileView>
            <div
              style={{
                backgroundImage: `url(${HomeImage1})`,
                backgroundSize: 'cover',
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff'
                // zIndex: -10
              }}
            >
              <div
                className='vertical-center'
                style={{
                  margin: '28% 0px 0px 15px',
                  padding: '0px 0px 10px 0px'
                }}
              >
                <Button href='/option' className='homeButton' variant='warning'>
                  Check Up
                </Button>
              </div>
            </div>
          </MobileView>
        </div>

        <div
          style={{
            paddingLeft: '12%',
            paddingRight: '12%',
            paddingTop: '5%'
          }}
        >
          <BrowserView>
            <div
              style={{
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff',
                padding: '4%',
                borderRadius: '10px',
                paddingBottom: '0%'
              }}
            >
                <Container>
                  <Row>
                    <Col sm={12} md={6}>
                      <div style={{ width: '100%' }}>
                        <h2 style={{ fontWeight: 'bold', fontSize: '3vw' }}>
                          Intelligent technology you can trust
                        </h2>
                        <h5 style={{ fontSize: '2vw' }}>
                          Symptomate AI uses our doctors’ knowledge, scientific
                          literature and statistical data culled from thousands
                          of patient cases.
                        </h5>
                        <Button
                          href='/addinfo/conditionlibrary'
                          className='homeButton'
                          variant='link'
                        >
                          <Link
                            to={{
                            //  pathname: '/addinfo/conditionlibrary',
                              state: {
                                token: props.token,
                                user: props.user,
                                image: props.image
                              }
                            }}
                          >
                            More info
                          </Link>{' '}
                          <BsArrowRight />
                        </Button>
                      </div>
                    </Col>
                    <Col sm={12} md={6}>
                      <div style={{ padding: '4%' }}>
                        <img
                          style={{ width: '70%' }}
                          src={MoreInfoImg}
                          alt='moreinfoimage'
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
             
            </div>
          </BrowserView>
        </div>
        <MobileView>
          <div
            style={{
              border: '1px solid #DCDCDC',
              backgroundColor: '#fff',
              padding: '7%'
            }}
          >
            <div className='float-container-mobile'>
              <div className='float-child'>
                <h2>Intelligent technology you can trust</h2>
                <p>
                  Symptomate AI uses our doctors’ knowledge, scientific
                  literature and statistical data culled from thousands of
                  patient cases.
                </p>
                <Button href='/moreinfo' className='homeButton' variant='link'>
                  more info <BsArrowRight />
                </Button>{' '}
              </div>
              <div className='float-child'>
                <img
                  className='more-info-img-styles-mobile'
                  src={MoreInfoImg}
                  alt='moreinfoimage'
                />
              </div>
            </div>
          </div>
        </MobileView>

        {/* PART 2 */}
        {/* 3RD PART */}
        {/* <div className="float-container">
        <div className="float-child">
          <h1 style={{ textAlign: "left" }}>
            Over 4 million people have already used Symptomate
          </h1>
          <div style={{ paddingLeft: "70px" }}>
            <Button href="/option" className="homeButton" variant="warning">
              Check Up
            </Button>{" "}
          </div>
        </div>
        <div className="float-child" style={{ backgroundColor: "#DCDCDC" }}>
          <h6>
            Accurate diagnosis. The app encouraged me to visit my doctor before
            it was too late. Thanks so much!
          </h6>
          <BeautyStars
            value={state}
            onChange={(value) => this.setState({ value })}
          />
        </div>
      </div> */}
        <div
          style={{
            paddingLeft: '12%',
            paddingRight: '12%',
            paddingTop: '5%',
            paddingBottom: '5%'
          }}
        >
          <BrowserView>
            <div
              className='chatbot-div-styles'
              style={{
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff',
                padding: '7%',
                borderRadius: '10px',
                paddingBottom: '4%'
              }}
            >
              <h2 style={{ fontWeight: 'bold' }}>Write Chat bot</h2>
              <h5>
                Symptomate can also conduct interviews via fast and friendly
                chat conversations*.
              </h5>
              <div href='/chatbot'>
                <h5>
                  <Button href='/chatbot' className='homeButton' variant='link'>
                    Begin Chat <BsArrowRight />
                  </Button>
                </h5>
                <p style={{ color: '#dcdcdc' }}>*English only</p>
                <div className='chatbot-img-styles'>
                  <img src={ChatbotImg} alt='ChatbotImage' />
                </div>
              </div>
            </div>
          </BrowserView>
        </div>

        <div>
          <MobileView>
            <div
              className='chatbot-div-styles'
              style={{
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff',
                padding: '7%'
              }}
            >
              <h2>Write Chat bot</h2>
              <p>
                Symptomate can also conduct interviews via fast and friendly
                chat conversations*.
              </p>
              <div href='/chatbot'>
                <h9>
                  <Button href='/chatbot' className='homeButton' variant='link'>
                    Begin Chat <BsArrowRight />
                  </Button>{' '}
                </h9>
                <p style={{ color: '#dcdcdc' }}>*English only</p>
                <div className='chatbot-img-styles'>
                  <img src={ChatbotImg} alt='ChatbotImage' />
                </div>
              </div>
            </div>
          </MobileView>
        </div>

        {/* 5th part */}

        {/* FOOTER */}
      </div>
    </div>
  )
}
export default Home
