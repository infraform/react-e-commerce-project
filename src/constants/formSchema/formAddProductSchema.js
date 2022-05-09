import * as Yup from 'yup';

const formAddProductSchema = Yup.object().shape({
  name: Yup
    .string()
    .required('Ürün adı boş bırakılamaz.'),
  description: Yup
    .string()
    .required('Ürün açıklaması boş bırakılamaz.'),
  color: Yup
    .string()
    .required('Ürün rengi boş bırakılamaz.'),
  brand: Yup
    .string()
    .required('Ürün markası boş bırakılamaz.'),
  price: Yup
    .number(),
  category: Yup
    .string()
    .required('Ürün kategorisi boş bırakılamaz.'),
  status: Yup
    .string()
    .required('Ürün durumu boş bırakılamaz.'),
});

export default formAddProductSchema;
