import * as yup from 'yup';

export const carValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().nullable(),
  location: yup.string().nullable(),
  availability: yup.boolean().nullable(),
  rating: yup.number().integer().nullable(),
  startup_id: yup.string().nullable(),
});
