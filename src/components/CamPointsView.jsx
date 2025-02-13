import { useState } from 'react'
import AddButton from './AddButton';
import CamPointView from './CamPointView'
import nextId from "react-id-generator"

const CamPointsView = (props) => {

  function changePointField(e, type, field, index)
  {
      let camPoints = structuredClone(props.camPoints);
      if (type == "number")
          camPoints[index][field] = parseFloat(e.target.value);
      else
          camPoints[index][field] = e.target.value;
      props.setCamPoints(camPoints);
  }

  function addPoint(index)
  {
    let camPoints = structuredClone(props.camPoints);
    camPoints.splice(index,0,defaultPoint())
    props.setCamPoints([...camPoints])
  }

  function removePoint(index)
  {
    RemoveKeyFromRenderedCamPoints(props.camPoints[index].id)
    let camPoints = structuredClone(props.camPoints);
    camPoints.splice(index,1)
    props.setCamPoints([...camPoints])
    
  }

  function defaultPoint()
  {
    return {
      id : nextId(),
      x : 0,
      y : 0,
      v : 0,
      a : 0,
      j : 0,
      type : 'Poly5',
    } 
  }

  function RemoveKeyFromRenderedCamPoints(key)
  {
    let keys = structuredClone(renderedCamPoints)
    let index= keys.indexOf(key)
    keys.pop(index);
    setRenderedCamPoints([...keys])
  }

  function AddKeyToRenderedCamPoints(key)
  {
    let keys = structuredClone(renderedCamPoints)
    keys.push(key)
    setRenderedCamPoints([...keys])
    console.log(keys)
  }
  
  const [renderedCamPoints, setRenderedCamPoints] =useState(['id3','id4'])

  return (
    <>
      <div className="container">
        <h1>Cam Points</h1>
        <AddButton index={0} onClick={addPoint}/>
        {props.camPoints.map((val, i) => (
            <>
            <CamPointView key = {val.id} point={val} onChange = {changePointField} onRemove = {removePoint} index = {i}
                          renderedCamPoints = {renderedCamPoints} AddKeyToRenderedCamPoints = {AddKeyToRenderedCamPoints}/>
            {/* <AddButton index={i+1} onClick={addPoint}/> */}
            <button className='AddButton' onClick={() => addPoint(i+1)}>+</button>
            </>
            ))}
        <button className='ComputeButton' onClick={() => props.ComputeCam()}>Compute</button>
      </div>
    </>
    );
  };

export default CamPointsView;
