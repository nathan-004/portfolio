import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";


export default function Ascii() {

  const { gl, scene, camera, size } = useThree();

  const effect = useRef(null);


  useEffect(() => {

    effect.current = new AsciiEffect(
      gl,
      " .:-=+*#%@ ",
      {
        invert: true
      }
    );

    // taille réelle du Canvas
    effect.current.setSize(
      size.width,
      size.height
    );


    const el = effect.current.domElement;

    el.className = "ascii";

    el.style.position = "absolute";
    el.style.top = "0";
    el.style.left = "-1%";

    // moitié gauche du Canvas
    el.style.width = "52%";
    el.style.height = "100%";

    el.style.color = "white";
    el.style.backgroundColor = "var(--backgroundColor)";

    el.style.pointerEvents = "auto";

   document
    .getElementById("scene-container")
    .appendChild(
        effect.current.domElement
    );

    return () => {

      if(el.parentNode){
        el.parentNode.removeChild(el);
      }

    };

  }, [gl, size]);

  useFrame(() => {
    if(effect.current){
      effect.current.render(
        scene,
        camera
      );

      scene.rotateY(0.01);
    }
  }, 1);
  return null;

}