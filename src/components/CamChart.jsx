import React from 'react';
import {Chart} from "react-google-charts";

export const data = [
  ["Master Position", "Position", "Velocity", "Acceleration"],
  [0,1,1,1],
  [1,2,3,4],
  [2,2,3,4],
]

export const options = [{
  chart: {
    // title: "Cam Profile",
    // subtitle: "Cam Profile",
  },
  axes: {
    y: {
      Position: {label: 'Position [u]'
      }
    }
  },
  colors: ['blue']},
  {chart: {
    // title: "Cam Profile",
    // subtitle: "Cam Profile",
  },
  axes: {
    y: {
      Acceleration: {label: 'Velocity [u/s]'}
    }
  },
  colors: ['red']
},
  {chart: {
    // title: "Cam Profile",
    // subtitle: "Cam Profile",
  },
  axes: {
    y: {
      Acceleration: {label: 'Acceleration [u/s^2]'}
    }
  },
  colors: ['orange']

}];

const CamChart = ({graphData, step}) => {


  return (
    <div>
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={graphData[0]}
          options={options[0]}/>
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={graphData[1]}
          options={options[1]}/>
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={graphData[2]}
          options={options[2]}/>
    </div>
  );
};

export default CamChart;
