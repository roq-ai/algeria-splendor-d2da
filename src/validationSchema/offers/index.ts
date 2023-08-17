import * as yup from 'yup';

export const offerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  price: yup.number().integer().nullable(),
  availability: yup.boolean().nullable(),
  rating: yup.number().integer().nullable(),
  startup_id: yup.string().nullable(),
});
