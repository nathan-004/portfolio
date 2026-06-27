import { useEffect } from "react";

import { OrbitControls } from "three/examples/jsm/Addons.js";
import { useThree } from "@react-three/fiber";

export default function Controls() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.enableDamping = true;

    return () => controls.dispose();
  }, [camera, gl]);

  return null;
}