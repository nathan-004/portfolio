import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";


export default function Ascii() {

  const { gl, scene, camera, size } = useThree();

  const effect = useRef(null);

  useEffect(() => {
    effect.current = new AsciiEffect(
      gl,
      ` .:-=+*#%@ `,
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
    effect.current.domElement.style.left = "-1%";

    effect.current.domElement.style.width = "52%";
    effect.current.domElement.style.height = "100%";

    effect.current.domElement.style.color = "white";
    effect.current.domElement.style.backgroundColor = "var(--backgroundColor)";

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

      scene.rotateY(0.01);
    }

  }, 1);

  return null;
}