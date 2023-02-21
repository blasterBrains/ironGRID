import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Heading,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FieldValues } from '..';

const ChooseSport = () => {
  const {
    formState: { errors, isValid },
    register,
    control,
  } = useFormContext<FieldValues>();

  const sport = useWatch({
    control,
    name: 'sport',
  });

  return (
    <FormControl>
      <Container centerContent bg={'green.500'} minHeight="100vh">
        <Container
          zIndex={1}
          position="fixed"
          centerContent
          bg="green.500"
          background="none"
          bgGradient="linear(to-t, rgba(77, 161, 103, 0.8), 10%, green.500)"
        >
          <Heading
            fontSize={[32, 32]}
            color="white"
            textAlign="center"
            pt={[20, 32]}
            pb={[12, 22]}
          >
            Choose Sport
          </Heading>
          <FormHelperText color="white">
            Select which sport you would like to create a grid for
          </FormHelperText>

          <Stack spacing={6} mt={[180, 240]} width="100%" px={5}>
            <Select
              {...register('sport', {
                required: 'Must choose a sport',
              })}
              isInvalid={!!errors.sport}
              defaultValue=""
              textColor={!sport ? 'gray.400' : undefined}
            >
              <option hidden disabled value="">
                Sport
              </option>
              <option value="nfl">NFL</option>
              <option value="nba">NBA</option>
            </Select>
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
      </Container>
    </FormControl>
  );
};

export default ChooseSport;
