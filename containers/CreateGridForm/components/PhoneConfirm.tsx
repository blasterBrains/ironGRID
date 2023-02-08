import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  HStack,
  Link,
  PinInput,
  PinInputField,
  Spinner,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import type { FieldValues } from '../../CreateGridForm';

interface OwnProps {
  onResendCode: (phone: string, resending?: boolean) => void;
  resentCode: boolean;
  loading: boolean;
}

const PhoneConfirm = ({ onResendCode, resentCode, loading }: OwnProps) => {
  const {
    formState: { errors, isValid, dirtyFields },
    control,
    getValues,
  } = useFormContext<FieldValues>();

  const onResendCodeClick = () => {
    const phone = getValues('phone');
    if (phone) {
      onResendCode(phone, true);
    }
  };

  return (
    <FormControl isInvalid={!!dirtyFields.short_code && !!errors.short_code}>
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
            Enter code
          </Heading>

          <FormHelperText color="white" maxWidth={[60, 80]} textAlign="center">
            Enter the verification short code we sent to the phone number you
            provided
          </FormHelperText>
        </Box>

        <HStack mx="auto">
          <Controller
            control={control}
            name="short_code"
            rules={{
              required: 'Please enter pin code',
              minLength: {
                value: 6,
                message: 'Invalid pin code',
              },
            }}
            render={({ field: { ref, ...restField } }) => (
              <PinInput
                {...restField}
                otp
                focusBorderColor="yellow.500"
                errorBorderColor="red.500"
              >
                <PinInputField autoFocus ref={ref} color="white" />
                <PinInputField color="white" />
                <PinInputField color="white" />
                <PinInputField color="white" />
                <PinInputField color="white" />
                <PinInputField color="white" />
              </PinInput>
            )}
          />
        </HStack>

        <FormErrorMessage>{errors.short_code?.message}</FormErrorMessage>

        <Box
          position="fixed"
          bottom={5}
          zIndex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Link color="yellow.300" mb={5} onClick={onResendCodeClick}>
            Resend code
          </Link>
          {resentCode ? (
            <FormHelperText
              color="white"
              maxWidth={[60, 80]}
              textAlign="center"
            >
              Code has been resent
            </FormHelperText>
          ) : null}
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
              'Create Grid'
            )}
          </Button>
        </Box>
      </Container>
    </FormControl>
  );
};

export default PhoneConfirm;
