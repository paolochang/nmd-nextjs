import { createRef, useEffect, useState, useRef } from "react";

const scrollRef = createRef();

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => {
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current === null) {
      scrollRef.current = 0;
      setScrollPosition(0);
    }
    if (scrollPosition !== 0 && scrollRef.current !== null) {
      scrollRef.current = scrollPosition;
    }
  }, [scrollPosition]);

  const resetScrollPosition = () => {
    setScrollPosition(0);
    scrollRef.current = 0;
    window.scrollTo(0, 0);
  };

  const retainScrollPosition = () => {
    window.scrollTo(0, scrollRef.current);
  };

  return { scrollPosition, resetScrollPosition, retainScrollPosition };
};

export default useScrollPosition;
