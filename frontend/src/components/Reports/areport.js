import React, { useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { Button } from "react-bootstrap";
import Header from "../Navbar/header";
import diseases_recorded from './diseases_severity.json'
export default function AReport() {

  const [token, setToken] = React.useState(null)
  const [user, setUser] = React.useState(null);
  const [name, setName] = React.useState("anonymous");
  const [id, setID] = React.useState("1234");
  const [cancer, sets] = React.useState("");
  const [ages, setages] = React.useState("");
  const [gender, setgender] = React.useState("");
  const [i, setI] = React.useState("")
  const today = Date.now();
  const [msg, setMSG] = React.useState(null);
  const [image,setImage] = React.useState('');
  const [data,setData] =React.useState([]);
  const [sev1,setSev1] = React.useState([]);
  const [sev2,setSev2] = React.useState([]);
  const [sev3,setSev3] = React.useState([]);
  const dlist = [
    "Melanoma, also redundantly known as malignant melanoma, is a type of skin cancer that develops from the pigment-producing cells known as melanocytes. Melanomas typically occur in the skin but may rarely occur in the mouth, intestines or eye (uveal melanoma)",
    "Basal cell carcinoma Basal cell carcinoma is a type of skin cancer. Basal cell carcinoma begins in the basal cells — a type of cell within the skin that produces new skin cells as old ones die off. Basal cell carcinoma often appears as a slightly transparent bump on the skin, though it can take other forms.",
    "Melanocytic nevi A melanocytic nevus (also known as nevocytic nevus, nevus-cell nevus and commonly as a mole) is a type of melanocytic tumor that contains nevus cells. Some sources equate the term mole with melanocytic nevus, but there are also sources that equate the term mole with any nevus form.",
    "Benign keratosis-like lesions A seborrheic keratosis is a non-cancerous (benign) skin tumour that originates from cells in the outer layer of the skin. Like liver spots, seborrheic keratoses are seen more often as people age. The tumours (also called lesions) appear in various colours, from light tan to black.",
    "Actinic keratoses An actinic keratosis (ak-TIN-ik ker-uh-TOE-sis) is a rough, scaly patch on the skin that develops from years of sun exposure. It's often found on the face, lips, ears, forearms, scalp, neck or back of the hands.",
    "Vascular lesions Vascular lesions are relatively common abnormalities of the skin and underlying tissues, more commonly known as birthmarks. There are three major categories of vascular lesions: Hemangiomas, Vascular Malformations, and Pyogenic Granulomas.",
    "Dermatofibroma Dermatofibromas are an accumulation of extra cells within the deeper layers of the skin. The exact cause of these growths is unknown. They may be caused by an adverse reaction to a small injury, such as a bug bite, splinter, or puncture wound. Age may be another risk factor, as the growths appear mostly in adults."
  ]

  var history = useHistory();
  var location = useLocation();
  const [pdisease,setPDisease] = React.useState();

  useEffect(() => {
    try {
      if (location.state) {
        console.log(location)
        setUser(location.state.user);
        setToken(location.state.token)
        setName(location.state.user.name)
        setID(location.state.user._id)
        sets(location.state.cancer)
        setI(location.state.img)
        setages(location.state.user.age)
        setgender(location.state.user.gender)
        setImage("http://localhost:9000/"+location.state.user.pathprofilepic)
        setData(location.state.data)
      
      } else {
        history.push('/')
      }

    }
    catch (res) {
      console.log(res.error)

    }
  }, [location, history])

  

 
  const checkdiseases = () => {
    if(data.length==1){
      var w = " ";
    if (data[0] === "Melanoma") {

      w = dlist[0]
      return (
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Detail:
          </p>
          <ul>
  
            <li>
              <p>
               {w}
    
              </p>
            </li>
  
          </ul>
        </div> 
      );
    }
    else if (data[0] === 'Basal cell carcinoma') {

      w = dlist[1]
      return (
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Detail:
          </p>
          <ul>
  
            <li>
              <p>
               {w}
    
              </p>
            </li>
  
          </ul>
        </div> 
      );
    }
    else if (data[0] === "Benign keratosis-like lesions") {

      w = dlist[3]
      return (
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Detail:
          </p>
          <ul>
  
            <li>
              <p>
               {w}
    
              </p>
            </li>
  
          </ul>
        </div> 
      );
    }
    else if (data[0] === "Dermatofibroma") {

      w = dlist[6]
      return (
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Detail:
          </p>
          <ul>
  
            <li>
              <p>
               {w}
    
              </p>
            </li>
  
          </ul>
        </div> 
      );
    }
    else if (data[0] === "Melanocytic nevi") {

      w = dlist[2]
      return (
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Detail:
          </p>
          <ul>
  
            <li>
              <p>
               {w}
    
              </p>
            </li>
  
          </ul>
        </div> 
      );

    }
    else if (data[0] === "Actinic keratoses") {

      w = dlist[4]
      return (
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Detail:
          </p>
          <ul>
  
            <li>
              <p>
               {w}
    
              </p>
            </li>
  
          </ul>
        </div> 
      );
    }
    else if (data[0] === "Vascular lesions") {

      w = dlist[4]
      return (
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Detail:
          </p>
          <ul>
  
            <li>
              <p>
               {w}
    
              </p>
            </li>
  
          </ul>
        </div> 
      );
    }
    else {
      if (data)

      w = "No Data Available"
      return (
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Detail:
          </p>
          <ul>
  
            <li>
              <p>
                {data[0] === "Pneumonia" ? (<li>Pneumonia is an infection that inflames your lungs' air sacs (alveoli). The air sacs may fill up with fluid or pus, causing symptoms such as a cough, fever, chills and trouble breathing.</li>):(<li>Your Xray is Normal.</li>)}
                {data[0] === "Pneumonia" ? (<li>In the Image you can see the White cloudiness near lungs, this shows Xray given has Pneumonia.</li>):console.log("")}
              </p>
            </li>
          </ul>
        </div>
  
      );
    }

    }

else{
    return (
      <div
        style={{
          padding: "0px 10px 0px 10px",
          color: "#282c34",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "500",
            textDecoration: "underline",
          }}
        >
          Detail:
        </p>
        <ul>
          <h6><b>Most Probably you have: (High certainity, Low severity)</b></h6>
            <p>             
            {data.map((disease) =>diseases_recorded[disease].severity === 1 ? (<li>{disease}</li>) : console.log("") )}
            </p>

        </ul>

        
        <ul>    
        <h6><b>Medium certainity:</b></h6>
    {data.map((disease) =>diseases_recorded[disease].severity === 2 ? (<li>{disease}</li>) : console.log("") )}
    </ul>

<ul>

  <p>
    {/* {w} */}
    <h6><b>If you are facing these symptoms for long time than you may have:(High Severity)</b></h6>
    {console.log("diseases_recorded_symptoms['Hypertension'].severity")}
    {console.log(diseases_recorded['Hypertension'].severity === 2 )}
    {console.log("diseases_recorded_symptoms['Hypertension'].severity")}
    {data.map((disease) =>diseases_recorded[disease].severity === 3 ? (<li>{disease}</li>) : console.log("") )}
{/* {diseases_recorded_symptoms[disease]} */}
  </p>


</ul>
      </div>

    );}
  };

  const setDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today);

  function handleSubmit(event) {
    // event.preventDefault();
    const datai = {
      name: name,
      cancer: data,
      age: ages,
      time: setDate,
      reportID: "1",
      gender: "male"

    };

    axios.post('http://localhost:9000/addinfo/savereports', datai, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          history.push({
            pathname: '/',
            state: {
              user: user,
              token: token,
            },
          });
        }


      })
      .catch(res => setMSG("This report cannot be saved"));
  }


  const [showResults, setShowResults] = React.useState(false)

  const onClick = () => setShowResults(true)


  return (
    <div style={{ paddingBottom: "5%" }}>

      <Header token={token} user={user} image={image}/>

      <div id="GFG" style={{ width: "50%", margin: "auto", border: "2px solid black", paddingBottom: "1%" }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#0047b3",
              border: "2px solid black",
              color: "#fff",
              padding: "2%",
            }}
          >

            <p style={{ fontSize: "3vh", fontWeight: "500" }}>
              I-Symptomate | An intelligent
            </p>
            <p style={{ alignSelf: "center" }}>
              Disease Diagnosing Report
            </p>
          </div>
          <div style={{ backgroundColor: "#ffff" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                color: "#282c34",
                display: "flex",
              }}
            >
              <p
                style={{
                  fontSize: "3vh",
                  fontWeight: "500",
                  textDecoration: "underline",
                }}
              >
                <b>
                Patient Information:
                </b>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                color: "#282c34",
                textDecoration: "underline",
                padding: "10px",
              }}
            >
              <div style={{  }}>
                <p>
                  <strong>Patient ID:</strong> {id.substring(1, 10)}
                </p>
                <p>
                  <strong>Report ID:</strong> {id.substring(11, 20) + 1}
                </p>
                <p>
                  <strong>Submission Date:</strong> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today)}
                </p>
              </div>
              <div>
                <p>
                  <strong>Patient Name:</strong> {name}
                </p>
                <p>
                  <strong>Age: </strong> {ages}
                </p>
                <p>
                  <strong>Gender:</strong> {gender}
                </p>
              </div>
            </div>
            <hr />
            <div
              style={{
                padding: "0px 10px 0px 10px",
                color: "#282c34",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  textDecoration: "underline",
                }}
              >
                Disease Summary:
              </p>
              {data.length==1 ?(
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  border: "2px solid black",
                  color: "black",
                  padding: "10px",
                }}
              >
                
                  
                <p style={{ fontSize: "20px", fontWeight: "500", paddingTop: "50px" }}>
                  Screening Result: <i><u><b>{data[0]}</b></u></i>
                </p>
                <img
                  src={i}
                  alt="No image Available"
                  style={{
                    width: "128px",
                    height: "128px",
                    objectFit: "cover",
                    //borderRadius: "50%",
                    
                    
                  }
                  }></img>
              
            
              </div>)
                :console.log()
              }
            </div>
            {checkdiseases()}
            <hr />
            <div
              style={{
                padding: "0px 10px 0px 10px",
                color: "#282c34",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  textDecoration: "underline",
                }}
              >
                Plan and Recommendations:
              </p>
              <ul>
                <li>
                  <p>Check is advised from classified Doctor.</p>
                </li>
                <li>
                  <p>
                    As per ADA recommendations, emphasize the importance of
                    controlling blood sugar, cholesterol and blood pressure as well
                    the importance of routine follow-up with an ophthalmologist
                    regardless of whether visual symptoms are present or absent.
                  </p>
                </li>
                <li>
                  <p>Report Date: {new Date(Date.now()).toString()}</p>
                </li>
              </ul>
            </div>
            <hr />

            <div
              style={{
                padding: "0px 10px 0px 10px",
                color: "#282c34",
              }}
            >
              <p style={{ fontSize: "12px", fontWeight: "500" }}>
                Note: This report is automatically generated using iSymptomate an Ai based diseases
                predictor based on symptoms and only provides limited prognosis.
                This screening does not take place of a
                regular check up for the purpose of assessing the presence of
                different diseases based on thier symptoms.
              </p>
            </div>
          </div>

          {showResults ?
            <div className="validation">
              {msg} </div> : <div></div>}

          <div className="btn-toolbar">
            <div className="left-group">
              <Button

                block
                size="lg"
                type="submit"
              >
                Add
              </Button>
            </div>

            <div className="right-group">
              <Button

                block
                size="lg"
                type="submit"
              >
                Print
              </Button>
            </div>
            {/* <Print /> */}
          </div>
        </form>


      </div>
    </div>

  );
}

