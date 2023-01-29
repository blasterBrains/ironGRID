import {
  Container,
  Grid as ChakraGrid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import type { Grids } from '@prisma/client';

interface OwnProps {
  token: string;
}

const mockGridData: Grids = {
  id: 123456789,
  name: 'Saca La Bolsita',
  cost: 25,
  size: 25,
  token: 'HTAC',
  inverse: false,
  first: null,
  second: null,
  third: null,
  final: null,
};

const Grid = ({ token }: OwnProps) => {
  return (
    <Container
      centerContent
      bg="green.500"
      minHeight="100vh"
      justifyContent="center"
    >
      <Heading
        position="fixed"
        top={5}
        fontSize={[32, 32]}
        color="white"
        textAlign="center"
        pt={[20, 32]}
        pb={[16, 28]}
      >
        {mockGridData.name}
      </Heading>
      <ChakraGrid
        w="100%"
        gap={1}
        templateColumns={`repeat(${Math.sqrt(mockGridData.size)}, 1fr)`}
        templateRows={`repeat(${Math.sqrt(mockGridData.size)}, 1fr)`}
      >
        {Array.apply(null, Array(mockGridData.size)).map((v, i) => (
          <GridItem key={i} w="100%" h={12} bg="white" />
        ))}
      </ChakraGrid>
    </Container>
  );
};

export default Grid;
