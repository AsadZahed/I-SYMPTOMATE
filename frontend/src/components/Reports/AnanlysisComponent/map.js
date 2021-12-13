import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 100 + "%";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 100 + "%";
  } else {
    return Math.round(num / 100) / 100 + "%";
  }
};

const MapChart = ({ setTooltipContent }) => {
  const [position, setPosition] = React.useState({ coordinates: [0, 0], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  
  return (
    <>
      <div style={{ border: "1px solid #DCDCDC", paddingTop: "3%", paddingBottom: "3%" }}>

        <div className="controls">
          <button onClick={handleZoomIn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button onClick={handleZoomOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>


        <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo, i) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME, POP_EST } = geo.properties;
                      console.log(geo.properties)
                      setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}

                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "black"
                      },
                      hover: {
                        fill: "#F53",
                        outline: "black"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "black"
                      }
                    }}
                  />
                ))
              }
            </Geographies>
            {/* <Marker coordinates={[30, 69]} fill="#777">
            <text textAnchor="middle" fill="#F53">
              Pakistan
            </text>
          </Marker>
      
          <Marker coordinates={[-101, 53]} fill="#777">
            <text textAnchor="middle" fill="#F53">
              Canada
            </text>
          </Marker>
          <Marker coordinates={[-102, 38]} fill="#777">
            <text textAnchor="middle" fill="#F53">
              USA
            </text>
          </Marker>
          <Marker coordinates={[-103, 25]} fill="#777">
            <text textAnchor="middle" fill="#F53">
              Mexico
            </text>
          </Marker> */}
          </ZoomableGroup>

        </ComposableMap>
      </div>

    </>
  );
};

export default memo(MapChart);
