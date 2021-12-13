import React, { useEffect } from 'react'
import '../../styles.css'
import { Button, Alert, Overlay, Tooltip, Modal } from 'react-bootstrap'
import { BrowserView, MobileView } from 'react-device-detect'
import axios from 'axios'
import Header from '../Navbar/header'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ChangePassword () {
  const [show, setShow] = React.useState(false)
  const target = React.useRef(null)

  const [fname, setname] = React.useState('')
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [msg, setMsg] = React.useState('')
  const [image, setImage] = React.useState('')
  var history = useHistory()
  var location = useLocation()
  const [showResults, setShowResults] = React.useState(false)

  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('/users/editprofile/changeusername')
    }
  }, [location, history])

  const [isOpen, setIsOpen] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  function handleSubmit (event) {
    // event.preventDefault()
    const data = {
      name: fname
    }

    axios
      .post('http://localhost:9000/users/editprofile/changeusername', data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res)
        if (res.data.success) {
          history.push({
            pathname: '/editprofile',
            state: {
              user: user,
              token: token
            }
          })
        } else {
          showResults(true)
          setMsg(res.data.message)
          setShowResults(true)
        }
      })
  }

  function validateForm () {
    return fname.length > 0
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
              paddingTop: '5%',
              paddingBottom: '5%',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff',
                padding: '7%',
                textAlign: 'center'
              }}
            >
              <h5>Change Name</h5>
              <p>{msg}</p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <form onSubmit={handleSubmit}>
                  <input
                    ref={target}
                    onFocus={() => setShow(!show)}
                    type='text'
                    className='fname'
                    name='fname'
                    placeholder='Enter your Name'
                    onChange={e => setname(e.target.value)}
                  />
                  <Overlay
                    target={target.current}
                    show={show}
                    placement='right'
                  >
                    {props => (
                      <Tooltip id='overlay-example' {...props}>
                        Please enter you name here to enable button.
                      </Tooltip>
                    )}
                  </Overlay>

                  {showResults === false ? (
                    <div></div>
                  ) : (
                    <Alert variant='danger'>Something went wrong</Alert>
                  )}
                </form>

                <Button
                  size='lg'
                  style={{ color: '#0c0530' }}
                  variant='warning'
                  type='submit'
                  onClick={openModal}
                  disabled={!validateForm()}
                >
                  Change
                </Button>
              </div>
            </div>
          </div>
        </BrowserView>
        <div>
          <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header>
              <Modal.Title>
                Your Username has been changed Successfully
              </Modal.Title>
            </Modal.Header>

            {/* <Modal.Body>
              <p>
                Are you sure to accept <b>All Terms and Conditions</b>.
              </p>
            </Modal.Body> */}

            <Modal.Footer>
              {/* <Button variant='secondary' onClick={closeModal}>
                Close
              </Button> */}
              <Button
                variant='primary'
                onClick={() => {
                  closeModal()
                  handleSubmit()
                }}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

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
                padding: '7%'
              }}
            >
              <h5>Change name</h5>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}
              >
                <form>
                  <input
                    type='text'
                    className='fname'
                    name='fname'
                    placeholder='Your name..'
                    onChange={e => setname(e.target.value)}
                  />

                  {showResults ? <Alert variant='danger'>Error</Alert> : ''}

                  <Button
                    href='/editprofile'
                    className='bsubmit'
                    variant='warning'
                    disabled={!validateForm()}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </MobileView>
      </div>
    </div>
  )
}
