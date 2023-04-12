import { useState } from 'react'
import '../assets/Animation.css'
import {changeAnimationDuration} from '../functions/Animation'
import Gear from '../icons/Gear.svg';

const Animation2D = () => {

    function changeMasterVelocityField(e)
    {
        setMasterVelocity(e.target.value);
        let time = 360.0/e.target.value
        changeAnimationDuration(time.toFixed(2).toString() + "s");
    }

    const [selectedTab, setSelectedTab] =useState([1])
    const [masterVelocity, setMasterVelocity] = useState([100])

  return (
    <div>
    <div className='centered'>
        <button className={(selectedTab == 1) ? "SelectedButton":"UnselectedButton"} onClick={() => setSelectedTab(1)}>Rotative</button>
        <button className={(selectedTab == 2) ? "SelectedButton":"UnselectedButton"} onClick={() => setSelectedTab(2)}>Linear</button>
    </div>
    
    <div className='centered'>
        <h3>Master velocity: {masterVelocity} °/s</h3><input type="range" defaultValue = "100" min="1" max="1000" onChange = {(e) => changeMasterVelocityField(e)}></input>
    </div>
    <img src={Gear} className="App-gear" alt="Gear" />
    <h3 className="Text-gear"></h3>
    </div>
    );
  };

export default Animation2D;
