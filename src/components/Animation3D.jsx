import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {computePosition} from '../functions/CamComputation'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (
    props.setDegreeOfFreedom(delta, ref.current)
    ))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='grey' />
    </mesh>
  )
}

const Animation3D = (props) => {

    function changeMasterVelocityField(e)
    {
        setMasterVelocity(e.target.value);
        let time = 360.0/e.target.value
    }

    function setDegreeOfFreedom(delta, object)
    {
        if (selectedDof == 1) object.position.x = getPosition(delta); else object.position.x = 0;
        if (selectedDof == 2) object.position.y = getPosition(delta); else object.position.y = 0;
        if (selectedDof == 3) object.position.z = getPosition(delta); else object.position.z = 0;
        if (selectedDof == 4) object.rotation.x = getPosition(delta) * 3.14159/180; else object.rotation.x = 0;
        if (selectedDof == 5) object.rotation.y = getPosition(delta) * 3.14159/180; else object.rotation.y = 0;
        if (selectedDof == 6) object.rotation.z = getPosition(delta) * 3.14159/180; else object.rotation.z = 0;
    }

    function getPosition(delta)
    {
        setMasterPosition(masterPosition + masterVelocity * delta)
        let slavePosition = computePosition(masterPosition + masterVelocity * delta, props.camPoints, props.camParameters)
        return (computePosition(masterPosition + masterVelocity * delta, props.camPoints, props.camParameters))
    }

    const [selectedDof, setSelectedDof] =useState([1])
    const [masterPosition, setMasterPosition] = useState(0)
    const [masterVelocity, setMasterVelocity] = useState([100])

    return (
    <>
        <div className='centered'>
            <button className={(selectedDof == 1) ? "SelectedButtonSmall":"UnselectedButtonSmall"} onClick={() => setSelectedDof(1)}>Translation X</button>
            <button className={(selectedDof == 2) ? "SelectedButtonSmall":"UnselectedButtonSmall"} onClick={() => setSelectedDof(2)}>Translation Y</button>
            <button className={(selectedDof == 3) ? "SelectedButtonSmall":"UnselectedButtonSmall"} onClick={() => setSelectedDof(3)}>Translation Z</button>
            <button className={(selectedDof == 4) ? "SelectedButtonSmall":"UnselectedButtonSmall"} onClick={() => setSelectedDof(4)}>Rotation X</button>
            <button className={(selectedDof == 5) ? "SelectedButtonSmall":"UnselectedButtonSmall"} onClick={() => setSelectedDof(5)}>Rotation Y</button>
            <button className={(selectedDof == 6) ? "SelectedButtonSmall":"UnselectedButtonSmall"} onClick={() => setSelectedDof(6)}>Rotation Z</button>
        </div>
        <div className='centered'>
            <h3>Master velocity: {masterVelocity} °/s</h3><input type="range" defaultValue = "100" min="1" max="1000" onChange = {(e) => changeMasterVelocityField(e)}></input>
        </div>
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[0, 10, 0]} scale = {2} getPosition = {getPosition} setDegreeOfFreedom = {setDegreeOfFreedom} />
            <OrbitControls/>
        </Canvas>
    </>)
}

export default Animation3D;