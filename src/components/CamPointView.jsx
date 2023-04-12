import {React, memo, useState, useEffect} from 'react';
import {FaTimes} from 'react-icons/fa'

const CamPointView = (props) => {

    const [className, setClassName] =useState("campoint toanimate")


    useEffect(() => {
        if (props.renderedCamPoints.includes(props.point.id))
        {
            setClassName("campoint")
        }
        else
        {
        const timer = setTimeout(() => {
            setClassName("campoint");
            props.AddKeyToRenderedCamPoints(props.point.id)
        }, 300);
        return () => clearTimeout(timer);
        }
    }, []);


    return ( <div className={className} >
    <FaTimes onClick={() => props.onRemove(props.index)} className='delete-icon'/>
      <h3>Cam Point {props.index + 1} </h3>
      <h4>  X: <input type="number" defaultValue={props.point.x} onChange={event => props.onChange(event,"number", "x", props.index)}></input>   
            Y: <input type="number" defaultValue={props.point.y} onChange={event => props.onChange(event,"number", "y", props.index)}></input>  
            V: <input type="number" defaultValue={props.point.v} onChange={event => props.onChange(event,"number", "v", props.index)}></input>   
            A: <input type="number" defaultValue={props.point.a} onChange={event => props.onChange(event,"number", "a", props.index)}></input>  
            Type: <select defaultValue={props.point.type} onChange={event => props.onChange(event,"select", "type", props.index)} >
                <option>Straight</option>
                <option>Poly5</option>
            </select></h4>
        </div>);
};

export default memo(CamPointView);
