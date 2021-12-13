import React, { useEffect } from 'react'
import '../../../styles.css'
import { Button, Alert, Modal } from 'react-bootstrap'
import { BrowserView, MobileView } from 'react-device-detect'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from '../../Navbar/Aheader'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function SendNotification () {
  const [fname, setname] = React.useState('')
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [msg, setMsg] = React.useState('')
  const [userid, setUserID] = React.useState()
  var history = useHistory()
  var location = useLocation()
  const [showResults, setShowResults] = React.useState(false)
  var myid = '';

  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setUserID(location.state)
      myid = location.state.user_id;
      console.log('ID IS :  ', location.state.user_id)
      console.log(myid)
    } else {
      history.push('/addinfo/sendNotification')
    }
  }, [])

  const [isOpen, setIsOpen] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  function handleSubmit (event) {
    event.preventDefault()
     console.log("i am inside handelsubmit", myid)
    const data = {
      name: fname,
      p_id: myid
    }
    console.log("data is   ",data);

    axios.post('http://localhost:9000/addinfo/sendNotification', data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log("i am here after axios")
        console.log(res)
        if (res.data.success) {
          history.push({
            pathname: '/addinfo/sendNotification',
            state: {
              user: user,
              token: token
            }
          })
        } 
      })
  }

  function validateForm () {
    return fname.length > 0
  }
  return (
    <div>
      <Header token={token} user={user} />

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
              <h5>Send Notification</h5>
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
                    type='text'
                    className='fname'
                    name='fname'
                    placeholder={myid}
                    onChange={e => setname(e.target.value)}
                  />

                  {showResults === false ? (
                    <div></div>
                  ) : (
                    <Alert variant='danger'>Something went wrong</Alert>
                  )}
                   <Button
                  size='lg'
                  style={{ color: '#0c0530' }}
                  variant='warning'
                  type='submit'
                  disabled={!validateForm()}
                >
                  Change
                </Button>
                </form>

                {/* <RiLockPasswordFill size="40%" color="#0047b3" style={{ paddingTop: "3%" }} />
                  <br /> */}

               
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
