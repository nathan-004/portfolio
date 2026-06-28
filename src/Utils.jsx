import { useState, useEffect } from "react"; 

export const useMousePosition = () => {
  // https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/  
  const [
    mousePosition,
    setMousePosition
  ] = useState({ x: null, y: null });

  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

// Source - https://stackoverflow.com/a/36862446
// Posted by QoP, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-28, License - CC BY-SA 4.0

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function useScroll() {
  const [scroll,setScroll] = useState(0);

  useEffect(()=>{
    const update = ()=>{
      setScroll(
        window.scrollY /
        window.innerHeight
      );
    };

    window.addEventListener("scroll", update);

    return ()=> window.removeEventListener("scroll", update);
  },[]);

  return scroll;
}