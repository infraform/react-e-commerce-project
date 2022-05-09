import React from 'react';
import AddProductForm from '../../components/AddProductForm';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import { useProduct } from '../../contexts/ProductContext';
import './addProduct.scss';

function AddProduct() {
  const { isLoading } = useProduct();
  return (
    <>
      <Navbar />
      <section>{isLoading && <Loading />}</section>
      <div className="add-product-container">
        <div className="add-product-wrapper">
          <div className="add-product">
            <div className="add-product-content">
              <AddProductForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
