import { Container, Heading, Input, Button, Text } from '@chakra-ui/react';
import type { CreateGridPage } from '../../CreateGridForm';

const vertCenterFullHeight = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column' as 'column',
  height: '100vh',
};

const AdminForm = () => {
  return (
    <Container {...vertCenterFullHeight} bg="#5e95b5">
      <Heading>Admin Name</Heading>
      <Input placeholder="Enter your Name" my="10" />
      <Heading>Phone Number</Heading>
      <Input placeholder="Enter your Number" my="10" />
      <Button>Submit</Button>
      <Text>Submit to receive 6 digit authentication code via text</Text>
    </Container>
  );
};

export default AdminForm;
