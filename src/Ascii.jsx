import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";


export default function Ascii() {

  const { gl, scene, camera, size } = useThree();

  const effect = useRef(null);


  useEffect(() => {

    effect.current = new AsciiEffect(
      gl,
      ` .:,'-^=*+?!|0#X%WM@`,
      {
        invert: true
      }
    );


    effect.current.setSize(
      size.width,
      size.height
    );

    effect.current.domElement.className = "ascii";

    effect.current.domElement.style.position = "absolute";
    effect.current.domElement.style.top = "0";
    effect.current.domElement.style.left = "0";

    effect.current.domElement.style.width = "100%";
    effect.current.domElement.style.height = "100%";

    effect.current.domElement.style.color = "white";
    effect.current.domElement.style.backgroundColor = "black";

    document.body.appendChild(
      effect.current.domElement
    );


    return () => {
      document.body.removeChild(
        effect.current.domElement
      );

    };


  }, [gl]);



  useFrame(() => {

    if(effect.current){

      effect.current.render(
        scene,
        camera
      );

    }

  }, 1);


  return null;
}