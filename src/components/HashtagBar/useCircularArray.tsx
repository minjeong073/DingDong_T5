import { useEffect, useState } from 'react';

const useCircularArray = <T extends any>(array: T[]): T[] => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % array.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [array.length]);

  return array.slice(index).concat(array.slice(0, index)) as T[];
};

export default useCircularArray;