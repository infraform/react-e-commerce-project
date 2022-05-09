/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../api/axios';
import sendOffer from '../api/sendOffer';

const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState('Hepsi');
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [usingStatus, setUsingStatus] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [givenOffers, setGivenOffers] = useState([]);
  const [receivedOffers, setReceivedOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const moreClick = (item) => {
    setIsLoading(true);
    let mounted = true;
    try {
      if (mounted) {
        navigate(`/productdetail/${item?.id}`);
        setProduct(item);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    return () => {
      mounted = false;
    };
  };

  const getProducts = async () => {
    setIsLoading(true);
    let mounted = true;
    try {
      if (mounted) {
        const response = await axios.get('/products');
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    return () => {
      mounted = false;
    };
  };

  const handleGivenOffers = async () => {
    setIsLoading(true);
    let mounted = true;
    try {
      if (mounted) {
        const myID = Cookies.get('myId');
        const response = await axios.get(
          `/offers?users_permissions_user=${myID}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${Cookies?.get('token')}`,
            },
          },
        );
        const newGivenOffers = response.data.filter((item) => item.product !== null);

        setGivenOffers(newGivenOffers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    return () => {
      mounted = false;
    };
  };
  const handleReceivedOffers = async () => {
    setIsLoading(true);
    let mounted = true;
    try {
      if (mounted) {
        const myID = Cookies.get('myId');
        const response = await sendOffer.get(
          `/products?users_permissions_user=${myID}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${Cookies?.get('token')}`,
            },
          },
        );
        setReceivedOffers(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    handleGivenOffers();
    handleReceivedOffers();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        products,
        setProducts,
        product,
        setProduct,
        moreClick,
        categories,
        setCategories,
        colors,
        setColors,
        brands,
        setBrands,
        usingStatus,
        setUsingStatus,
        getProducts,
        givenOffers,
        setGivenOffers,
        receivedOffers,
        setReceivedOffers,
        handleGivenOffers,
        handleReceivedOffers,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useProduct() {
  return useContext(ProductContext);
}

export { ProductContext, ProductProvider, useProduct };
