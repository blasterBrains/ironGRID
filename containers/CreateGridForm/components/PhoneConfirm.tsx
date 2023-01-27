import {
  Container,
  Heading,
  FormControl,
  Stack,
  Input,
  HStack,
  PinInput,
  PinInputField,
  Spacer,
  Box,
  Button,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import type { FieldValues } from '../../CreateGridForm';

const PhoneConfirm = () => {
  const {
    register,
    formState: { errors, isValid },
    setValue,
  } = useFormContext<FieldValues>();

  const { onChange, ...restOfInputProps } = register('short_code', {
    required: 'Must enter the short code',
  });

  const onPinInputChange = (value: string) => {
    onChange({ target: { value } });
    return value;
  };

  return (
    <FormControl isInvalid={false}>
      <Container centerContent bg={'green.500'} minHeight="100vh">
        <Heading
          position="fixed"
          top={5}
          fontSize={[32, 32]}
          color="white"
          textAlign="center"
          pt={[20, 24]}
          pb={[16, 28]}
        >
          Enter code
        </Heading>

        <Stack spacing={6} mt={[180, 240]} width="100%" px={5}>
          <HStack mx="auto">
            <PinInput onChange={onPinInputChange} {...restOfInputProps} otp>
              <PinInputField autoFocus />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
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

export default PhoneConfirm;
