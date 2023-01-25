import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldValues } from '../../CreateGridForm';

const GridRules = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [squareCost, setSquareCost] = useState(1);

  const {
    formState: { errors },
    getValues,
    setValue,
    register,
  } = useFormContext<FieldValues>();

  return (
    <FormControl isInvalid={false}>
      <Container centerContent bg={'green.500'} minHeight="100vh">
        <FormLabel>ironGRID Name</FormLabel>
        <Input
          {...register('name', {
            required: true,
            minLength: 3,
            maxLength: 40,
            pattern: /^[A-Za-z\s]*$/,
          })}
          placeholder="Enter ironGRID Name"
          my="10"
        />
        <Heading>Grid Size</Heading>
        <Select
          my="10"
          {...register('size', {
            setValueAs: (v) => parseInt(v),
          })}
        >
          <option value={100}>10x10</option>
          <option value={25}>5x5</option>
        </Select>
        <Heading>Square Cost</Heading>
        <Slider
          {...register('cost', {
            setValueAs: (v) => parseInt(v),
          })}
          defaultValue={1}
          min={1}
          max={100}
          step={1}
          onChange={(val) => setSquareCost(val)}
          mt="10"
        >
          <SliderMark
            value={squareCost}
            textAlign="center"
            bg="blue.500"
            color="white"
            mt="-10"
            ml="-5"
            w="12"
          >
            ${squareCost}
          </SliderMark>
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <Text>You cant change this later</Text>
        <Container>
          <Button onClick={onOpen} size="xs">
            ?
          </Button>
          <Heading size="md">Reverse Payouts?</Heading>
          <Switch
            {...register('inverse')}
            id="reverse-payout"
            mx="5"
            size="lg"
          />
        </Container>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Reverse Payouts</ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              The person with each team scores reverse outcome also wins
            </ModalBody>

            <ModalFooter>
              {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button type="submit" size="lg" my="10" variant="outline">
          Next
        </Button>
      </Container>
    </FormControl>
  );
};

export default GridRules;

// the person with each team score's reverse outcome also wins
