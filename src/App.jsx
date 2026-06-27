import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import * as THREE from "three";

function Model() {
  const gltf = useLoader(GLTFLoader, '/models/earth.glb')

  return (
    <Center>
      <primitive object={gltf.scene} scale={0.005}/>
    </Center>
  )
}

function Scene3D() {
  return (
    <Canvas style={{ height: "100vh", background: "black" }}>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={5}/>
      <Model />
      <OrbitControls />
    </Canvas>
  )
}

export default function App() {
  return (
    <>
      <Scene3D />
    </>
  )
}