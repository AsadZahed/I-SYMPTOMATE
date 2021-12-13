import React from "react";
import ReactApexChart from "react-apexcharts";

import "../../../styles.css";

export default function AnalysisTemplate(props) {
  return (
          <div id="chart">
            <ReactApexChart
              options={props.options}
              series={props.series}
              type={props.type}
              height="300"
            />
          </div>
  );
}


