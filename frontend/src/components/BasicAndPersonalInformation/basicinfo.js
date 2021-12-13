import React, { useEffect } from 'react'
import '../../styles.css'
import { Button, Alert, Overlay, Tooltip } from 'react-bootstrap'
import axios from 'axios'
import { BrowserView, MobileView } from 'react-device-detect'

import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'

import Header from '../Navbar/header'

export default function BasicInfo () {
  const [show, setShow] = React.useState(false)
  const target = React.useRef(null)

  const [gender, setgender] = React.useState('')
  const [age, setage] = React.useState(0)
  const [ages, setages] = React.useState(0)
  const [user, setUser] = React.useState(null)
  const [token, setToken] = React.useState(null)
  const [image, setImage] = React.useState('')
  var history = useHistory()
  var location = useLocation()
  const [showResults, setShowResults] = React.useState(false)

  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setages(location.state.user.age)
      setgender(location.state.user.gender)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('/')
    }
  }, [location, history])

  function handleSubmit (event) {
    event.preventDefault()
    const data = {
      age: age,
      gender: gender
    }

    axios
      .post('http://localhost:9000/addinfo/basicinfo', data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          history.push({
            pathname: '/',
            state: {
              user: user,
              token: token
            }
          })
        }
      })
      .catch(res => setShowResults(true))
  }

  function validateForm () {
    return age.length > 0 && age > 0 && age < 123
  }

  return (
    <div>
      <Header user={user} token={token} image={image} />

      <div style={{ backgroundColor: '#F8F8F8' }}>
        <BrowserView>
          <div
            style={{
              paddingLeft: '12%',
              paddingRight: '12%',
              paddingTop: '1%',
              paddingBottom: '5%',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff'
              }}
            >
              
              <h5 style={{ padding: '3%' }}>Basic Information</h5>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <form onSubmit={handleSubmit}>
                  <label className='f-label' for='age'>
                    Your age
                  </label>

                  <input
                    type='number'
                    className='fname'
                    name='age'
                    ref={target} 
                    onFocus={() => setShow(!show)}
                    onChange={e => setage(e.target.value)}
                    placeholder={ages + ' years'}
                  />

                  <label className='f-label' for='gender'>
                    Gender
                  </label>

                  <select
                    onChange={e => setgender(e.target.value)}
                    placeholder={gender}
                    className='fname'
                    id='country'
                    name='gender'
                  >
                    <option value='s'>Select</option>
                    <option onChange={e => setgender('male')} value='male'>
                      Male
                    </option>
                    <option onChange={e => setgender('female')} value='female'>
                      Female
                    </option>
                  </select>

                  {showResults ? <Alert variant='danger'>Incorrect</Alert> : ''}

                  <Button
                    block
                    size='lg'
                    style={{ color: '#0c0530' }}
                    variant='warning'
                    type='submit'
                    disabled={!validateForm()}
                    onFocus='disabled'
                  >
                    Add
                  </Button>
                </form>
              </div>

              <Overlay target={target.current} show={show} placement='right'>
                {props => (
                  <Tooltip id='overlay-example' {...props}>
                    Please add age between 12 years and 125 years.
                  </Tooltip>
                )}
              </Overlay>
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
              <h5>Basic information</h5>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '5%',

                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <form onSubmit={handleSubmit}>
                  <label className='f-label' for='age'>
                    Date of Birth
                  </label>

                  <input
                    type='date'
                    className='fname'
                    name='age'
                    onChange={e => setage(e.target.value)}
                  />

                  <label className='f-label' for='gender'>
                    Gender
                  </label>

                  <select className='fname' id='country' name='gender'>
                    <option
                      onChange={e => setgender(e.target.value)}
                      value='male'
                    >
                      Male
                    </option>
                    <option
                      onChange={e => setgender(e.target.value)}
                      value='female'
                    >
                      Female
                    </option>
                  </select>

                  <Button
                    block
                    size='lg'
                    type='submit'
                    disabled={!validateForm()}
                  >
                    Add
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
