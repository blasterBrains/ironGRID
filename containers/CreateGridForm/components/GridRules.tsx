import {
  Container,
  Heading,
  Text,
  Input,
  Select,
  Slider,
  SliderTrack,
  Box,
  Button,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Switch,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { CreateGridPage } from '../../CreateGridForm';
import { useFormContext } from 'react-hook-form';

const vertCenterFullHeight = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column' as 'column',
  height: '100vh',
};

const GridRules = () => {
  const [sliderValue, setSliderValue] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getValues } = useFormContext();

  return (
    <Container {...vertCenterFullHeight} bg="#5e95b5">
      <Heading>ironGRID Name</Heading>
      <Input placeholder="Enter ironGRID Name" my="10" />
      <Heading>Grid Size</Heading>
      <Select my="10">
        <option value="10x10">10x10</option>
        <option value="5x5">5x5</option>
      </Select>
      <Heading>Square Cost</Heading>
      <Slider
        defaultValue={1}
        min={1}
        max={100}
        step={1}
        onChange={(val) => setSliderValue(val)}
        mt="10"
      >
        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          ${sliderValue}
        </SliderMark>
        <SliderTrack bg="red.100">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <Text>You cant change this later</Text>
      <FormControl display="flex" alignItems="center" my="10">
        <Button onClick={onOpen} size="xs">
          ?
        </Button>
        <Heading size="md">Reverse Payouts?</Heading>
        <Switch id="reverse-payout" mx="5" size="lg" />
      </FormControl>
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
      <Button size="lg" my="10">
        Next
      </Button>
    </Container>
  );
};

export default GridRules;

// the person with each team score's reverse outcome also wins
