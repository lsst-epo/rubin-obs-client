import { useState, useRef, useEffect } from "react";
export default function useBbox() {
  const ref = useRef();
  const [box, setBoundingBox] = useState({});
  const [windowSize, setWindowSize] = useState({});

  const set = () => {
    const box = ref && ref.current ? ref.current.getBoundingClientRect() : {};
    setBoundingBox(box);
  };

  useEffect(() => {
    set();
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    function handleResize() {
      // Set window width/height to state
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      set();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [box, windowSize, ref];
}
