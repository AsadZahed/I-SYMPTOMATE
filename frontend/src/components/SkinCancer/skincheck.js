import React, { useEffect } from 'react'
import axios from 'axios'
import Header from '../Navbar/header'
import { Progress } from 'antd'
import 'antd/dist/antd.css'

import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'

import { Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function SkinCheck () {
  const [state, setState] = React.useState({
    suggestions: [],
    text: ''
  })
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  var history = useHistory()
  var location = useLocation()
  const [cancer, setCancer] = React.useState([])
  const [scancer, setSCancer] = React.useState(null)
  const [img, setImg] = React.useState(null)
  const fileInput = React.createRef()
  const [scan, setScan] = React.useState(null)
  const [mess, setMess] = React.useState('')
  const [image, setImage] = React.useState('')
  const [show, setShow] = React.useState(false)

  const listCancer = [
    ' Actinic keratoses',
    'Basal cell carcinoma',
    'Benign keratosis-like lesions',
    'Dermatofibroma',
    'Melanocytic nevi',
    'Melanoma',
    'Vascular lesions'
  ]
  useEffect(() => {
    if (location.state) {
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setShow(location.state.show)
      setCancer(cancer)
      setImg(img)
      console.log('cancer is ', scancer)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('/skin/skincheck')
    }
  }, [location, history])

  const mySubmitHandler = event => {
    setMess('I-Symptomate is finding the disease!')
    event.preventDefault()
    const data = new FormData()
    data.append('file', fileInput.current.files[0])
    axios
      .post('http://localhost:5000/classify', data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
      })
      .then(res => {
        const i = res.data.label[0]
        const t = listCancer[i]
        //alert(JSON.stringify(res.data))
        // setCancer(t)
        setCancer(oldArray => [...oldArray,t])
        console.log(listCancer[i])
        console.log('I cant print anything')
        // console.log(cancer)
        setMess('')
      })

    //     event.preventDefault();
    //     console.log("i came here")
    //     //let image = "http://localhost:9000/images/1.jpg";
    //     const image = document.getElementById('exampleFormControlFile1');
    //     const SKIN_CLASSES = ["nv","bg","d","e","f","h","i"]
    //     const model = await tf.loadLayersModel('http://localhost:9000/tfjs_model/model.json');
    //    // const model = await tf.loadLayersModel('/tfjs_model/model.json');
    //    let tensor = tf.browser.fromPixels(image)
    //     .resizeNearestNeighbor([224,224])
    //     .toFloat();
    //     let offset = tf.scalar(127.5);
    //     tensor = tensor.sub(offset)
    //     .div(offset)
    //     .expandDims();
    //     let predictions = await model.predict(tensor).data();
    // 	let top5 = Array.from(predictions)
    // 	.map(function (p, i) { // this is Array.map
    // 		return {
    // 			probability: p,
    // 			className: SKIN_CLASSES[i] // we are selecting the value from the obj
    // 		};

    // 	}).sort(function (a, b) {
    // 		return b.probability - a.probability;

    // 	}).slice(0, 3);
    //     console.log("Loaded")
    console.log(scan ? `http://localhost:9000/${scan.filename}` : '')
    var t = scan ? `http://localhost:9000/${scan.filename}` : ''
    setImg(t)
    console.log('submit clicked')
  }
  const handleChange = event => {
    event.preventDefault()
    const data = new FormData()
    data.append('file', fileInput.current.files[0])
    axios
      .post('http://localhost:9000/skin/skincancer', data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
      })
      .then(res => {
        //alert(JSON.stringify(res.data))
        setScan(res.data)
        console.log(scan)
      })
  }
  const validate = () => {
    // return cancer.length > 0;
  }

  return (
    <div>
      <Header token={token} user={user} image={image} />

      <div style={{ backgroundColor: '#F8F8F8' }}>
        <div
          style={{
            paddingLeft: '12%',
            paddingRight: '12%',
            paddingTop: '2%',
            paddingBottom: '5%',
            textAlign: 'center'
          }}
        >
          <div>
            <Progress percent={75} status='active' />
          </div>
          <div
            style={{
              border: '1px solid #DCDCDC',
              backgroundColor: '#fff',
              padding: '5%'
            }}
          >
            <h2>Predict Your Disease Here!</h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* <input id='scan' type='file' ref={fileInput} accept="image/*" onChange={handleChange} />
                        <img src={scan ? `http://localhost:9000/${scan.filename}` : ''} alt='Skin Cancer Scan' className='scan' /> */}
              <form>
                 <div className='float-container' style={{border:"1px solid black"}}>
                    <div className='float-child'>
                      <input
                        type='file'
                        ref={fileInput}
                        accept='image/*'
                        onChange={handleChange}
                        name="Select Skin Image"
                        className='form-control-file'
                        // class='form-control-file'
                        // id='exampleFormControlFile1'
                      />
                    </div>
                    <div className='float-child'>
                      <img
                        src={
                          scan ? `http://localhost:9000/${scan.filename}` : ''
                        }
                        alt='Skin Cancer Scan'
                        style={{ height: '150px', width: '200px' }}
                      />
                    </div>
                  </div>
               </form>
              <form>
                <Button
                  type='submit'
                  style={{
                    marginTop: '10%',
                    marginBottom: '10%'
                  }}
                  onClick={mySubmitHandler}
                  variant='warning'
                >
                  Get Instant result !
                </Button>
              </form>
              <div
                style={{
                  padding: '3%',
                  color: '#282c34',
                  border:"1px solid black",
                }}
              >
                <p
                  style={{
                    fontSize: '30px',
                    fontWeight: '500',
                    textDecoration: 'underline'
                  }}
                >
                  Predicted Result:{mess}
                </p>
                <ul>
                  <li>
                    <h2>{scan ? cancer[0] : ' '}</h2>
                  </li>
                </ul>
              </div>
              {/* <div>
                                <h1> Predicted Result:  </h1>
                            </div> */}
              {show === true ? (
                <Button
                  type='submit'
                  variant='warning'
                  // disabled={!validate()}
                  onClick={mySubmitHandler}
                  style={{
                    marginTop: '4%',
                    //marginBottom:"10%",
                    color: 'black'
                  }}
                >
                  <Link
                    style={{ color: 'black', fontWeight: 'bold' }}
                    to={{
                      pathname: '/reports/viewreports',
                      state: {
                        token: token,
                        user: user,
                        data: cancer,
                        img: img
                      }
                    }}
                    style={{
                      //marginTop:"5%",
                      //marginBottom:"10%",
                      color: 'black'
                    }}
                  >
                    Get report
                  </Link>
                </Button>
              ) : (
                <Alert
                  variant='danger'
                  style={{ fontSize: '20px', textAlign: 'center' }}
                >
                  <b>
                    Because you are diagnosing someone's disease that's why no
                    report generation is available
                  </b>
                </Alert>
              )}{' '}
              {/* <Button type="submit" disabled>Get Reports</Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkinCheck
