import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {computePosition} from '../functions/CamComputation'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y = props.getPosition(delta) * 3.14159/180))
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

    function getPosition(delta)
    {
        setMasterPosition(masterPosition + masterVelocity * delta)
        let slavePosition = computePosition(masterPosition + masterVelocity * delta, props.camPoints, props.camParameters)
        return (computePosition(masterPosition + masterVelocity * delta, props.camPoints, props.camParameters))
    }

    const [selectedTab, setSelectedTab] =useState([1])
    const [masterPosition, setMasterPosition] = useState(0)
    const [masterVelocity, setMasterVelocity] = useState([100])

    return (
    <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} scale = {2} getPosition = {getPosition} />
        <OrbitControls />
    </Canvas>)
}

export default Animation3D;