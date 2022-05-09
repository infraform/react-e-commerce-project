import { useEffect } from 'react';
import axios from '../api/axios';
import { useProduct } from '../contexts/ProductContext';

function useUsingStatus() {
  const { usingStatus, setUsingStatus } = useProduct();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isCurrent = false;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          '/using-statuses',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        setUsingStatus(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (!isCurrent) { fetchData(); }
    return () => {
      isCurrent = true;
    };
  }, []);
  return usingStatus;
}

export default useUsingStatus;
