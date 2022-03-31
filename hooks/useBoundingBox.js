import { useState, useRef, useEffect } from "react";
export default function useBbox() {
  const ref = useRef();
  const [box, setBoundingBox] = useState({});

  const set = () => {
    const box = ref && ref.current ? ref.current.getBoundingClientRect() : {};
    setBoundingBox(box);
  };

  useEffect(() => {
    set();

    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [box, ref];
}
