import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  TableContainer,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { calculatePayouts } from '../../../common/utils/payouts';
import type { FieldValues } from '../../CreateGridForm';

const GridRules = () => {
  const {
    formState: { errors, dirtyFields, isValid },
    getValues,
    setValue,
    register,
    setError,
    control,
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

  const inverse = useWatch({
    control,
    name: 'inverse',
    defaultValue: false,
  });

  const isInvalid =
    (!!dirtyFields.name && !!errors.name) ||
    (!!dirtyFields.size && !!errors.size) ||
    (!!dirtyFields.cost && !!errors.cost) ||
    (!!dirtyFields.inverse && !!errors.inverse);

  const formatError = () => {
    if (errors.name && errors.size && errors.cost && errors.inverse) {
      return 'Must fill out form';
    }
    if (errors.name) {
      return errors.name?.message || 'Invalid characters in your name';
    }
    if (errors.size) {
      return errors.size?.message;
    }
    if (errors.cost) {
      return errors.cost?.message;
    }
    if (errors.inverse) {
      return errors.inverse?.message;
    }
    return null;
  };

  const { onChange, ...restOfCostFormProps } = register('cost', {
    setValueAs: (v) => parseInt(v),
  });

  const onCostChange = (value: number) => {
    setValue('cost', value);
  };

  const payouts = gridSize && calculatePayouts(squareCost, gridSize, inverse);

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

        <Stack spacing={6} mt={[180, 240]}>
          <Input
            {...register('name', {
              required: 'Must provide a grid name',
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
            placeholder="Grid Name"
            isInvalid={!!errors.name}
          />

          <Select
            {...register('size', {
              required: 'Must choose a grid size',
              setValueAs: (v) => parseInt(v),
            })}
            isInvalid={!!errors.size}
            defaultValue=""
          >
            <option style={{ color: 'gray' }} hidden disabled value="">
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
                  Inversed Payouts
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
                  <PopoverHeader>Inversed Payouts</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    The person with inversed winning scores also wins
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Switch
              {...register('inverse')}
              id="inverse-payout"
              mx="5"
              size="lg"
            />
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

          {payouts ? (
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th> </Th>
                    <Th>1st</Th>
                    <Th>2nd</Th>
                    <Th>3rd</Th>
                    <Th>Final</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight={600} fontSize="xs" color="yellow.500">
                      Payout
                    </Td>
                    <Td>${payouts.first}</Td>
                    <Td>${payouts.second}</Td>
                    <Td>${payouts.third}</Td>
                    <Td>${payouts.fourth}</Td>
                  </Tr>
                  {inverse ? (
                    <Tr>
                      <Td fontWeight={600} fontSize="xs" color="yellow.500">
                        Inverse
                      </Td>
                      <Td>${payouts.firstInverse}</Td>
                      <Td>${payouts.secondInverse}</Td>
                      <Td>${payouts.thirdInverse}</Td>
                      <Td>${payouts.fourthInverse}</Td>
                    </Tr>
                  ) : null}
                </Tbody>
              </Table>
            </TableContainer>
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

// the person with each team score's inverse outcome also wins
/*
First Quarter Payout 20%
Half Time Payout 20%
Third Quarter Payout 20%
Final Payout 40%

First Quarter Payout 15%
First Quarter Inversed Payout 5%
Half Time Payout 15%
Half Time Inversed Payout 5%
Third Quarter Payout 15%
Third Quarter Inversed Payout 5%
Final Payout 30%
Final Inversed Payout 10%


*/