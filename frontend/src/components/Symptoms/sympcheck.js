import React, { useState,useEffect } from "react";
import Header from "../Navbar/header";
import "../../styles.css";
import { Form, Button, Modal, Alert } from "react-bootstrap";

import axios from 'axios';
import { BrowserView, MobileView } from "react-device-detect";
// import Slider from '@mui/material/Slider';
import TaskList from "./DiseaseList";
import SymptomList from "./recorded_symptoms_diseases";
import { TASKS } from "./Constants";
import diseases_recorded_symptoms from './recorded_symptoms_diseases'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

export default function Sympcheck() {

    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);
    const [image, setImage] = React.useState('')
    var history = useHistory();
    var location = useLocation();
    const [showResults, setShowResults] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [check, setCheck] = React.useState(true);
  const [check1, setCheck1] = React.useState(true);
const [dummy,setDummy] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(true);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setDummy(false)
    setIsOpen(false);
  };
   
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [disList, setdisList] = useState(0);
    const [sympList,setsympList] = useState([]);
    const [userSelectedDis,setuserSelectedDis]=useState([]);
  
    useEffect(() => {
        if (location.state) {
            console.log(location)
            setUser(location.state.user);
            setToken(location.state.token);
            setData(location.state.disease);
            setImage("http://localhost:9000/" + location.state.user.pathprofilepic)

            setdisList(location.state.cancer.concat(location.state.symli))
            console.log(";l;l;l;;")
            console.log(userSelectedDis)
            console.log(";l;l;l;;")

            var afd=[]
            console.log("USEEFFECT")
            console.log(data)
            console.log("USEEFFECT")
            for (let i = 0; i < data.length; i++) {
                  afd.push(diseases_recorded_symptoms[data[i]] )
                  
                  console.log("afd")
                  console.log(afd[i]['severity'])
                  delete afd[i].severity
                  console.log(afd)
                  console.log("afd")
            }
            console.log("starting")
            var dis_list=[]
            console.log("============")
            for (let ij =0;ij<afd.length;ij++){
              Object.entries(afd[ij]).map(([key, value]) => {
                dis_list.push(value)
              })
                  }
                  console.log(dis_list)
                  dis_list = [...new Set(dis_list)];
                  
                  // setsympList([...new Set([...dis_list, ...location.state.symli])])
                  setsympList(dis_list
                    .filter(x => !location.state.symli.includes(x))
                    .concat(location.state.symli.filter(x => !dis_list.includes(x))).splice(0,6)
                    )
                  
                 
            console.log("==================")
            console.log("location.state.symli")
            console.log(dis_list)
                  console.log(location.state.symli)
                  console.log(sympList)
                  console.log("location.state.syml")
          


        } else {
            history.push('/symptoms/sympcheck')
        }
    }, [location, history,score,dummy,userSelectedDis])

    const [value, setValue] = React.useState(0);
    
    const onSliderChange = value => {
        setValue(value);
      
      }


      const handleAnswerOptionClick = (isCorrect) => {   
        if (isCorrect==false){

        }
        else{
          setuserSelectedDis(oldArray => [...oldArray, isCorrect]) ;
        }
        
          setScore(score + 1);
          console.log(data)
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < sympList.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
        }
        console.log(userSelectedDis)
      };
      
    return (
        <div>
            <Header token={token} user={user} image={image} />
            <div style={{ backgroundColor: "#fffff" }}>
            
            <div  
            style={{
            paddingLeft: "12%",
            paddingRight: "12%",
            paddingTop: "1%",
            paddingBottom: "5%", 
             
            
          }}>
          <div  
          style={{
              border: "1px solid #DCDCDC",
              padding: "7%"
            }}>

      <div className='app'>
			{showScore ? (
				    <div className="right-group">
              <div className='question-count'>
							<span>Your answers helped us to make better predictions <br/>Your prediction are ready Click on view Report to see the Intelligent Symptomate Findings!</span>
						</div>
            <Link
                to={{
                  pathname: "/reports/aviewreports",
                  state: {
                    token: token,
                    user: user,
                    data:data
                  },
                }}
                style={{ color: "black" }}
              >
            <Button
              type='submit'
              variant="warning"
              //onClick={mySubmitHandler}
              //d disabled={!validate()}
            >
             
                Take me to Report Section.
             
            </Button>
            </Link>
          </div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{sympList.length}
						</div>
            {console.log("questonquestion")}
            {console.log(sympList)}
            {console.log(sympList[currentQuestion])}
            {console.log("questonquestion")}
						<div className='question-text'>Do you feel {sympList[currentQuestion] === undefined ?  console.log("") :sympList[currentQuestion].replace(/_/gi," ").toUpperCase() } ?</div>
           
            
					</div>
					<div className='answer-section'>
							<button className='buttont' onClick={() => handleAnswerOptionClick(sympList[currentQuestion])}>Yes</button>
              <button className='buttont' onClick={() => handleAnswerOptionClick(false)}>No</button>
					</div>
          {/* <div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button className='buttont' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div> */}
				</>
			)}
		</div>
            </div>
            
        </div>
        <Form>
                    <Modal show={isOpen} onHide={closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Intelligent Symptomate </Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p>
                        Intelligent Symptomate would like to ask few questions regarding symptoms.
                        </p>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setCheck1(!check1);
                            console.log(!check);
                            closeModal();
                          }}
                        >
                          Proceed
                        </Button>
                      </Modal.Footer>
                    </Modal>
                   
                  </Form>
        </div>
        </div>
    );
}