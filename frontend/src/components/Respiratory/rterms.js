import React, { useEffect } from 'react'
import '../../styles.css'
import TermImg from '../../components/images/terms-img.PNG'

import { Progress } from 'antd'
import { BrowserView, MobileView } from 'react-device-detect'
import 'antd/dist/antd.css'
import Header from '../Navbar/header'
import { Form, Button, Modal, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row, Container } from '@kunukn/react-bootstrap-grid'

import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

export default function RTerms () {
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [image, setImage] = React.useState('')
  var history = useHistory()
  var location = useLocation()

  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('/respiratory/respiratoryterms')
    }
  }, [location, history])

  const [check, setCheck] = React.useState(true)
  const [check1, setCheck1] = React.useState(true)

  const [isOpen, setIsOpen] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <Header token={token} user={user} image={image} />

      <div style={{ backgroundColor: '#F8F8F8' }}>
        <BrowserView>
          <div
            style={{
              paddingLeft: '12%',
              paddingRight: '12%',
              paddingTop: '1%',
              paddingBottom: '5%'
            }}
          >
            <div>
              <Progress percent={25} status='active' />
            </div>
            <div
              className='float-container'
              style={{
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff',
                padding: '7%'
              }}
            >
              <Container>
                <Row>
                  <Col sm={12} md={6}>
                    <div className='float-child' style={{ fontSize: '16px' }}>
                      <h3 style={{ fontWeight: 'bold' }}>Terms of Service</h3>
                      <p>
                        Before using the checkup, please read Terms of Service.
                        Remember that:
                      </p>
                      <ul>
                        <li>
                          <p>
                            <b>Checkup is not a diagnosis</b>
                          </p>
                          <p>
                            Checkup is for informational purposes and is not a
                            qualified medical opinion
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Do not use in emergencies</b>
                          </p>
                          <p>
                            In case of health emergency, call your local
                            emergency number immediately.
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Your data is safe</b>
                          </p>
                          <p>
                            Information that you provide is anonymous and not
                            shared with anyone.
                          </p>
                        </li>
                      </ul>
                      {/* <ul style={{ paddingLeft: "5%" }}> */}
                      {/* <li> */}
                      <div
                      // style={{
                      //   border: "3px solid #f8f8f8",
                      //   display: "flex",
                      //   flexDirection: "row"
                      // }}
                      >
                        <Form>
                          <Modal show={isOpen} onHide={closeModal}>
                            <Modal.Header>
                              <Modal.Title>Check all terms</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              <p>
                                I read and accept Terms of Service and Privacy
                                Policy.
                              </p>
                            </Modal.Body>

                            <Modal.Footer>
                              <Button variant='secondary' onClick={closeModal}>
                                Close
                              </Button>
                              <Button
                                variant='primary'
                                onClick={() => {
                                  setCheck1(!check1)
                                  console.log(!check)
                                  closeModal()
                                }}
                              >
                                Yes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <div key={'checkbox'} className='mb-3'>
                            <div>
                              <Form.Check
                                type={'checkbox'}
                                id={`check-api-checkbox-1`}
                              >
                                <Form.Check.Input
                                  onChange={() => {
                                    setCheck(!check)
                                    console.log('check', !check)
                                  }}
                                  type={'checkbox'}
                                  onClick={openModal}
                                  style={{
                                    transform: 'scale(1.1)',
                                    marginTop: '6px'
                                  }}
                                />
                                <Form.Check.Label
                                  onChange={() => setCheck(!check)}
                                  onClick={openModal}
                                  style={{
                                    paddingLeft: '1%',
                                    fontSize: '20px',
                                    paddingBottom: '0%',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {!check === true ? (
                                    <p style={{ color: 'blue' }}>
                                      I allow to record symptoms
                                    </p>
                                  ) : (
                                    <p>I allow to record symptoms</p>
                                  )}
                                </Form.Check.Label>
                              </Form.Check>
                            </div>

                            <Form.Check
                              type={'checkbox'}
                              id={`check-api-checkbox-2`}
                            >
                              <div>
                                <Form.Check.Input
                                  type={'checkbox'}
                                  checked={!check1}
                                  onChange={() => {
                                    setCheck1(!check1)
                                  }}
                                  style={{
                                    transform: 'scale(1.1)',
                                    marginTop: '6px'
                                  }}
                                />
                                <Form.Check.Label
                                  onChange={() => setCheck1(true)}
                                  style={{
                                    paddingLeft: '1%',
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {!check1 === true ? (
                                    <p style={{ color: 'blue' }}>
                                      I allow to provide the data!
                                    </p>
                                  ) : (
                                    <p>I allow to provide the data</p>
                                  )}
                                </Form.Check.Label>
                              </div>
                            </Form.Check>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </Col>
                  <Col sm={0} md={6}>
                    <div className='float-child'>
                      <img src={TermImg} alt='introimage' />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div
              style={{
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff',
                textAlign: 'right',
                padding: '1%'
              }}
            >
              <div className='btn-toolbar'>
                <div className='left-group'>
                  <Button variant='link'>
                    <Link
                      to={{
                        pathname: '/skin/skinterms',
                        state: {
                          token: token,
                          user: user
                        }
                      }}
                    >
                      Back
                    </Link>
                  </Button>
                </div>
                <div className='right-group'>
                  <Button disabled={check || check1} variant='warning'>
                    <Link
                      style={{ color: 'black', fontWeight: 'bold' }}
                      to={{
                        pathname: '/respiratory/respiratoryforwhom',
                        state: {
                          token: token,
                          user: user
                        }
                      }}
                    >
                      Next
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </BrowserView>
        {/* <MobileView>
          <div
            style={{
              paddingTop: "3%"
            }}
          >
            <div>
              <Progress percent={20} status="active" />
            </div>
            <div
              className="float-container-mobile"
              style={{
                border: "1px solid #DCDCDC",
                backgroundColor: "#fff",
                padding: "7%"
              }}
            >
              <div className="float-child">
                <h3>Terms of Service</h3>
                <p>
                  Before using the checkup, please read Terms of Service. Remember
                  that:
              </p>
                <ul>
                  <li>
                    <p>
                      <b>Checkup is not a diagnosis</b>
                    </p>
                    <p>
                      Checkup is for informational purposes and is not a qualified
                      medical opinion
                  </p>
                  </li>
                  <li>
                    <p>
                      <b>Do not use in emergencies</b>
                    </p>
                    <p>
                      In case of health emergency, call your local emergency
                      number immediately.
                  </p>
                  </li>
                  <li>
                    <p>
                      <b>Your data is safe</b>
                    </p>
                    <p>
                      Information that you provide is anonymous and not shared
                      with anyone.
                  </p>
                  </li>
                </ul>
                <ul>
                  <li>
                    <div
                      style={{
                        border: "3px solid #f8f8f8",
                        display: "flex",
                        flexDirection: "row"
                      }}
                    >
                      <div className="float-child">
                        <input
                          type="checkbox"
                          onChange={() => setChecked1(!checked1)}
                        />
                      </div>{" "}
                      <div style={{ paddingLeft: "0px" }} className="float-child">
                        <p>Possible causes of your symptoms</p>
                      </div>
                    </div>
                    <div
                      style={{
                        border: "3px solid #f8f8f8",
                        display: "flex",
                        flexDirection: "row"
                      }}
                    >
                      <div className="float-child">
                        <input
                          type="checkbox"
                          onChange={() => setChecked2(!checked2)}
                        />
                        <p style={{ color: "red" }}>{error}</p>
                      </div>{" "}
                      <div className="float-child">
                        <p>Options for next steps </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="float-child">
                <img src={TermImg} alt="introimage" />
              </div>
            </div>
            <div
              style={{
                border: "1px solid #DCDCDC",
                backgroundColor: "#fff",
                textAlign: "right",
                padding: "3%"
              }}
            >
              <div className="btn-toolbar">
                <div className="left-group">
                  <Button href="/skin/skinintroduction" variant="link">
                    back
                </Button>
                </div>
                <div className="right-group">
                  <Button
                    href="/skin/skinforwhom"
                    disabled={checked1 || checked2}
                    variant="warning"
                  >
                    Next
                </Button>{" "}
                </div>
              </div>
            </div>
          </div>
        </MobileView> */}
      </div>
    </div>
  )
}
