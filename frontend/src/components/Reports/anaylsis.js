import React, { useEffect } from "react";
import Header from "../Navbar/header";
import TableView from "./AnanlysisComponent/table-template";
import TableSearchView from "./AnanlysisComponent/search-country";
import AnalysisTemplate from "./AnanlysisComponent/analysis-template";
import "../../styles.css";
import "../Reports/AnanlysisComponent/custom-styles.css"
import Map from "./AnanlysisComponent/map";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import ReactTooltip from "react-tooltip";
import Iframe from 'react-iframe'
import AHeader from "../Navbar/Aheader"

export default function Analysis() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [content, setContent] = React.useState("");
  const [country, setCountry] = React.useState('');
  const [image,setImage] = React.useState('');
  var history = useHistory();
  var location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (location.state.user !== undefined) {
        console.log(location)
        setUser(location.state.user);
        setToken(location.state.token);
        setImage("http://localhost:9000/"+location.state.user.pathprofilepic)
 
      } else {
        history.push('/reports/analysis')
      }
    }
  }, [location, history])


  const options = {
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top" // top, center, bottom
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Number(val).toLocaleString();
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: [
        ' Actinic keratoses',
        'Basal cell carcinoma',
        ' lesions',
        'Dermatofibroma',
        'Melanocytic nevi',
        'Melanoma',
        'Vascular lesions'
      ],
      position: "bottom",
      labels: {
        offsetY: 0
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs_: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: {
        enabled: false,
        offsetY: -35
      }
    },
    fill: {
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100]
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: true,
        formatter: function (val) {
          return Number(val).toLocaleString() + "%";
        }
      }
    },
    title: {
      text: "Skin cancer analysis men",
      floating: true,
      offsetY: 0,
      align: "center",
      style: {
        color: "#444"
      }
    },
    chart: {
      animations: {
        enabled: false
      }
    }

  };
  const [series, setSeries] = React.useState([
    {
      name: "No of Skin Cancer Patients",
      data: [100, 100, 100, 100, 100, 100, 100]
    }
  ]);
  setTimeout(() => {
    setSeries([
      {
        name: "Effects",
        data: [49, 80, 50, 50, 50, 50, 50]
      }
    ]);
  }, 4000);

  const type = "line";

  return (
    <div style={{ backgroundColor: "#F8F8F8",fontFamily: 'Arial, Helvetica, sans-serif' }}>

      {location.state.user.isAdmin === true ? <AHeader token={token} user={user} image={image}/> : <Header token={token} user={user} image={image}/>}
      {/* <Header token={token} user={user} image={image}/> */}
      <div>
      <iframe src="https://ourworldindata.org/grapher/annual-number-of-deaths-by-cause?country=~OWID_WRL" loading="lazy" style={{width: "100%", height: "800px", border:" 0px none", paddingLeft: "12%",
          paddingRight: "12%",
          paddingTop: "1%",
          paddingBottom: "5%",
          textAlign: "center",
          fontFamily: 'Arial, Helvetica, sans-serif'}}></iframe>
</div>
{/* <div>
<iframe src="https://ourworldindata.org/grapher/life-expectancy" loading="lazy" tyle={{width: "100%", height: "600px", border:" 0px none", paddingLeft: "12%",
          paddingRight: "12%",
          paddingTop: "1%",
          paddingBottom: "5%",
          textAlign: "center",
          fontFamily: 'Arial, Helvetica, sans-serif'}}></iframe>
  </div> */}
      {/* <div
        style={{
          paddingLeft: "12%",
          paddingRight: "12%",
          paddingTop: "5%",
          paddingBottom: "5%",
          textAlign: "center"
        }}
      >

        <div style={{ border: "1px solid #DCDCDC", paddingTop: "3%", paddingBottom: "3%" }}>
          <div style={{ paddingBottom: "3%" }}>
            <select className="selectStyles" id="country" name="country" onChange={(e) => setCountry(e.target.value)}>
              <option>Select country</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Aland Islands">Aland Islands</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="American">American Samoa</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Bouvet Island">Bouvet Island</option>
              <option value="Brazil">Brazil</option>
              <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
              <option value="Brunei Darussalam">Brunei Darussalam</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Cape Verde">Cape Verde</option>
              <option value="Cayman Islands">Cayman Islands</option>
              <option value="Central African Republic">Central African Republic</option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Christmas Island">Christmas Island</option>
              <option value=">Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
              <option value="Cook Islands">Cook Islands</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Cote D'Ivoire">Cote D'Ivoire</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Curacao">Curacao</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="EEstoniaE">Estonia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
              <option value="Faroe Islands">Faroe Islands</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="French Guiana">French Guiana</option>
              <option value="French Polynesia">French Polynesia</option>
              <option value="French Southern Territories">French Southern Territories</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Greece">Greece</option>
              <option value="Greenland">Greenland</option>
              <option value="Grenada">Grenada</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Guam">Guam</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guernsey">Guernsey</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea">Guinea-Bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
              <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Isle of Man">Isle of Man</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jersey">Jersey</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
              <option value="Korea, Republic of">Korea, Republic of</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macao">Macao</option>
              <option value="Macedonia, the Former Yugoslav Republic of">Macedonia, the Former Yugoslav Republic of</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Martinique">Martinique</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mayotte">Mayotte</option>
              <option value="Mexico">Mexico</option>
              <option value=">Micronesia, Federated States of">Micronesia, Federated States of</option>
              <option value="Moldova, Republic of">Moldova, Republic of</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Nauru">Nauru</option>
              <option value="Nauru">Nauru</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Netherlands Antilles">Netherlands Antilles</option>
              <option value="New Caledonia">New Caledonia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Niue">Niue</option>
              <option value="Norfolk Island">Norfolk Island</option>
              <option value="Northern Mariana Islands">Northern Mariana Islands</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="PeruPE">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Pitcairn">Pitcairn</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Puerto Rico<">Puerto Rico</option>
              <option value="Qatar">Qatar</option>
              <option value="Romania">Romania</option>
              <option value="Russian Federation">Russian Federation</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Saint Barthelemy">Saint Barthelemy</option>
              <option value="Saint Helena">Saint Helena</option>
              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Saint Martin">Saint Martin</option>
              <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
              <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
              <option value="Samoa">Samoa</option>
              <option value="San Marino">San Marino</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Serbia">Serbia and Montenegro</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Sint Maarten">Sint Maarten</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
              <option value="South Sudan">South Sudan</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Swaziland">Swaziland</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="SSyrian Arab RepublicY">Syrian Arab Republic</option>
              <option value="Taiwan, Province of China">Taiwan, Province of China</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
              <option value="Thailand">Thailand</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Virgin Islands, British">Virgin Islands, British</option>
              <option value="Virgin Islands, U.s">Virgin Islands, U.s.</option>
              <option value="Western Sahara">Western Sahara</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>
          </div>
          {country === "" ? <TableView /> : <TableSearchView name={country} />}
        </div>
        <div style={{ paddingTop: "3%", paddingBottom: "3%" }}>

          <Map setTooltipContent={setContent} />
          <ReactTooltip>{content}</ReactTooltip>
        </div>

        <div
          style={{
            border: "1px solid #DCDCDC",
            backgroundColor: "#fff",
            padding: "7%"
          }}
        >

          <div id="chart">
            <AnalysisTemplate
              options={options}
              series={series}
              type={type}
            />
          </div>

          <div id="chart" style={{ boderTop: "1px solid black" }}>
            <AnalysisTemplate
              options={options}
              series={series}
              type="bar"
            />
          </div>
          <h2>Skin cancer Categories + {country}</h2>
        </div>
      </div> */}
    </div >
  );
}


