import React, { useEffect, useState } from 'react';
import '../assets/Mechanics.css'; // Import the CSS file for styling

const CodeGeneration = ({camPoints}) => {
    
    const [type, setType] = useState("Custom")
    const [camName, setCamName] = useState("stCam")
    const [resultText, setResultText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

    const updateResultText = () => {
        let text = "";
        switch (type)
        {
            case 'Custom':
                text += "[<br/>"
                for (let i = 0; i < camPoints.length-1; i++)
                {
                    text += "   {<br/>"
                    text += "       \"StartMasterPosition\":    "+camPoints[i]["x"]+",<br />"
                    text += "       \"EndMasterPosition\":    "+camPoints[i+1]["x"]+",<br />"
                    text += "       \"StartSlavePosition\":    "+camPoints[i]["y"]+",<br />"
                    text += "       \"EndSlavePosition\":    "+camPoints[i+1]["y"]+",<br />"
                    text += "       \"StartSlaveVelocity\":    "+camPoints[i]["v"]+",<br />"
                    text += "       \"EndSlaveVelocity\":    "+camPoints[i+1]["v"]+",<br />"
                    text += "       \"StartSlaveAcceleration\":    "+camPoints[i]["a"]+",<br />"
                    text += "       \"EndSlaveAcceleration\":    "+camPoints[i+1]["a"]+",<br />"
                    text += "       \"SegmentType\":    \""+camPoints[i+1]["type"]+"\",<br />"
                    text += "       \"Parameters\": [0,0,0,0,0,0]<br />"
                    if (i == camPoints.length-2)
                        text += "   }<br/>"
                    else
                        text += "   },<br/>"
                }
                text += "]<br/>"
                break;
            case 'Siemens S7-1500 Cam Advanced':
                text += camName+".NumberOfElements := "+(camPoints.length-1)+";<br /><br />"
                for (let i = 0; i < camPoints.length-1; i++)
                {
                    text += camName+".CamPoints["+i+"].inflectionPointParameter := 0.5;<br />"
                    switch (camPoints[i+1]['type'])
                    {
                        case "Straight": text += camName+".CamPoints["+i+"].camProfileType := \"LCAMHDL_PROFILE_CONST_VELO\";<br />"
                            break;
                        case "Poly5": text += camName+".CamPoints["+i+"].camProfileType := \"LCAMHDL_PROFILE_POLY_5\";<br />"
                            break;
                    }
                    
                    text += camName+".CamPoints["+i+"].leadingValueStart := "+camPoints[i]["x"]+";<br />"
                    text += camName+".CamPoints["+i+"].leadingValueEnd := "+camPoints[i+1]["x"]+";<br />"
                    text += camName+".CamPoints["+i+"].followingValueStart := "+camPoints[i]["y"]+";<br />"
                    text += camName+".CamPoints["+i+"].followingValueEnd := "+camPoints[i+1]["y"]+";<br />"
                    text += camName+".CamPoints["+i+"].geoVeloStart := "+camPoints[i]["v"]+";<br />"
                    text += camName+".CamPoints["+i+"].geoVeloEnd := "+camPoints[i+1]["v"]+";<br />"
                    text += camName+".CamPoints["+i+"].geoAccelStart := "+camPoints[i]["a"]+";<br />"
                    text += camName+".CamPoints["+i+"].geoAccelEnd := "+camPoints[i+1]["a"]+";<br />"
                    text += camName+".CamPoints["+i+"].geoJerkStart := 0.0;<br />"
                    text += camName+".CamPoints["+i+"].geoJerkEnd := 0.0;<br />"
                    text +=  "<br />"
                }
                break;
        }

        setResultText(text);
    };

    useEffect(() => {
        updateResultText();
    }, [type, camName, camPoints]);

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };


    return (
        <div className="mechanics-container">

            <div className="form-group inline">
                <label>Type</label>
                <select value={type} onChange={handleTypeChange} className="form-control">
                    <>
                        <option value="Custom">Custom</option>
                        <option value="Siemens S7-1500 Cam Advanced">Siemens S7-1500</option>
                    </>
                </select>
            </div>
            <div className="form-group inline">
                <label>Cam Name</label>
                <div className="input-with-unit">
                    <input type="text" value={camName} onChange={(e) => setCamName(e.target.value)} className="form-control" />
                </div>
            </div>

            <div className="result-text">
                <p dangerouslySetInnerHTML={{ __html: resultText }}></p>
            </div>
        </div>
    );
};

export default CodeGeneration;