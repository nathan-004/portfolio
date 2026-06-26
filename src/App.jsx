import { useEffect, useRef } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function App() {

  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      1,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    const controls = new OrbitControls(
      camera,
      renderer.domElement
    );

    controls.enableDamping = true; // mouvement plus fluide
    controls.dampingFactor = 0.05;

    controls.enableZoom = true;
    controls.enablePan = true;

  controls.target.set(0, 0, 0);
  controls.update();

    mountRef.current.appendChild(renderer.domElement);

    // Lumière
    // const light = new THREE.DirectionalLight(
    //   0xffffff,
    //   10
    // );

    // light.position.set(5,5,5);

    // scene.add(light);

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const loader = new GLTFLoader();

    let earth;

    loader.load(
      "./models/earth.glb",
      (gltf)=>{
        earth = gltf.scene;

        const box = new THREE.Box3().setFromObject(earth);
        const size = box.getSize(new THREE.Vector3());

        console.log("Taille modèle :", size);

        const maxSize = Math.max(
          size.x,
          size.y,
          size.z
        );

        earth.scale.setScalar(5 / maxSize);
        earth.position.set(0, 0, 0);

        scene.add(earth);
      }
    );

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if(earth){
        earth.rotation.y += 0.005;
      }

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      if(
        mountRef.current &&
        renderer.domElement
      ){

        mountRef.current.removeChild(
          renderer.domElement
        );

      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width:"100vw",
        height:"100vh",
        overflow:"hidden"
      }}
    />
  );
}