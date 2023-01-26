import {
  Container,
  Heading,
  Input,
  Button,
  Box,
  FormControl,
  Stack,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FieldValues } from '..';
import PhoneIcon from '../../../common/components/PhoneIcon';

const AdminForm = () => {
  const {
    formState: { errors, dirtyFields, isValid },
    register,
  } = useFormContext<FieldValues>();

  const formatError = () => {
    if (errors.adminName && errors.phone) {
      return 'Must fill out form';
    }
    if (errors.adminName) {
      return errors.adminName?.message || 'Invalid characters in your name';
    }
    if (errors.phone) {
      return errors.phone?.message;
    }
    return null;
  };

  const isInvalid =
    (!!dirtyFields.adminName && !!errors.adminName) ||
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
            {...register('adminName', {
              pattern: /[a-z]/i,
              required: 'Must provide your name',
              maxLength: {
                value: 32,
                message: 'Too many characters in your name',
              },
            })}
            isInvalid={!!errors.adminName}
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
                required: 'Must provide your phone number',
                minLength: {
                  value: 10,
                  message: 'Phone number is incomplete',
                },
                maxLength: {
                  value: 10,
                  message: 'Phone number can only be 10 numbers long',
                },
                pattern: /[1-9]{1}[0-9]{9}/,
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
            Continue
          </Button>
        </Box>
      </Container>
    </FormControl>
  );
};

export default AdminForm;
