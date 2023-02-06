import {
  Container,
  Heading,
  Stack,
  Input,
  Button,
  FormControl,
  Box,
  FormHelperText,
  HStack,
  PinInput,
  PinInputField,
  FormErrorMessage,
  Link,
  Spinner,
} from '@chakra-ui/react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import Router, { useRouter } from 'next/router';
import axios from '../../common/utils/api';
import { AxiosError, isAxiosError } from 'axios';

interface Input {
  token: string;
}

export default function JoinGrid() {
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors, isValid, dirtyFields },
    setError,
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      const { token } = data;
      console.log('this is token: ', token);
      const response = await axios.get('/grid', {
        params: {
          token,
        },
      });
      console.log('this is the response: ', response);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data.reason);
      } else {
        setError('token', {
          type: 'custom',
          message: 'Sorry, an unexpected error occured',
        });
      }
    }

    // Router.push({
    //   pathname: 'grid'
    // })
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Container
          centerContent
          justifyContent="center"
          bg={'green.500'}
          minHeight="100vh"
        >
          <Box position="fixed" top={5}>
            <Heading
              fontSize={[32, 32]}
              color="white"
              textAlign="center"
              pt={[20, 24]}
              pb={[5, 10]}
            >
              Enter Grid Token
            </Heading>

            <FormHelperText color="white" textAlign="center">
              Join a pre-existing grid
            </FormHelperText>
          </Box>

          <HStack mx="auto">
            <Controller
              control={control}
              name="token"
              rules={{
                required: 'Please enter grid token',
                minLength: {
                  value: 4,
                  message: 'Invalid grid token',
                },
              }}
              render={({ field: { ref, ...restField } }) => (
                <PinInput
                  {...restField}
                  otp
                  focusBorderColor="yellow.500"
                  type="alphanumeric"
                  // placeholder="🏈"
                  size="lg"
                >
                  <PinInputField autoFocus ref={ref} color="white" />
                  <PinInputField color="white" />
                  <PinInputField color="white" />
                  <PinInputField color="white" />
                </PinInput>
              )}
            />
          </HStack>

          {/* <FormErrorMessage>{errors.message}</FormErrorMessage> */}

          <Box py="6" position="fixed" bottom={2}>
            <Button
              type="submit"
              size="xl"
              variant="outline"
              isDisabled={!isValid}
            >
              Join Grid
            </Button>
          </Box>
        </Container>
      </FormControl>
    </form>
  );
}
