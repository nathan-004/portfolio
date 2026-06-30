import { useEffect, useState, useMemo } from "react";
import { useMousePosition, getWindowDimensions, useScroll } from "./Utils";

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import * as THREE from "three";

import Ascii from "./Ascii";
import Controls from "./Controls";

import "./App.css"

const rotationFrame = 0.01;

function Earth(progress) {
  let prog = progress.progress;
  const gltf = useLoader(GLTFLoader, '/models/earth.glb')
  
  const [scaleValue, setScaleValue] = useState(0.005 - prog * 0.005); 

  useFrame(() => {
    gltf.scene.rotateY(rotationFrame);
  }, 1);

  useEffect(() => {
    gltf.scene.position.x = prog * 5;
    setScaleValue(0.005 - prog * 0.005);
  }, [prog]);
  
  return (
    <primitive object={gltf.scene} scale={scaleValue}/>
  )
}

// function FlowLines(progress){
//   let scale = progress.progress;
//   const curves = useMemo(() => {
//     const curves = [];

//     for(let i = 0; i < 20; i++){
//       const start = new THREE.Vector3(
//         0,
//         0,
//         0
//       );

//       const end = new THREE.Vector3(
//         0,
//         -5,
//         0
//       );

//       const middle = new THREE.Vector3(
//         Math.random()*4 - 2,
//         Math.random()*4-5,
//         0
//       );

//       curves.push(
//         new THREE.CatmullRomCurve3([
//           start,
//           middle,
//           end
//         ])
//       );
//     }
//     return curves;
//   }, []);

//   return (
//     <group scale={[scale, scale, scale]}>
//       {curves.map((curve, index)=>(
//           <mesh key={index}>
//             <tubeGeometry
//               args={[
//                 curve,
//                 100,
//                 0.01,
//                 8,
//                 false
//               ]}
//             />
//             <meshBasicMaterial
//               color="white"
//             />
//           </mesh>
//         ))
//       }
//     </group>
//   );
// }

function Scene3D() {
  const scroll = useScroll();

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

  useEffect(() => {
    console.log(scroll);
  }, [scroll]);

  return (
    <div
      id="scene-container"
      style={{
        position: "fixed",
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
        <Earth progress={scroll}/>
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

function AboutMe() {
  return (
    <section
      style={{
        minHeight: "100vh",
        paddingTop: "100vh",
        position: "relative"
      }}
    >
      <div className="cards-container">
        <div className="card">
          <h2>À propos de moi</h2>
          <p>
            Je suis étudiant au lycée Nelson Mandela et je poursuivrai
            prochainement mes études dans le domaine de l'informatique.
          </p>
          <p>
            Passionné par les sciences et les nouvelles technologies, je
            cherche constamment à comprendre le fonctionnement des systèmes
            qui nous entourent et à explorer de nouveaux domaines.
          </p>
        </div>

        <div className="card">
          <h2>Mes centres d'intérêt</h2>
          <p>
            Je m'intéresse particulièrement à l'intelligence artificielle,
            l'informatique, l'astronomie, l'aérospatial et les technologies
            émergentes.
          </p>
          <p>
            J'apprécie comprendre les concepts en profondeur, expérimenter
            de nouvelles idées et découvrir comment la science et la
            technologie peuvent transformer notre quotidien.
          </p>
        </div>

        <div className="card">
          <h2>Ma vision</h2>
          <p>
            Je souhaite développer des compétences solides dans les domaines
            du numérique et participer à la création de solutions innovantes.
          </p>
          <p>
            Mon objectif est de continuer à apprendre, relever de nouveaux
            défis et repousser mes limites à travers des expériences
            concrètes.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <HeroPresentation />
      <Scene3D />
      <AboutMe />
    </>
  )
}