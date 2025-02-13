import React, { useEffect, useState } from 'react';
import ReportGenerator from './ReportGeneration';
import '../assets/Mechanics.css'; // Import the CSS file for styling

const Mechanics = ({ mechanicsState, camData, graphData }) => {
    const {
        actuationType, setActuationType,
        movementType, setMovementType,
        unitOfMeasure, setUnitOfMeasure,
        gearRatio, setGearRatio,
        motorInertia, setMotorInertia,
        motorMass, setMotorMass,
        loadInertia, setLoadInertia,
        loadMass, setLoadMass,
        linearDevelopment, setLinearDevelopment,
        isVertical , setIsVertical,
        masterSetpointVelocity, setMasterSetpointVelocity
    } = mechanicsState;

    const [resultText, setResultText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

    const updateResultText = () => {
        let text = "";
        let movementRun = Math.max(...camData['y']) - Math.min(...camData['y']);
        let meanVelocity = masterSetpointVelocity*camData['v'].reduce((acc, val) => acc + Math.abs(val), 0) / camData['v'].length;
        let maxVelocity = masterSetpointVelocity*Math.max(...camData['v'].map(val => Math.abs(val)));
        let meanAcceleration = masterSetpointVelocity*masterSetpointVelocity*camData['a'].reduce((acc, val) => acc + Math.abs(val), 0) / camData['a'].length;
        let maxAcceleration = masterSetpointVelocity*masterSetpointVelocity*Math.max(...camData['a'].map(val => Math.abs(val)));

        text = `Movement Run: ${movementRun.toFixed(2)} ${unitOfMeasure}<br />`;
        text += `Mean Velocity: ${meanVelocity.toFixed(2)} ${unitOfMeasure}/s<br />`;
        text += `Max Velocity: ${maxVelocity.toFixed(2)} ${unitOfMeasure}/s<br />`;
        text += `Mean Acceleration: ${meanAcceleration.toFixed(2)} ${unitOfMeasure}/s²<br />`;
        text += `Max Acceleration: ${maxAcceleration.toFixed(2)} ${unitOfMeasure}/s²<br />`;
        text += `<br />`;

        let totalInertia = 0
        let rmsTorque = 0
        let maxTorque = 0
        if (actuationType === 'Rotative') 
        {
            if (movementType === 'Rotative')
            {
                totalInertia = motorInertia + loadInertia / (gearRatio * gearRatio);
                let motorSideAcceleration = camData['a'].map(x => x * masterSetpointVelocity * masterSetpointVelocity * gearRatio);
                if (unitOfMeasure === 'deg')
                    motorSideAcceleration = motorSideAcceleration.map(x => x * Math.PI / 180);
                
                let torque = motorSideAcceleration.map(x => x * totalInertia);
                rmsTorque = Math.sqrt(torque.reduce((acc, val) => acc + val * val, 0) / torque.length);
                maxTorque = Math.max(...torque.map(val => Math.abs(val)));

            }
            if (movementType === 'Linear')
            {
                let radius = 0
                switch (unitOfMeasure)
                {
                    case 'm':
                        radius = linearDevelopment / (2 * Math.PI);
                        break;
                    case 'mm':
                        radius = linearDevelopment / (2 * Math.PI) / 1000.0;
                    case 'inch':
                        radius = linearDevelopment / (2 * Math.PI) / 39.3701;
                }
                totalInertia = motorInertia + loadMass * radius * radius / (gearRatio * gearRatio);
                let motorSideAcceleration = camData['a'].map(x => x * masterSetpointVelocity * masterSetpointVelocity * gearRatio / radius);
                
                if (unitOfMeasure === 'mm')
                    motorSideAcceleration = motorSideAcceleration.map(x => x / 1000.0);
                if (unitOfMeasure === 'inch')
                    motorSideAcceleration = motorSideAcceleration.map(x => x /39.3701);
                
                let torque = motorSideAcceleration.map(x => x * totalInertia);
                rmsTorque = Math.sqrt(torque.reduce((acc, val) => acc + val * val, 0) / torque.length);
                maxTorque = Math.max(...torque.map(val => Math.abs(val)));
            }
            text += `Total Inertia: ${totalInertia.toFixed(2)} Kg*m²<br />`;
            text += `RMS Torque: ${rmsTorque.toFixed(2)} Nm<br />`;
            text += `Max Torque: ${maxTorque.toFixed(2)} Nm<br />`;
        }
        else
        {
            let totalInertia = 0
            let rmsTorque = 0
            let maxTorque = 0
            if (movementType === 'Rotative')
            {
                totalInertia = motorMass * linearDevelopment * linearDevelopment / 12;
            }
            else
            {
                totalInertia = loadMass + motorMass;
                console.log(totalInertia)
                let motorSideAcceleration = camData['a'].map(x => x * masterSetpointVelocity * masterSetpointVelocity);
                let torque = motorSideAcceleration.map(x => x * totalInertia);
                rmsTorque = Math.sqrt(torque.reduce((acc, val) => acc + val * val, 0) / torque.length);
                maxTorque = Math.max(...torque.map(val => Math.abs(val)));
            }
            text += `Total Inertia: ${totalInertia} Kg<br />`;
            text += `RMS Force: ${rmsTorque.toFixed(2)} N<br />`;
            text += `Max Force: ${maxTorque.toFixed(2)} N<br />`;
        }

        setResultText(text);
    };

    useEffect(() => {
        updateResultText();
    }, [actuationType, movementType, unitOfMeasure, gearRatio, motorInertia, motorMass, loadInertia, loadMass, linearDevelopment, isVertical, masterSetpointVelocity]);

    const handleActuationTypeChange = (e) => {
        setActuationType(e.target.value);
    };

    const handleMovementTypeChange = (e) => {
        setMovementType(e.target.value);
        if (e.target.value === 'Rotative') {
            setUnitOfMeasure('deg');
        } else {
            setUnitOfMeasure('mm');
        }
    };

    const handleUnitOfMeasureChange = (e) => {
        setUnitOfMeasure(e.target.value);
    };

    const handleIsVerticalChange = (e) => {
        setIsVertical(e.target.value);
    };

    const handleMasterSetpointVelocityChange = (e) => {
        setMasterSetpointVelocity(e.target.value);
    };

    return (
        <div className="mechanics-container">
            <div className="form-group inline">
                <label>Master Setpoint Velocity</label>
                <div className="input-with-unit">
                    <input type="number" value={masterSetpointVelocity} onChange={handleMasterSetpointVelocityChange} className="form-control" />
                    <span className="unit">°/s</span>
                </div>
            </div>

            <div className="form-group inline">
                <label>Actuation Type</label>
                <select value={actuationType} onChange={handleActuationTypeChange} className="form-control">
                    <option value="Rotative">Rotative Actuation</option>
                    <option value="Linear">Linear Actuation</option>
                </select>
            </div>

            <div className="form-group inline">
                <label>Movement Type</label>
                <select value={movementType} onChange={handleMovementTypeChange} className="form-control">
                    <option value="Rotative">Rotative Movement</option>
                    <option value="Linear">Linear Movement</option>
                </select>
            </div>

            <div className="form-group inline">
                <label>Unit of Measure</label>
                <select value={unitOfMeasure} onChange={handleUnitOfMeasureChange} className="form-control">
                    {movementType === 'Rotative' ? (
                        <>
                            <option value="deg">deg</option>
                            <option value="rad">rad</option>
                        </>
                    ) : (
                        <>
                            <option value="mm">mm</option>
                            <option value="m">m</option>
                            <option value="inch">inch</option>
                        </>
                    )}
                </select>
            </div>

            {actuationType === 'Rotative' && (
                <>
                    <div className="form-group inline">
                        <label>Gear Ratio</label>
                        <input type="number" value={gearRatio} onChange={(e) => setGearRatio(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group inline">
                        <label>Motor Inertia</label>
                        <div className="input-with-unit">
                            <input type="number" value={motorInertia} onChange={(e) => setMotorInertia(e.target.value)} className="form-control" />
                            <span className="unit">Kg*m^2</span>
                        </div>
                    </div>
                </>
            )}

            {actuationType === 'Linear' && (
                <div className="form-group inline">
                    <label>Motor Mass</label>
                    <div className="input-with-unit">
                        <input type="number" value={motorMass} onChange={(e) => setMotorMass(e.target.value)} className="form-control" />
                        <span className="unit">Kg</span>
                    </div>
                </div>
            )}

            {movementType === 'Rotative' && (
                <div className="form-group inline">
                    <label>Load Inertia</label>
                    <div className="input-with-unit">
                        <input type="number" value={loadInertia} onChange={(e) => setLoadInertia(e.target.value)} className="form-control" />
                        <span className="unit">Kg*m^2</span>
                    </div>
                </div>
            )}

            {movementType === 'Linear' && (
                <div className="form-group inline">
                    <label>Load Mass</label>
                    <div className="input-with-unit">
                        <input type="number" value={loadMass} onChange={(e) => setLoadMass(e.target.value)} className="form-control" />
                        <span className="unit">Kg</span>
                    </div>
                </div>
            )}

            {actuationType !== movementType && (
                <div className="form-group inline">
                    <label>Linear Development</label>
                    <div className="input-with-unit">
                        <input type="number" value={linearDevelopment} onChange={(e) => setLinearDevelopment(e.target.value)} className="form-control" />
                        <span className="unit">{unitOfMeasure}</span>
                    </div>
                </div>
            )}

            {movementType === 'Linear' && (
                <div className="form-group inline">
                    <label>Vertical Movement</label>
                    <select value={isVertical} onChange={handleIsVerticalChange} className="form-control">
                        <option value="False">False</option>
                        <option value="True">True</option>
                    </select>
                </div>
            )}

            <div className="result-text">
                <p dangerouslySetInnerHTML={{ __html: resultText }}></p>
            </div>
            <ReportGenerator graphData = {graphData} />
        </div>
    );
};

export default Mechanics;