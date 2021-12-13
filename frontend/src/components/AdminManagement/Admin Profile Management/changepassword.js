import React, { useEffect } from 'react'
import '../../../styles.css';
import { Button, Alert, Modal } from 'react-bootstrap'
import { BrowserView, MobileView } from 'react-device-detect'
import axios from 'axios'
import Header from '../../Navbar/Aheader'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'

export default function ChangePassword () {
  const [oldpassword, setoldpassword] = React.useState('')
  const [newpassword, setnewpassword] = React.useState('')
  const [cpassword, setcpassword] = React.useState('')
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [msg, setMsg] = React.useState('')
  var history = useHistory()
  var location = useLocation()
  const [showResults, setShowResults] = React.useState(false)
  const [image, setImage] = React.useState()

  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('/users/admin/editprofile/changepassword')
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
    //event.preventDefault()
    const data = {
      oldpassword: oldpassword,
      newpassword: newpassword
    }

    axios
      .post('http://localhost:9000/users/editprofile/changepassword', data, {
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
            pathname: '/admin/editprofile',
            state: {
              user: user,
              token: token
            }
          })
        } else {
          setMsg(res.data.message)
          setShowResults(true)
        }
      })
  }

  function validateForm () {
    return (
      oldpassword.length > 0 &&
      newpassword.length > 0 &&
      cpassword.length > 0 &&
      newpassword === cpassword
    )
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
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <h2 style={{ alignContent: 'center' }}>Change Password</h2>

                <form onSubmit={handleSubmit}>
                  <input
                    type='password'
                    className='fname'
                    name='opassword'
                    placeholder='Your old password..'
                    onChange={e => setoldpassword(e.target.value)}
                  />

                  <input
                    type='password'
                    className='fname'
                    name='npassword'
                    placeholder='Your new password..'
                    onChange={e => setnewpassword(e.target.value)}
                  />

                  <input
                    type='password'
                    className='fname'
                    name='cnpassword'
                    placeholder='Confirm new password..'
                    onChange={e => setcpassword(e.target.value)}
                  />
                  <div style={{ alignContent: 'center' }}>
                    {showResults ? (
                      <Alert variant='danger'>Something went wrong</Alert>
                    ) : (
                      ''
                    )}
                  </div>
                </form>
              </div>
              <div style={{marginLeft:"45%"}}>
                <Button
                  size='lg'
                  type='submit'
                  style={{ color: '#0c0530' }}
                  variant='warning'
                  disabled={!validateForm()}
                  onClick={openModal}
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
              <h5>Change username</h5>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}
              >
                <form>
                  <input
                    type='password'
                    className='fname'
                    name='opassword'
                    placeholder='Your old password..'
                    onChange={e => setoldpassword(e.target.value)}
                  />

                  <input
                    type='password'
                    className='fname'
                    name='npassword'
                    placeholder='Your new password..'
                    onChange={e => setnewpassword(e.target.value)}
                  />

                  <input
                    type='password'
                    className='fname'
                    name='cnpassword'
                    placeholder='Confirm new password..'
                    onChange={e => setcpassword(e.target.value)}
                  />
                  {showResults ? (
                    <Alert variant='danger'>
                      Incoorect username or password
                    </Alert>
                  ) : (
                    ''
                  )}

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
