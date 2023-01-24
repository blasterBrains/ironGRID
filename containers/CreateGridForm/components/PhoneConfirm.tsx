import { Container, Heading, Input, Button, Text } from '@chakra-ui/react';
import type { CreateGridPage } from '../../CreateGridForm';

const vertCenterFullHeight = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column' as 'column',
  height: '100vh',
};

// use chakra pin input
const PhoneConfirm = () => {
  return (
    <Container {...vertCenterFullHeight} bg="#5e95b5">
      <Heading>Enter 6-digit authentication code</Heading>
      <Input placeholder="xxx xxx" mt="5" mb="2" />
      <Text mb="20">You should receive one via text</Text>
      {/* <Button my='10'>Submit</Button> */}
      <Button size="sm">Re-send Authentication Code</Button>
    </Container>
  );
};

export default PhoneConfirm;
