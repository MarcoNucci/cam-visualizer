import {useState} from 'react'
import CamPointsView from './components/CamPointsView'
import CamResults from './components/CamResults'
import useMechanicsState from './state/MechanicsState'
import {computeCamSegmentParameters, computeCamPosition, computeCamVelocity, computeCamAcceleration, solveZeroVelocity} from './functions/CamComputation'
import {createAnimation} from './functions/Animation'
import nextId from "react-id-generator"



function App() {

  // Application States
  // ** Cam Points
  const [camPoints, setCamPoints] =useState([
    {
      id : nextId(),
      x : 0,
      y : 0,
      v : 0,
      a : 0,
      type : 'Straight',
    },
    {
      id : nextId(),
      x : 360,
      y : 360,
      v : 0,
      a : 0,
      type : 'Poly5',
    },
  ])

  // ** Cam Parameters
  const [camParameters, setCamParameters] = useState ([
  ])

  // ** Compute Requested
  const [isComputeRequested, setIsComputeRequested] =useState(false)

  // ** Compute Error Message
  const [computeErrorMessage, setComputeErrorMessage] =useState('')

  // ** Graphical Data 
  const [graphData, setGraphData] = useState([
    [["Master Position", "Position"],[0, 0],[360,0]],[["Master Position", "Velocity"],[0, 0],[360,0]],[["Master Position", "Acceleration"],[0, 0],[360,0]]
  ])

  // ** Step for Graph
  const [numberOfSteps, setnumberOfSteps] = useState([1000])
  const [step, setStep] = useState([0.1])
  const [camData, setCamData] = useState([])

  // ** Mechanics State
  const mechanicsState = useMechanicsState();

  const computeCamParameters = () => {
    let newCamParameters = []
    for (let i = 0; i < camPoints.length-1; i++) 
    {
      if (i < camPoints.length - 1)
      {
        newCamParameters = [...newCamParameters, computeCamSegmentParameters(camPoints[parseInt(i)], camPoints[parseInt(i)+1])];
      }
    }
    setCamParameters(newCamParameters);
    return newCamParameters;
  }

  const computeGraphData = (step, camParameters) => {
    setStep(step)
    var posData = [["Master Position", "Position"]]
    var velData = [["Master Position", "Velocity"]]
    var accData = [["Master Position", "Acceleration"]]
    var localCamMasterPositions=[];
    var localCamSlavePositions=[];
    var localCamSlaveVelocities=[];
    var localCamSlaveAccelerations=[];
    var data = [
      ["Master Position", "Position", "Velocity", "Acceleration"]]
      for (let i = 0; i < camParameters.length; i++)
      {
        console.log(String(i) + "  " + camPoints[i].x + "   " + camPoints[i+1].x);
        for (let x = parseFloat(camPoints[i].x); x <= parseFloat(camPoints[i+1].x); x+=parseFloat(step))
        {
          data.push([x, computeCamPosition(x, camParameters[i]), computeCamVelocity(x, camParameters[i]), computeCamAcceleration(x,camParameters[i])]);
          posData.push([x, computeCamPosition(x, camParameters[i])]);
          velData.push([x, computeCamVelocity(x, camParameters[i])]);
          accData.push([x, computeCamAcceleration(x, camParameters[i])]);
          localCamMasterPositions = [...localCamMasterPositions,x]
          localCamSlavePositions = [...localCamSlavePositions,computeCamPosition(x, camParameters[i])]
          localCamSlaveVelocities = [...localCamSlaveVelocities,computeCamVelocity(x, camParameters[i])]
          localCamSlaveAccelerations = [...localCamSlaveAccelerations,computeCamAcceleration(x, camParameters[i])]
          }
      };
      setGraphData([posData, velData, accData]);
      setCamData(
        {'x':localCamMasterPositions,
          'y':localCamSlavePositions,
          'v':localCamSlaveVelocities,
          'a':localCamSlaveAccelerations
        })
      createAnimation(posData,numberOfSteps);
  }

  
  function ComputeCam()
  {
      setIsComputeRequested(true);

      //** Check for CamPoints being valid *//
      if (camPoints.length < 2)
      {
          setComputeErrorMessage('Error in Cam Computation. At least 2 points are needed.');
          return;
      }
      for (let i = 0; i < camPoints.length-1; i++) 
      {
          if (camPoints[i+1]["x"] <= camPoints[i]["x"])
          {
            setComputeErrorMessage('Error in Cam Computation. The x field of Cam Point ' + (i+2) + ' must be bigger than the x field of Cam Point ' + (i+1));
            return;
          }
      }
      setComputeErrorMessage('');
      computeGraphData((camPoints[camPoints.length-1].x - camPoints[0].x)/numberOfSteps, computeCamParameters());
  }

  return (
    <div className="App">
      <CamPointsView camPoints = {camPoints} setCamPoints = {setCamPoints} ComputeCam = {ComputeCam}/>
      <CamResults isComputeRequested = {isComputeRequested} computeErrorMessage = {computeErrorMessage} 
          graphData = {graphData} camData = {camData} camPoints = {camPoints} camParameters = {camParameters} mechanicsState={mechanicsState} />    
    </div>
  );
}

export default App;
