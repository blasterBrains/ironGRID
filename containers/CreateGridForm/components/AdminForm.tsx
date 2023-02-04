import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import type { FieldValues } from '..';
import PhoneIcon from '../../../common/components/PhoneIcon';

const AdminForm = () => {
  const {
    formState: { errors, dirtyFields, isValid },
    register,
    clearErrors,
  } = useFormContext<FieldValues>();

  const formatError = () => {
    if (errors.name && errors.phone) {
      return 'Must fill out form';
    }
    if (errors.name) {
      return errors.name?.message || 'Invalid characters in your name';
    }
    if (errors.phone) {
      return errors.phone?.message;
    }
    return null;
  };

  const isInvalid =
    (!!dirtyFields.name && !!errors.name) ||
    (!!dirtyFields.phone && !!errors.phone);

  return (
    <FormControl isInvalid={isInvalid}>
      <Container
        centerContent
        bg="green.500"
        minHeight="100vh"
        justifyContent="center"
      >
        <Heading
          position="fixed"
          top={5}
          fontSize={[32, 32]}
          color="white"
          textAlign="center"
          pt={[20, 32]}
          pb={[16, 28]}
        >
          Register to Play
        </Heading>

        <Stack spacing={6}>
          <Input
            {...register('name', {
              onChange: () => {
                if (errors.name) {
                  clearErrors();
                }
              },
              pattern: {
                value: /^[A-Za-z\s]*$/,
                message: 'Invalid characters in your name',
              },
              required: 'Must provide your name',
              maxLength: {
                value: 32,
                message: 'Too many characters in your name',
              },
            })}
            isInvalid={!!errors.name}
            variant="outline"
            placeholder="Name"
            type="text"
          />
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <PhoneIcon fill="white" width={18} />
            </InputLeftElement>
            <Input
              {...register('phone', {
                onChange: () => {
                  if (errors.phone) {
                    clearErrors();
                  }
                },
                required: 'Must provide your phone number',
                minLength: {
                  value: 10,
                  message: 'Phone number is incomplete',
                },
                maxLength: {
                  value: 10,
                  message: 'Phone number can only be 10 numbers long',
                },
                pattern: {
                  // either not allow dashes at all or allow dashes in number
                  value: /^[1-9]{1}[0-9]{9}$/,
                  message: 'Invalid characters in your phone number',
                },
              })}
              type="number"
              placeholder="Phone Number"
              isInvalid={!!errors.phone}
            />
          </InputGroup>
          {!isInvalid ? (
            <FormHelperText color="white" maxWidth={[60, 80]}>
              Your phone number is needed to log in and access your grids.
            </FormHelperText>
          ) : (
            <FormErrorMessage>{formatError()}</FormErrorMessage>
          )}
        </Stack>

        <Box position="fixed" bottom={5} zIndex={1}>
          <Button
            type="submit"
            size="xl"
            variant="outline"
            isDisabled={!isValid}
          >
            Get Access Code
          </Button>
        </Box>
      </Container>
    </FormControl>
  );
};

export default AdminForm;
