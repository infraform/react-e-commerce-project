import { useEffect } from 'react';
import axios from '../api/axios';
import { useProduct } from '../contexts/ProductContext';

function useCategories() {
  const { categories, setCategories } = useProduct();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isCurrent = false;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          '/categories',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const { data } = response;
        setCategories(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (!isCurrent) { fetchData(); }
    return () => {
      isCurrent = true;
    };
  }, []);
  return [categories];
}

export default useCategories;
