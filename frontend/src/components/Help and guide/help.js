import React from 'react'

import { Button, Alert } from 'react-bootstrap'
import {
  COffcanvas,
  COffcanvasTitle,
  COffcanvasHeader,
  CCloseButton,
  COffcanvasBody,
  CButton
} from '@coreui/react'
import '../Login.css'
import Header from '../Navbar/header'

import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

import {
  AiFillSecurityScan,
  AiOutlineScan,
  AiOutlineArrowDown,
  AiOutlineArrowUp
} from 'react-icons/ai'
import { FaUserEdit } from 'react-icons/fa'
import { HiOutlineDocumentSearch, HiInformationCircle } from 'react-icons/hi'

export default function Help () {
  const [visible, setVisible] = React.useState(false)
  const [visible1, setVisible1] = React.useState(false)
  const [visible2, setVisible2] = React.useState(false)
  const [visible3, setVisible3] = React.useState(false)
  const [visible4, setVisible4] = React.useState(false)

  const [user, setUser] = React.useState(null)
  const [token, setToken] = React.useState(null)

  const [image, setImage] = React.useState('')
  var history = useHistory()
  var location = useLocation()

  React.useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('/admin/privlages')
    }
  }, [location, history])

  return (
    <div>
      <div style={{ backgroundColor: '#F8F8F8' }}>
        <Header token={token} user={user} image={image} />
        <div
          style={{
            paddingLeft: '12%',
            paddingRight: '12%',
            paddingTop: '5%',
            paddingBottom: '5%'
          }}
        >
          <COffcanvas
            placement='start'
            visible={visible || visible1 || visible2 || visible3 || visible4}
            onHide={() => {
              setVisible(false)
              setVisible1(false)
              setVisible2(false)
              setVisible3(false)
              setVisible4(false)
            }}
          >
            <COffcanvasHeader>
              <COffcanvasTitle>
                <h1 style={{ fontWeight: 'bold' }}>Help</h1>
              </COffcanvasTitle>
              <CCloseButton
                className='text-reset'
                onClick={() => {
                  setVisible(false)
                  setVisible1(false)
                  setVisible2(false)
                  setVisible3(false)
                  setVisible4(false)
                }}
              />
            </COffcanvasHeader>
            <COffcanvasBody>
              {visible ? (
                <div>
                  <p>
                    This section contains the path to check you disease by
                    giving symptoms and so on
                  </p>
                  <Link
                    style={{ color: '#0c0530' }}
                    to={{
                      pathname: '/symptoms/introduction',
                      state: {
                        token: token,
                        user: user
                      }
                    }}
                  >
                    <AiFillSecurityScan
                      size='30%'
                      color='#0047b3'
                      style={{ paddingTop: '3%' }}
                    />
                  </Link>
                </div>
              ) : (
                ''
              )}
              {visible1 ? (
                <div>
                  <p>
                    {' '}
                    This section contains the path to check you disease by
                    giving image of skin and so on
                  </p>
                  <Link
                    style={{ color: '#0c0530' }}
                    to={{
                      pathname: '/skin/skinintroduction',
                      state: {
                        token: token,
                        user: user
                      }
                    }}
                  >
                    <AiFillSecurityScan
                      size='30%'
                      color='#0047b3'
                      style={{ paddingTop: '3%' }}
                    />
                  </Link>
                </div>
              ) : (
                ''
              )}
              {visible2 ? (
                <div>
                  <p>
                    This section contains the path to check your reports and so
                    on
                  </p>

                  <Link
                    style={{ color: '#0c0530' }}
                    to={{
                      pathname: '/reports/view',
                      state: {
                        token: token,
                        user: user
                      }
                    }}
                  >
                    <HiOutlineDocumentSearch size='30%' color='#0047b3' />
                  </Link>
                </div>
              ) : (
                ''
              )}
              {visible3 ? (
                <div>
                  <p>
                    {' '}
                    This section contains the path to check you information
                    about all diseases and so on
                  </p>

                  <Link
                    style={{ color: '#0c0530' }}
                    to={{
                      pathname: '/addinfo/conditionlibrary',
                      state: {
                        token: token,
                        user: user
                      }
                    }}
                  >
                    <HiInformationCircle
                      size='30%'
                      color='#0047b3'
                      text='Scam'
                    />
                  </Link>
                </div>
              ) : (
                ''
              )}
              {visible4 ? (
                <div>
                  Content for the offcanvas goes here. You can place just about
                  any Bootstrap component or custom elements here.
                  <Link
                    style={{ color: '#0c0530' }}
                    to={{
                      pathname: '/editprofile',
                      state: {
                        token: token,
                        user: user
                      }
                    }}
                  >
                    <FaUserEdit size='30%' color='#0047b3' text='Scam' />
                  </Link>
                </div>
              ) : (
                ''
              )}
            </COffcanvasBody>
          </COffcanvas>

          <div
            style={{
              border: '1px solid #DCDCDC',
              backgroundColor: '#fff',
              padding: '7%'
            }}
          >
            <h1>Help</h1>

            <div
              style={{
                textAlign: 'left',
                border: '1px solid #DCDCDC'
              }}
            >
              <div style={{ padding: '3%' }}>
                <Button
                  style={{ color: '#0047b3', textDecoration: 'none' }}
                  variant='outline-light'
                  onClick={() => {
                    setVisible(true)
                    setVisible1(false)
                    setVisible2(false)
                    setVisible3(false)
                    setVisible4(false)
                  }}
                >
                  <h5 style={{ color: '#0047b3', textDecoration: 'none' }}>
                    1- If you wanted to go for{' '}
                    <b>SYMPTOMATE DISEASE DIAGNOSER</b>,
                    <br />
                  </h5>
                </Button>
              </div>

              <div style={{ padding: '3%' }}>
                <Button
                  style={{ color: '#0047b3', textDecoration: 'none' }}
                  variant='outline-light'
                  onClick={() => {
                    setVisible(false)
                    setVisible1(true)
                    setVisible2(false)
                    setVisible3(false)
                    setVisible4(false)
                  }}
                >
                  <h5 style={{ color: '#0047b3', textDecoration: 'none' }}>
                    2- If you wanted to go for <b>SKIN CANCER DIAGNOSER</b>,
                  </h5>
                </Button>
              </div>
              <div style={{ paddingTop: '1%', padding: '3%' }}>
                <Button
                  style={{ color: '#0047b3', textDecoration: 'none' }}
                  variant='outline-light'
                  onClick={() => {
                    setVisible(false)
                    setVisible1(false)
                    setVisible2(true)
                    setVisible3(false)
                    setVisible4(false)
                  }}
                >
                  <h5 style={{ color: '#0047b3', textDecoration: 'none' }}>
                    3- If you wanted to see your <b>REPORTS</b>,
                  </h5>
                </Button>
              </div>
              <div style={{ paddingTop: '1%', padding: '3%' }}>
                <Button
                  style={{ color: '#0047b3', textDecoration: 'none' }}
                  variant='outline-light'
                  onClick={() => {
                    setVisible(false)
                    setVisible1(false)
                    setVisible2(false)
                    setVisible3(true)
                    setVisible4(false)
                  }}
                >
                  <h5 style={{ color: '#0047b3', textDecoration: 'none' }}>
                    4- If you wanted to see <b>information of all DISEASES</b>,
                  </h5>
                </Button>
              </div>
              <div style={{ paddingTop: '1%', padding: '3%' }}>
                <Button
                  style={{ color: '#0047b3', textDecoration: 'none' }}
                  variant='outline-light'
                  onClick={() => {
                    setVisible(false)
                    setVisible1(false)
                    setVisible2(false)
                    setVisible3(false)
                    setVisible4(true)
                  }}
                >
                  <h5 style={{ color: '#0047b3', textDecoration: 'none' }}>
                    5- If you wanted to <b>EDIT YOUR PROFILE</b>,
                  </h5>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
