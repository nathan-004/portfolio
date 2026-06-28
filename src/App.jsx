import { useEffect, useState } from "react";
import { useMousePosition, getWindowDimensions } from "./Utils";

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import * as THREE from "three";

import Ascii from "./Ascii";
import Controls from "./Controls";

import "./App.css"

function Model() {
  const gltf = useLoader(GLTFLoader, '/models/earth.glb')

  useFrame(() => {
    gltf.scene.rotateY(0.01);
  }, 1);
  
  return (
    <Center>
      <primitive object={gltf.scene} scale={0.005}/>
    </Center>
  )
}

function Scene3D() {
  const MIN_LUM_POS = [-5, 5, 0];
  const MAX_LUM_POS = [5, -5, 1];

  const [leftPos, setLeftPos] = useState(750);
  const [lumPos, setLumPos] = useState([5, 5, 5]);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const sizes = getWindowDimensions();

    setLumPos([
      MIN_LUM_POS[0] + (mousePosition.x * (MAX_LUM_POS[0] - MIN_LUM_POS[0]) / sizes.width),
      MIN_LUM_POS[1] + (mousePosition.y * (MAX_LUM_POS[1] - MIN_LUM_POS[1]) / sizes.height),
      MIN_LUM_POS[2] + (mousePosition.x * (MAX_LUM_POS[2] - MIN_LUM_POS[2]) / sizes.width)
    ]);
  }, [mousePosition]);

  return (
    <div
      id="scene-container"
      style={{
        position: "absolute",
        left: `${leftPos}px`,
        top: 0,
        width: `calc(100vw - ${leftPos}px)`,
        height: "100vh"
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          background:"transparent"
        }}
      >
        <ambientLight intensity={1} />

        <directionalLight
          position={lumPos}
          intensity={5}
        />
        <Model />
        <Ascii />
      </Canvas>
    </div>
  )
}

function HeroPresentation() {
  return (
    <div className="presentationContainer" style={{color: "var(--textColor)"}}>
      <h1>Nathan Beslard</h1>
      <ul className="roles">
        <li>Développeur</li>
        <li>Explorateur numérique</li>
      </ul>
      <p>Je transforme des idées en expériences interactives avec le code, l'intelligence artificielle et la 3D.</p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <HeroPresentation />
      <Scene3D />
    </>
  )
}