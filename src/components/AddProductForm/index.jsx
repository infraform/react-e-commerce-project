/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Formik } from 'formik';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useBrands from '../../hooks/useBrands';
import useCategories from '../../hooks/useCategories';
import useColor from '../../hooks/useColor';
import useUsingStatus from '../../hooks/useUsingStatuses';
import ImageUploader from '../ImageUploader';
import sendOffer from '../../api/sendOffer';
import formAddProductSchema from '../../constants/formSchema/formAddProductSchema';
// import DropdownItems from '../Dropdown/DropdownItems';
import ToggleSwitch from '../ToggleSwitch';
import './addProductForm.scss';
import { useProduct } from '../../contexts/ProductContext';
import axios from '../../api/axios';
import toastify from '../../helper funcs/toastify';

function AddProductForm() {
  const [categories] = useCategories();
  const brands = useBrands();
  const colors = useColor();
  const usingStatuses = useUsingStatus();
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { setProducts, setIsLoading } = useProduct();
  const myID = Cookies.get('myId');
  const navigate = useNavigate();

  const handlePreview = (file) => {
    setPreviewImage(file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleUpload = ({ file }) => {
    setFileList([file]);
  };

  const submitHandler = async (productData) => {
    setIsLoading(true);
    let mounted = true;
    try {
      if (mounted) {
        const formData = new FormData();
        formData.append('data', JSON.stringify(productData));
        if (fileList.length > 0 || fileList[0].size < 400000) {
          formData.append('files.image', fileList[0].originFileObj);
        } else {
          return;
        }
        const response = await sendOffer.post('/products', formData);
        setFileList([]);
        const newProducts = await axios('/products');
        setProducts(newProducts.data);
        navigate('/myaccount');
        mounted = false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        category: '',
        brand: '',
        color: '',
        status: '',
        price: null,
        isSold: false,
        isOfferable: false,
        users_permissions_user: myID,
      }}
      validationSchema={formAddProductSchema}
      onSubmit={(values) => {
        submitHandler(values);
      }}
    >
      {({
        values,
        handleChange,
        errors,
        handleSubmit,
        touched,
      }) => (
        <form onSubmit={handleSubmit} className="add-product-content-wrapper">
          <div className="add-product-content-detail-wrapper">
            <div className="add-product-content-detail">
              <h1>Ürün Detayları</h1>
              <div className="form-row">
                <label htmlFor="name">
                  Ürün Adı

                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Örnek: Iphone 12 Pro Max"
                  maxLength="100"
                  className={touched.name && errors?.name ? 'not-valid' : ''}
                />
              </div>
              <div className="form-row">
                <label htmlFor="description">
                  Açıklama

                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Ürün açıklaması giriniz"
                  value={values.description}
                  maxLength="500"
                  onChange={handleChange}
                  className={touched.description && errors?.description ? 'not-valid' : ''}
                />
              </div>

              <div className="form-row-multi">
                <div className="input-group">
                  <label htmlFor="category"> Kategori</label>
                  <select className={touched.category && errors.category ? 'custom-select not-valid ' : 'custom-select'} name="category" id="category" value={values.category} onChange={handleChange}>
                    <option value="">Kategori Seç</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="brand">
                    Marka
                  </label>
                  <select className={touched.brand && errors.brand ? 'custom-select not-valid ' : 'custom-select'} name="brand" id="brand" value={values.brand} onChange={handleChange}>
                    <option value="">Marka Seç</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.name}>{brand.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row-multi">
                <div className="input-group">
                  <label htmlFor="color">Renk</label>
                  <select className={touched.color && errors.color ? 'custom-select not-valid ' : 'custom-select'} name="color" id="color" value={values.color} onChange={handleChange}>
                    <option value="">Renk Seç</option>
                    {colors.map((color) => (
                      <option key={color.id} value={color.name}>{color.name}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="status">Kullanım Durumu</label>
                  <select className={touched.status && errors.status ? 'custom-select not-valid ' : 'custom-select'} name="status" id="status" value={values.status} onChange={handleChange}>
                    <option value="">Kullanım Durumu Seç</option>
                    {usingStatuses.map((Status) => (
                      <option key={Status.id} value={Status.name}>{Status.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row price-row">
                <label htmlFor="price">Fiyat</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className={touched.status && errors?.price ? 'not-valid' : 'price'}
                  placeholder="Bir fiyat girin"
                  value={values.price}
                  onChange={handleChange}
                />
                <p className={touched.status && errors?.price ? 'not-valid-ico' : ''}>TL</p>
                {errors?.price && (
                <span>0-9 Arasında Bir Rakam Girin </span>
                )}
              </div>
              <div className="form-row offer-row">
                {values.isOfferable ? (
                  <label htmlFor="offeropt" className="offeropt-active">
                    Fiyat ve teklif Opsiyonu
                    {' '}
                  </label>
                ) : (
                  <label htmlFor="offeropt" className="offeropt">
                    Teklif Opsiyonu
                    {' '}
                  </label>
                )}
                <ToggleSwitch value={values.isOfferable} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="right-side">
            <ImageUploader handleUpload={handleUpload} handlePreview={handlePreview} />
            <button type="submit" className="save-btn">
              Kaydet
            </button>
          </div>
        </form>
      )}
    </Formik>

  );
}

export default AddProductForm;
