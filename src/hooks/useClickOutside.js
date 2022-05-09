import { useEffect, useState } from 'react';

function useClickOutside(ref) {
  const [isOutsideClicked, setIsOutsideClicked] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOutsideClicked(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return [isOutsideClicked, setIsOutsideClicked];
}

export default useClickOutside;
