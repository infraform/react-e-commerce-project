import { useEffect } from 'react';
import axios from '../api/axios';
import { useProduct } from '../contexts/ProductContext';

function useColor() {
  const { colors, setColors } = useProduct();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isCurrent = false;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          '/colors',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        setColors(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (!isCurrent) { fetchData(); }
    return () => {
      isCurrent = true;
    };
  }, []);
  return colors;
}

export default useColor;
