import { useEffect } from 'react';
import axios from '../api/axios';
import { useProduct } from '../contexts/ProductContext';

function useBrands() {
  const { brands, setBrands } = useProduct();

  useEffect(() => {
    let isCurrent = false;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          '/brands',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        setBrands(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (!isCurrent) { fetchData(); }
    return () => {
      isCurrent = true;
    };
  }, []);
  return brands;
}

export default useBrands;
