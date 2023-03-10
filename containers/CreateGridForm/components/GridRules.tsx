import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import Payouts from '../../../common/components/Payouts';
import type { FieldValues } from '../../CreateGridForm';

const GridRules = () => {
  const {
    formState: { errors, dirtyFields, isValid },
    setValue,
    register,
    control,
    clearErrors,
  } = useFormContext<FieldValues>();

  const gridSize = useWatch({
    control,
    name: 'size',
    defaultValue: 0,
  });

  const squareCost = useWatch({
    control,
    name: 'cost',
    defaultValue: 1,
  });

  const reverse = useWatch({
    control,
    name: 'reverse',
    defaultValue: false,
  });

  const isInvalid =
    (!!dirtyFields.title && !!errors.title) ||
    (!!dirtyFields.size && !!errors.size) ||
    (!!dirtyFields.cost && !!errors.cost) ||
    (!!dirtyFields.reverse && !!errors.reverse);

  const formatError = () => {
    if (errors.title && errors.size && errors.cost && errors.reverse) {
      return 'Must fill out form';
    }
    if (errors.title) {
      return errors.title?.message || 'Invalid characters in your grid title';
    }
    if (errors.size) {
      return errors.size?.message;
    }
    if (errors.cost) {
      return errors.cost?.message;
    }
    if (errors.reverse) {
      return errors.reverse?.message;
    }
    return null;
  };

  const { onChange, ...restOfCostFormProps } = register('cost', {
    setValueAs: (v) => parseInt(v),
  });

  const onCostChange = (value: number) => {
    setValue('cost', value);
  };

  return (
    <FormControl isInvalid={isInvalid}>
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
          Configure Rules
        </Heading>

        <Stack spacing={6} mt={[180, 240]} width="100%" px={5}>
          <Input
            {...register('title', {
              required: 'Must provide a grid name',
              onChange: () => {
                if (errors.title) {
                  clearErrors();
                }
              },
              minLength: {
                value: 3,
                message: 'Must be at least 3 characters',
              },
              maxLength: {
                value: 40,
                message: 'Must be less than 40 characters',
              },
              pattern: {
                value: /^[A-Za-z\s]*$/,
                message: 'Invalid characters in your grid name',
              },
            })}
            placeholder="Grid Title"
            isInvalid={!!errors.title}
            type="text"
          />

          <Select
            {...register('size', {
              required: 'Must choose a grid size',
              setValueAs: (v) => parseInt(v),
            })}
            isInvalid={!!errors.size}
            defaultValue=""
            textColor={!gridSize ? 'gray.400' : undefined}
          >
            <option hidden disabled value="">
              Grid Size
            </option>
            <option value={100}>10x10</option>
            <option value={25}>5x5</option>
          </Select>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Popover>
                <Text color="white" size="sm" fontWeight={600}>
                  Reverse Payouts
                </Text>
                <PopoverTrigger>
                  {/* create helper button and popover themes */}
                  <Button
                    size="xs"
                    width={5}
                    mt={3}
                    ml={2}
                    variant="solid"
                    borderRadius="50%"
                  >
                    ?
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Reverse Payouts</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    The person with reversed winning scores also wins
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Switch {...register('reverse')} mx="5" size="lg" />
          </Box>

          <Box display="flex" alignItems="center">
            <Popover>
              <Text color="white" size="sm" fontWeight={600}>
                Price per square
              </Text>
              <PopoverTrigger>
                {/* create helper button and popover themes */}
                <Button
                  size="xs"
                  width={5}
                  mt={3}
                  ml={2}
                  variant="solid"
                  borderRadius="50%"
                >
                  ?
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Price per square</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  {`The price it will cost for a person to secure a square. Note that the price can not be modified later`}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>

          <Box pt={6} pb={0}>
            <Slider
              {...restOfCostFormProps}
              defaultValue={1}
              min={1}
              max={100}
              step={1}
              onChange={onCostChange}
            >
              <SliderMark
                value={squareCost || 1}
                textAlign="center"
                mt="-10"
                ml="-6"
                w="12"
              >
                ${squareCost}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </Box>

          <FormErrorMessage>{formatError()}</FormErrorMessage>

          {gridSize && squareCost ? (
            <Payouts gridSize={gridSize} cost={squareCost} reverse={reverse} />
          ) : null}
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

export default GridRules;
