import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createHotel } from 'apiSdk/hotels';
import { hotelValidationSchema } from 'validationSchema/hotels';
import { StartupInterface } from 'interfaces/startup';
import { getStartups } from 'apiSdk/startups';
import { HotelInterface } from 'interfaces/hotel';

function HotelCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: HotelInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createHotel(values);
      resetForm();
      router.push('/hotels');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<HotelInterface>({
    initialValues: {
      name: '',
      price: 0,
      location: '',
      availability: false,
      rating: 0,
      startup_id: (router.query.startup_id as string) ?? null,
    },
    validationSchema: hotelValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Hotels',
              link: '/hotels',
            },
            {
              label: 'Create Hotel',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Hotel
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Price"
            formControlProps={{
              id: 'price',
              isInvalid: !!formik.errors?.price,
            }}
            name="price"
            error={formik.errors?.price}
            value={formik.values?.price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <FormControl
            id="availability"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.availability}
          >
            <FormLabel htmlFor="switch-availability">Availability</FormLabel>
            <Switch
              id="switch-availability"
              name="availability"
              onChange={formik.handleChange}
              value={formik.values?.availability ? 1 : 0}
            />
            {formik.errors?.availability && <FormErrorMessage>{formik.errors?.availability}</FormErrorMessage>}
          </FormControl>

          <NumberInput
            label="Rating"
            formControlProps={{
              id: 'rating',
              isInvalid: !!formik.errors?.rating,
            }}
            name="rating"
            error={formik.errors?.rating}
            value={formik.values?.rating}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<StartupInterface>
            formik={formik}
            name={'startup_id'}
            label={'Select Startup'}
            placeholder={'Select Startup'}
            fetcher={getStartups}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/hotels')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'hotel',
    operation: AccessOperationEnum.CREATE,
  }),
)(HotelCreatePage);
