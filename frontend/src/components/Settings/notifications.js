import React, { useEffect } from 'react'
import '../../styles.css'
import Header from '../Navbar/header'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { Table } from 'react-bootstrap'
export default function Notification () {
  const [user, setUser] = React.useState(null)
  const [token, setToken] = React.useState(null)
  var history = useHistory()
  var location = useLocation()
  const [image, setImage] = React.useState('')
  const [message, setMessage] = React.useState([])
  
  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('/setting/notifications')
    }
  }, [location, history])

  useEffect(() => {
    if (location.state) {
        console.log(location.state.user)
       
        axios.get('http://localhost:9000/users/notifications', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${location.state.token}`
            }
        })
            .then(res => {
                if (res.data.success === false) {
                    console.log("error");
                }
                else {
                    console.log(res.data);
                    setMessage(res.data.name);
                    
                }
            })
    }
}, [location, token, user]);


  return (
    <div>
      <Header token={token} user={user} image={image} />

      <div style={{ backgroundColor: '#F8F8F8' }}>
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
            <h1>Recieved Notifications</h1>
            <div style={{ paddingLeft: '38%' }}>
              <Button>
                <a href='/' class='notification'>
                  <span>Inbox</span>
                  <span class='badge'>99+</span>
                </a>
              </Button>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {message.map((name, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{name.name}</td>
                        <td>
                        
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                {/* {check && <Button variant="link" onClick={hide}>Hide</Button>}

              {check !== true && <Button variant="link" onClick={show}>More</Button>} */}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
