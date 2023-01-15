import { Container, Heading, Button, Text } from '@chakra-ui/react';

export default function Landing() {
  const vertCenterFullHeight = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' as 'column',
    height: '100vh',
  };
  return (
    <Container {...vertCenterFullHeight} bg="#5e95b5">
      <Heading m={10} color="gray">
        ironGRID
      </Heading>
      <Text color="#daebf5">Create a square pool and invite friends to play</Text>
      <Button mx={5} my={5} bg='#daebf5'>
        Create a grid
      </Button>
      <Button mx={5} my={5} bg='#daebf5'>Join a grid</Button>
    </Container>
  );
}
