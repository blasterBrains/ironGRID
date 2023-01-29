import { Button, Center, Container, Heading, useTheme } from '@chakra-ui/react';
import Link from 'next/link';
import LogoIcon from '../../common/components/LogoIcon';

export default function Landing() {
  const { colors } = useTheme();

  return (
    <Center bg={colors.green['500']} minHeight="100vh">
      <Container centerContent>
        <LogoIcon fill={colors.white} width={280} />
        <Heading
          fontSize={['5xl', '6xl']}
          mt={[8, 10]}
          mb={[2, 10]}
          color={colors.white}>
          ironGRID
        </Heading>

        <Container py="6" centerContent>
          <Heading
            fontSize={[16, 20]}
            color={colors.white}
            textAlign="center"
            px={[10, 20]}>
            Build a football square pool and share it with your friends!
          </Heading>
        </Container>

        <Container py="6" centerContent position="fixed" bottom={2}>
          <Link href="/create-grid">
            <Button size="xl">Build</Button>
          </Link>
          <Button size="xl" variant="outline">
            Join
          </Button>
        </Container>
      </Container>
    </Center>
  );
}
