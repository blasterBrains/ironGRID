import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Spinner,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import Router from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import axios from '../../common/utils/api';

interface FieldPinInput {
  token: string;
}

const JoinGrid = () => {
  const [apiError, setApiError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields },
    setError,
  } = useForm<FieldPinInput>({
    mode: 'onBlur',
    defaultValues: {
      token: '',
    },
  });

  let token = useWatch({
    control,
    name: 'token',
  });

  const renderError = () => {
    if (!/^[a-zA-Z]+$/.test(token) && token !== '') {
      return (
        <FormErrorMessage>
          Grid tokens must contain only letters
        </FormErrorMessage>
      );
    }
    if (apiError) {
      return <FormErrorMessage>{apiError}</FormErrorMessage>;
    }
  };

  const onSubmit: SubmitHandler<FieldPinInput> = async (data) => {
    try {
      setLoading(true);
      setApiError(undefined);
      const token = data.token.toUpperCase();

      const response = await axios.get('/grid', {
        params: {
          token,
        },
      });

      Router.push({
        pathname: `grid/${token}`,
      });
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        setApiError(error.response?.data.reason as string);
        console.error(error.response?.data.reason);
      } else {
        setApiError('Sorry, an unexpected error occured');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!apiError || !isValid}>
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

            <FormHelperText color="white" textAlign="center" fontSize="lg">
              Join a pre-existing grid
            </FormHelperText>
          </Box>

          <HStack mx="auto">
            <Controller
              control={control}
              name="token"
              rules={{
                required: 'Please enter grid token',
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: 'Grid tokens must contain only letters',
                },
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
                  errorBorderColor="red.500"
                  type="alphanumeric"
                  size="lg"
                >
                  <PinInputField
                    autoFocus
                    color="white"
                    ref={ref}
                    textTransform="uppercase"
                  />
                  <PinInputField color="white" textTransform="uppercase" />
                  <PinInputField color="white" textTransform="uppercase" />
                  <PinInputField color="white" textTransform="uppercase" />
                </PinInput>
              )}
            />
          </HStack>

          {renderError()}
          <Box py="6" position="fixed" bottom={2}>
            <Button
              type="submit"
              size="xl"
              variant="outline"
              isDisabled={!isValid}
            >
              {loading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="yellow.300"
                  size="lg"
                ></Spinner>
              ) : (
                'Join Grid'
              )}
            </Button>
          </Box>
        </Container>
      </FormControl>
    </form>
  );
};

export default JoinGrid;
