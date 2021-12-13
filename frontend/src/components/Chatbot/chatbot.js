import ChatBot from 'react-simple-chatbot';
import { useHistory, useLocation } from "react-router";

import React, { useEffect } from 'react'
import { ThemeProvider } from "styled-components";
import { Link } from 'react-router-dom'

export default function ChatBotHelper(props) {

    const location = useLocation()
    const history = useHistory()
    const [user, setUser] = React.useState()
    const [token, setToken] = React.useState()
    
    useEffect(() => {
        if (location.state) {
          console.log(location)
          setUser(props.user)
          setToken(props.token)
        } else {
          history.push('./shomepage')
        }
      }, [history, location])

    const theme = {
        background: "#FFFEFC",
        fontFamily: "Roboto",
        headerBgColor: "#ffc107",
        headerFontColor: '#fff' ,
        headerFontSize: "150%",
        botBubbleColor: "#0047b3",
        botFontColor: "#fff",
        userBubbleColor: "#ffcc00",
        userFontColor: "white",
    };


    const BotRedirect = ({ url, message }) => {
        return (
            <div>
                <a href={url} target="_blank">
                    {message}
                </a>
            </div>
        );
    };

    const mess = "Hello! "
    const [steps, setSteps] = React.useState([

        {
            id: '1',
            message: "Hi! How can i help you?",
            trigger: '3',
        },
        {
            id: '3',
            options: [
                { value: 1, label: '1) How I-Symptomate works?', trigger: '4' },
                { value: 2, label: '2) Information regarding diseases!', trigger: '5' },
                { value: 2, label: '3) Detection of diseases!', trigger: '5' },
                { value: 3, label: '4) Main Menu!', trigger: '3' },
                { value: 5, label: '5) Profile View!', trigger: '12' },
                { value: 5, label: '6) Report View!', trigger: '13' },
            ]
        },
        {
            id: '4',
            component: (
                <Link
                to={{
                  pathname: '/help',
                  state: {
                    token: location.token,
                    user: location.user
                  }
                }}
              >
                Help and Guide
              </Link>
            ),
            trigger: '100'
        },
        {
            id: '5',
            options: [
                { value: 1, label: '1) Symptomatic disease detection!', trigger: '6' },
                { value: 2, label: '2) Skin Cancer disease detection!', trigger: '7' },
                { value: 2, label: '3) Respiratory disease detection!', trigger: '8' },
                { value: 3, label: '4) Main Menu!', trigger: '3' },
                
            ]
        },
        {
            id: '6',
            component: (
                <Link
                to={{
                  pathname: '/help',
                  state: {
                    token: location.token,
                    user: location.user
                  }
                }}
              >
                Click here for Symptomatic disease detection!
              </Link>
            ),
            trigger: '100'
        },	 	 
        {
            id: '7',
            component: (
                <Link
                to={{
                  pathname: '/help',
                  state: {
                    token: location.token,
                    user: location.user
                  }
                }}
              >
               Click here for Skin cancer disease detection!
              </Link>
            ),
            trigger: '100'
        },	 	 
        {
            id: '8',
            component: (
                <Link
                to={{
                  pathname: '/help',
                  state: {
                    token: location.token,
                    user: location.user
                  }
                }}
              >
                Click here for Respiratory disease detection!
              </Link>
            ),
            trigger: '100'
        },
        {
            id: '100',
            options: [
                { value: 1, label: '1) Go back to Main Menu!', trigger: '1' },
            ]
        },	 	 
        {
            id: '12',
            component: (
                <Link
                to={{
                  pathname: '/help',
                  state: {
                    token: location.token,
                    user: location.user
                  }
                }}
              >
                Click here for Profile View!
              </Link>
            ),
            trigger: '100'
        },
        {
            id: '13',
            component: (
                <Link
                to={{
                  pathname: '/help',
                  state: {
                    token: location.token,
                    user: location.user
                  }
                }}
              >
                Click here for Reports View!
              </Link>
            ),
            trigger: '100'
        },
    ])
    return (
        // speechSynthesis={{ enable: true, lang: 'en' }}
        <>
            <ThemeProvider theme={theme}>
                <ChatBot   headerTitle="Intelligent Symptomate"  
                     steps={steps} floating={true} />
            </ThemeProvider>
        </>
    )
}
