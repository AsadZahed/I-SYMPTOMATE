import React, { useEffect } from "react";
import Header from "../Navbar/header";
import axios from 'axios';
import { Button,Table } from "react-bootstrap";
import { useHistory,Link } from "react-router-dom";
import { useLocation } from "react-router";

export default function View() {
   
    const [cac, setCac] = React.useState( [
        ' Actinic keratoses',
        'Basal cell carcinoma',
        'Benign keratosis-like lesions',
        'Dermatofibroma',
        'Melanocytic nevi',
        'Melanoma',
        'Vascular lesions',
        'Pneumonia',
        'Normal'
      ]);
    const [sym,setSymp]=React.useState([]);
    const [can,setCan]=React.useState([]);
    const [reports, viewReports] = React.useState([]);
    const [age, setAge] = React.useState("12");
    // const [data, setData] = React.useState();
    // const [patientid, setpatientID] = React.useState();
    // const [reportid, setReportID] = React.useState();
    const [gender, setgender] = React.useState("male");
    const [token, setToken] = React.useState(null)
    const [user, setUser] = React.useState(null);
    const [check, setCheck] = React.useState(false);
    const [cancer, setCancer] = React.useState("Cancer");
    // const [userId, setUSerID] = React.useState("")
    var history = useHistory();
    var location = useLocation();
    const[image,setImage] = React.useState('');
    const[one,setOne]=React.useState(true)

    useEffect(() => {
        if (location.state) {            
            console.log(location.state.user)
            setUser(location.state.user);
            setToken(location.state.token);
            setImage("http://localhost:9000/"+location.state.user.pathprofilepic)
            setOne(false)
        } else {
            history.push('/reports/view')
        }
    }, [location, history])


    useEffect(() => {
        if (location.state) {
            console.log(location.state.user)
            setAge(location.state.user.age)
            setgender(location.state.user.gender)
            
            axios.get('http://localhost:9000/users/reports/view', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ${location.state.token}`
                }
            })
                .then(res => {
                    if (res.data.success === false) {
                        setCheck(false);
                    }
                    else {
                        console.log(res.data);
                        viewReports(res.data.reports);
                        // setCan(reports.map((person, index) => {console.log(reports[index].cancer.length)}))
                        // setSymp(reports.map((person, index) => {console.log(reports[index].cancer.length)}))
                        // console.log("tptpt")
                        // console.log(can.length)
                        // if(can.length==0){
                        // reports.map((person, index) => {
                        //     console.log("reports[index].cancer.length==1")
                        //     console.log(person)
                            
                        //     if(reports[index].cancer.length==1){
                        //         setCan(oldarray => [...oldarray,person])
                                
                        //     }
                        //     else{
                        //         setSymp(oldarray => [...oldarray,person])
                        //     }
                        // }
                       
                        // )}
                        // console.log("tptpt")
                        setCheck(true);
                    }
                })
        }
    }, [location, token, user,can,sym]);

    return (
        <div>
            <div style={{ backgroundColor: "#F8F8F8" }}>
                <Header token={token} user={user} image={image} />
                <div
                    style={{
                        paddingLeft: "12%",
                        paddingRight: "12%",
                        paddingTop: "5%",
                        paddingBottom: "5%"
                    }}
                >
                    <div
                        style={{
                            border: "1px solid #DCDCDC",
                            backgroundColor: "#fff",
                            padding: "7%"
                        }}
                    >
                        <h1>View Reports</h1>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {/* <th>Name</th> */}
                                    <th>Data and Time</th>
                                    <th>Result</th>
                                    <th>Save</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {check !== true ?
                                    <tr>
                                        <td>No data to show</td>
                                        <td>No data to show</td>
                                        <td>No data to show</td>
                                        <td>No data to show</td>
                                        <td>No data to show</td>

                                    </tr>
                                    :
                                    reports.map((person, index) => {
                                        // console.log("person is ", person)
                                        return (

                                            <tr>
                                                <td>{index + 1}</td>
                                                {/* <td>{person.name}</td> */}
                                                <td>{person.time}</td>
                                                <td>{person.cancer[0]}</td>
                                                <td>
                                                    <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
                                                        <Button variant="success">
                                                            <Link
                                                                to={{
                                                                    pathname: "/reports/viewreports",
                                                                    state: {
                                                                        token: token,
                                                                        user: user,
                                                                        name: person.name,
                                                                        age: age,
                                                                        date: person.time,
                                                                        patientid: person.p_id,
                                                                        reportid: person.reportID,
                                                                        gender: gender,
                                                                        data: person.cancer,
                                                                    },
                                                                }}
                                                                style={{
                                                                    //marginTop:"5%",
                                                                    //marginBottom:"10%",
                                                                    color: "black"
                                                                }}
                                                            >
                                                                View full report
                                                            </Link>

                                                        </Button>
                                                    </div>

                                                </td>

                                                <td>
                                                    <Button variant="danger" style={{ margin: "5px" }}>
                                                        <Link
                                                            style={{ color: "#0c0530" }}
                                                            to={{
                                                                pathname: "/users/reports/view/delete",
                                                                state: {
                                                                    token: token,
                                                                    user: user,
                                                                },
                                                            }}
                                                        >
                                                            Delete Report
                                                        </Link>
                                                    </Button>
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
    );
}
