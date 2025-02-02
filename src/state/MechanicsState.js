import { useState } from 'react';

const useMechanicsState = () => {
    const [actuationType, setActuationType] = useState('Rotative');
    const [movementType, setMovementType] = useState('Linear');
    const [unitOfMeasure, setUnitOfMeasure] = useState('mm');
    const [gearRatio, setGearRatio] = useState(1.0);
    const [motorInertia, setMotorInertia] = useState(0.01);
    const [motorMass, setMotorMass] = useState(0.1);
    const [loadInertia, setLoadInertia] = useState(1.0);
    const [loadMass, setLoadMass] = useState(1.0);
    const [linearDevelopment, setLinearDevelopment] = useState(20);
    const [isVertical, setIsVertical] = useState('False');
    const [masterSetpointVelocity, setMasterSetpointVelocity] = useState(360);

    return {
        actuationType, setActuationType,
        movementType, setMovementType,
        unitOfMeasure, setUnitOfMeasure,
        gearRatio, setGearRatio,
        motorInertia, setMotorInertia,
        motorMass, setMotorMass,
        loadInertia, setLoadInertia,
        loadMass, setLoadMass,
        linearDevelopment, setLinearDevelopment,
        isVertical, setIsVertical,
        masterSetpointVelocity, setMasterSetpointVelocity
    };
};

export default useMechanicsState;
