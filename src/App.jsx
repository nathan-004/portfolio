import { useState } from "react";

import { Canvas, useLoader } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import * as THREE from "three";

import Ascii from "./Ascii";
import Controls from "./Controls";

import "./App.css"

function Model() {
  const gltf = useLoader(GLTFLoader, '/models/earth.glb')

  return (
    <Center>
      <primitive object={gltf.scene} scale={0.005}/>
    </Center>
  )
}

function Scene3D() {
  const [leftPos, setLeftPos] = useState(750);

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
        <ambientLight intensity={2} />

        <directionalLight
          position={[5,5,5]}
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