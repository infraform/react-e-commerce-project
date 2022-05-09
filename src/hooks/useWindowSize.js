import { useLayoutEffect, useState } from 'react';

const useWindowSize = () => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.addEventListener('resize', updateSize);
  }, []);

  return [width, height];
};

export default useWindowSize;
