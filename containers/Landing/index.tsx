import { Button, Center, Container, Heading, useTheme } from '@chakra-ui/react';
import * as React from 'react';
import LogoIcon from '../../common/components/LogoIcon';
import { IronGridContext } from '../../common/context';
import useActions from '../../common/context/hooks/useActions';

export default function Landing() {
  const { colors } = useTheme();
  const { state } = React.useContext(IronGridContext);

  const { createGrid, deleteGrid } = useActions();

  console.log(state);
  return (
    <Center bg={colors.green['500']} minHeight='100vh'>
      <Container centerContent>
        <LogoIcon fill={colors.white} width={280} />
        <Heading
          fontSize={['5xl', '6xl']}
          mt={[8, 10]}
          mb={[2, 10]}
          color={colors.white}>
          ironGRID
        </Heading>

        <Container py='6' centerContent>
          <Heading
            fontSize={[16, 20]}
            color={colors.white}
            textAlign='center'
            px={[10, 20]}>
            Build a football square pool and share it with your friends!
          </Heading>
        </Container>

        <Container py='6' centerContent position='fixed' bottom={2}>
          <Button size='xl' onClick={createGrid}>
            Build
          </Button>
          <Button size='xl' variant='outline' onClick={() => deleteGrid(1)}>
            Join
          </Button>
        </Container>
      </Container>
    </Center>
  );
}
