import React, { useState, useEffect, useReducer, useCallback } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import diseasesList from './diseasesList.js'
import symptomsList from './symptomsList.js'
import { Link } from 'react-router-dom'
import diseases_recorded_symptoms from './recorded_symptoms_diseases'
import Table from 'react-bootstrap/Table'
import './App.css'
import '../../styles.css'
import { Button, Modal,ListGroup } from 'react-bootstrap'
import { Progress } from 'antd'
import 'antd/dist/antd.css'
import Header from '../Navbar/header'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserView, MobileView } from 'react-device-detect'

export default function AutoCompletedText () {
  const symptomList = [
    'itching',
    'skin_rash',
    'nodal_skin_eruptions',
    'continuous_sneezing',
    'shivering',
    'chills',
    'joint_pain',
    'stomach_pain',
    'acidity',
    'ulcers_on_tongue',
    'muscle_wasting',
    'vomiting',
    'burning_micturition',
    'spotting_ urination',
    'fatigue',
    'weight_gain',
    'anxiety',
    'cold_hands_and_feets',
    'mood_swings',
    'weight_loss',
    'restlessness',
    'lethargy',
    'patches_in_throat',
    'irregular_sugar_level',
    'cough',
    'high_fever',
    'sunken_eyes',
    'breathlessness',
    'sweating',
    'dehydration',
    'indigestion',
    'headache',
    'yellowish_skin',
    'dark_urine',
    'nausea',
    'loss_of_appetite',
    'pain_behind_the_eyes',
    'back_pain',
    'constipation',
    'abdominal_pain',
    'diarrhoea',
    'mild_fever',
    'yellow_urine',
    'yellowing_of_eyes',
    'acute_liver_failure',
    'fluid_overload',
    'swelling_of_stomach',
    'swelled_lymph_nodes',
    'malaise',
    'blurred_and_distorted_vision',
    'phlegm',
    'throat_irritation',
    'redness_of_eyes',
    'sinus_pressure',
    'runny_nose',
    'congestion',
    'chest_pain',
    'weakness_in_limbs',
    'fast_heart_rate',
    'pain_during_bowel_movements',
    'pain_in_anal_region',
    'bloody_stool',
    'irritation_in_anus',
    'neck_pain',
    'dizziness',
    'cramps',
    'bruising',
    'obesity',
    'swollen_legs',
    'swollen_blood_vessels',
    'puffy_face_and_eyes',
    'enlarged_thyroid',
    'brittle_nails',
    'swollen_extremeties',
    'excessive_hunger',
    'extra_marital_contacts',
    'drying_and_tingling_lips',
    'slurred_speech',
    'knee_pain',
    'hip_joint_pain',
    'muscle_weakness',
    'stiff_neck',
    'swelling_joints',
    'movement_stiffness',
    'spinning_movements',
    'loss_of_balance',
    'unsteadiness',
    'weakness_of_one_body_side',
    'loss_of_smell',
    'bladder_discomfort',
    'foul_smell_of urine',
    'continuous_feel_of_urine',
    'passage_of_gases',
    'internal_itching',
    'toxic_look_(typhos)',
    'depression',
    'irritability',
    'muscle_pain',
    'altered_sensorium',
    'red_spots_over_body',
    'belly_pain',
    'abnormal_menstruation',
    'dischromic _patches',
    'watering_from_eyes',
    'increased_appetite',
    'polyuria',
    'family_history',
    'mucoid_sputum',
    'rusty_sputum',
    'lack_of_concentration',
    'visual_disturbances',
    'receiving_blood_transfusion',
    'receiving_unsterile_injections',
    'coma',
    'stomach_bleeding',
    'distention_of_abdomen',
    'history_of_alcohol_consumption',
    'fluid_overload.1',
    'blood_in_sputum',
    'prominent_veins_on_calf',
    'palpitations',
    'painful_walking',
    'pus_filled_pimples',
    'blackheads',
    'scurring',
    'skin_peeling',
    'silver_like_dusting',
    'small_dents_in_nails',
    'inflammatory_nails',
    'blister',
    'red_sore_around_nose',
    'yellow_crust_ooze'
  ]
  const diseaseList = [
    '(vertigo) Paroymsal  Positional Vertigo',
    'AIDS',
    'Acne',
    'Alcoholic hepatitis',
    'Allergy',
    'Arthritis',
    'Bronchial Asthma',
    'Cervical spondylosis',
    'Chicken pox',
    'Chronic cholestasis',
    'Common Cold',
    'Dengue',
    'Diabetes ',
    'Dimorphic hemmorhoids(piles)',
    'Drug Reaction',
    'Fungal infection',
    'GERD',
    'Gastroenteritis',
    'Heart attack',
    'Hepatitis B',
    'Hepatitis C',
    'Hepatitis D',
    'Hepatitis E',
    'Hypertension',
    'Hyperthyroidism',
    'Hypoglycemia',
    'Hypothyroidism',
    'Impetigo',
    'Jaundice',
    'Malaria',
    'Migraine',
    'Osteoarthristis',
    'Paralysis (brain hemorrhage)',
    'Peptic ulcer diseae',
    'Pneumonia',
    'Psoriasis',
    'Tuberculosis',
    'Typhoid',
    'Urinary tract infection',
    'Varicose veins',
    'hepatitis A'
  ]

  
  const [state, setState] = React.useState({
    suggestions: [],
    text: ''
  })
  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
  var history = useHistory()
  var location = useLocation()
  const [data, setData] = React.useState('')
  const [items, setItems] = React.useState([])
  const [detectedDisease, setdetectedDisease] = React.useState([])
  const [cancer, setCancer] = React.useState('')
  const [mess, setMess] = React.useState('')
  const [id, setId] = React.useState([])
  const [image, setImage] = React.useState('')
  const [show, setShow] = React.useState(false)

  const [isOpen, setIsOpen] = React.useState(false)


  const [showNext, setShowNext] = React.useState(false)

  const [isOpenNext, setIsOpenNext] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  
  const openModalNext = () => {
    setIsOpenNext(true)
    mySubmitHandler()
  }
  const closeModalNext = () => {
    setIsOpenNext(false)
  }
  const handlersymps = () => {
    setId([])
    setItems([])
  }
  useEffect(() => {
    if (location.state) {
      let isMounted = true
      console.log(location)
      setUser(location.state.user)
      setToken(location.state.token)
      setShow(location.state.show)
      setImage('http://localhost:9000/' + location.state.user.pathprofilepic)
    } else {
      history.push('/symptoms/symptomsearch')
    }
  }, [location, history, detectedDisease,items])

  const onTextChange = e => {
    const value = e.target.value
    let suggestions = []
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i')
      suggestions = symptomsList.sort().filter(v => regex.test(v))
      console.log(suggestions)
    }
    setState(() => ({
      suggestions,
      text: value
    }))
    setData(suggestions)
  }

  const mySubmitHandler = async () => {
    setMess('I-Symptomate is finding the Disease!')
    console.log('LILILILILILIK')
    console.log(id)
    console.log('LILILILILILIK')
    setdetectedDisease([])
    var li = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
    id.map((item, index) => {
      li[item] = 1
    })
  
    const data = { symptoms: li }
    var res_disease_list
    var t
    console.log(li)
    var myobj = {}
    await axios
      .post('http://localhost:5000/classifysymptoms', data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
      })
      .then(res => {
        var i = res.data.label[0]
        res_disease_list = res.data.diseases_list
        var t = diseaseList[i]
        setCancer(t)
        console.log('==diseaseslist responce==')
        res_disease_list.forEach((dis, i) =>
          setdetectedDisease(oldArray => [...oldArray, diseaseList[dis]])
        )
        console.log(diseasesList[i])
        console.log(cancer)
        console.log('==diseaseslist responce==')
        console.log('ttttt')
        console.log(cancer)
        console.log('ttttt')
        setMess('')
      })
    
  }
  function selectedText (value, index) {
    if (
      items.find(function (element) {
        return value == element
      })
    ) {
      console.log('Item already in list')
    } else {
     
      setItems([...items, value])
      setId([...id, symptomList.indexOf(value)])
    }

    setState(() => ({
      text: value,
      suggestions: []
    }))
  }

  function addItem (value) {}

  function deleteItem (id) {
    console.log('==========id===>')
    console.log(id)
    const updatedList = items.filter((item, idi) => idi !== id)
    setItems([...updatedList])
    console.log(updatedList)
    console.log("=============id===========")
  }
  const validated = () => {
    return items.length > 0
  }

  const renderSuggestions = () => {
    let { suggestions } = state
    if (suggestions.length === 0) {
      return null
    }
    return (
      <Table striped bordered hover>
        <tbody>
          {suggestions.map((item, index) => (
<div>
<ListGroup >
<ListGroup.Item  action onClick={() =>selectedText(item, index)}> {item.replace(/_/gi," ").toUpperCase()}</ListGroup.Item>
</ListGroup>
            </div>
          ))} 
        </tbody>
      </Table>
    )
  }
  const { text, suggestions } = state
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
              <Progress percent={80} status='active' />
            </div>
            
            <div
              className='float-container-mobile '
              style={{
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff'
                //padding: "7%"
              }}
            >    
              <div
                classsName='float-child block-example border-bottom border-dark'
                style={{ marginLeft: '19%' }}
              >
                <Button
                      variant='primary'
                      onClick={openModal}
                      style={{ borderRadius: '10%',marginLeft:"90%" }}
                    >
                      Help
                    </Button>
                <div
                  id='notebooks'
                  style={{
                    padding: '1%',
                    margin: '5%',
                    width: '35vw',
                    overflow: 'scroll',
                    height: '14%'
                  }}
                >
                  <h2 style={{ textAlign: 'left', padding: '2%' }}>
                    
                    Search Symptoms
                  </h2>
                  <input
                    id='query'
                    type='text'
                    placeholder='Enter Symptoms'
                    onChange={onTextChange}
                    value={text}
                  />
                  <div>
                    {renderSuggestions()}
                    
                  </div>
                </div>
                <div>
                  <Modal show={isOpen} onHide={closeModal}>
                    <Modal.Header>
                      <Modal.Title>Symptomate Search Help</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <ul>
                        <li>Start typing the symptom in search box</li>
                        <li>Select the suggested symptoms from the list.</li>
                        <li>Click on the Add button.</li>
                        <li>Add more symtpoms if you want.</li>
                      </ul>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button variant='secondary' onClick={closeModal}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              <div classsName='float-child' style={{ paddingTop: '5%' }}>
                <h1>Selected Diseases are:</h1>
                <div
                  style={{
                    border: '1px solid #DCDCDC',
                    backgroundColor: '#f8f8f8',
                    padding: '2%'
                  }}
                >
                 
                  {items.map((item, index) => {
                    return (
                                     
                         <ListGroup horizontal>
                            <ListGroup.Item  action onClick={() => deleteItem(index)}>{item.replace(/_/gi," ").toUpperCase()}
                            
                          </ListGroup.Item>
                          <ListGroup.Item action onClick={() => deleteItem(index)}>Delete</ListGroup.Item>
                          </ListGroup>
                     
                    )
                  })}
                </div>
                
              </div>
              
              <Modal show={isOpenNext} onHide={closeModalNext}>
                    <Modal.Header>
                      <Modal.Title>Move to next Section!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <h5>Are you sure you want to move to next Section?</h5>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button variant='secondary' onClick={closeModalNext}>
                        Close
                      </Button>
                      <Button
                  type='submit'
                  variant='warning'
                   onClick={handlersymps}
                >
                  <Link
                    to={{
                      pathname: '/symptoms/sympcheck',
                      state: {
                        token: token,
                        user: user,
                        cancer: cancer,
                        disease: detectedDisease,
                        symli:items
                      }
                    }}
                    style={{ color: 'black' }}
                  >
                    { console.log('SymptomList')}
                    { console.log(items)}
                    { console.log('SymptomList')}

                    Next
                  </Link>
                </Button>
                    </Modal.Footer>
                  </Modal>
              <div className='right-group'>
                <Button
                  type='submit'
                  variant='warning'
                  onClick={openModalNext}
                  disabled={!validated()}
                  style={{marginTop:"5%"}}
                >
                  Move to Next Section!
                </Button>
                
              </div>
            </div>
          </div>
        </BrowserView>

        <MobileView>
          <div
            style={{
              padding: '3%'
            }}
          >
            <div
              className='float-container-mobile '
              style={{
                border: '1px solid #DCDCDC',
                backgroundColor: '#fff'
              }}
            >
              <div classsName='float-child block-example border-bottom border-dark'>
                <div id='notebooks-mobile' style={{ padding: '5%' }}>
                  <h2>Search Diseases</h2>
                  <input
                    id='query'
                    type='text'
                    onChange={onTextChange}
                    value={text}
                  />
                  <div>
                    <Button onClick={addItem} variant='warning' style={{margin:"auto"}}>
                      Add
                    </Button>
                    {renderSuggestions()}
                    <Button>Suggestions: {suggestions.length}</Button>
                  </div>
                </div>
              </div>
              <div classsName='float-child' style={{ paddingTop: '50%' }}>
                <div>
                  {items.map(data => {
                    return (
                      <div>
                        <h1>Selected Diseases are</h1>
                        <h1>{data}</h1>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='right-group'>
                <Button
                  type='submit'
                  variant='warning'
                  onClick={mySubmitHandler}
                >
                  <Link
                    to={{
                      pathname: '/reports/viewreports',
                      state: {
                        token: token,
                        user: user,
                        cancer: cancer
                      }
                    }}
                  >
                    Get report
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </MobileView>
      </div>
    </div>
  )
}
