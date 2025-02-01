import { useState } from 'react'
import CamChart from './CamChart'
import Animation2D from './Animation2D'
import Animation3D from './Animation3D'
import Mechanics from './Mechanics'




const CamResults = (props) => {   

    function sync2DAnimations()
    {
        const Anim1 = findAnimByName(nameAnimation);
        const Anim2 = findAnimByName(nameTextAnimation);
        if (Anim1 !== undefined && Anim2 !== undefined)
            Anim2.startTime = Anim1.startTime;
    }
    
    function findAnimByName(name) 
    {
        const anims = document.getAnimations();
        return anims.find((anim) => anim.animationName === name);
    } 

    const [nameAnimation, setNameAnimation] = useState("App-gear-spin")
    const [nameTextAnimation, setnameTextAnimation] = useState("App-text-change")
    const [selectedTab, setSelectedTab] =useState([1])

    if (props.isComputeRequested && props.computeErrorMessage == '')
        return (
            <>
            <div className="container"> 
                <h1>Results</h1>
                <div className='centered'>
                    <button className={(selectedTab == 1) ? "SelectedButton":"UnselectedButton"} onClick={() => setSelectedTab(1)}>Cam Graph</button>
                    <button className={(selectedTab == 2) ? "SelectedButton":"UnselectedButton"} onClick={() => setSelectedTab(2)}>Mechanics</button>
                    <button className={(selectedTab == 3) ? "SelectedButton":"UnselectedButton"} onClick={() => {setSelectedTab(3); sync2DAnimations()}}>2D Animation</button>
                    <button className={(selectedTab == 4) ? "SelectedButton":"UnselectedButton"} onClick={() => setSelectedTab(4)}>3D Animation</button>
                </div>
                {(selectedTab == 1) ? <CamChart graphData = {props.graphData} step = {props.step}/> : <></>}
                {(selectedTab == 2) ? <Mechanics mechanicsState={props.mechanicsState} camData={props.camData} /> : <></>}
                {(selectedTab == 3) ? <Animation2D/> : <></>}
                {(selectedTab == 4) ? <Animation3D camPoints = {props.camPoints} camParameters = {props.camParameters}/> : <></>}
            </div>
            </>
            );
    else if (props.isComputeRequested && props.computeErrorMessage != '')
        return (
            <>
            <div className="container">
                <h1>Results</h1>
                <h3 className="errormessage">{props.computeErrorMessage}</h3>
            </div>
            </>
            );    
    else
        return <></>
    };

export default CamResults;