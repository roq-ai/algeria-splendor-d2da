import * as yup from 'yup';

export const flightValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().nullable(),
  origin: yup.string().nullable(),
  destination: yup.string().nullable(),
  departure_time: yup.date().nullable(),
  arrival_time: yup.date().nullable(),
  startup_id: yup.string().nullable(),
});
