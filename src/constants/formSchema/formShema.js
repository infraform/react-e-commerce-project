import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  email: Yup
    .string(),
  password: Yup
    .string(),

});

export default formSchema;
