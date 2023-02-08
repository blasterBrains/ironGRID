import {
  Box,
  Container,
  Grid as ChakraGrid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';
import type { Grid } from '@prisma/client';

interface OwnProps {
  token: string;
  grid: Grid & { x_values: number[]; y_values: number[] };
}

const mockGridData: Grid & { x_values: number[]; y_values: number[] } = {
  id: '123456789',
  title: 'Saca La Bolsita',
  cost: 100,
  size: 25,
  token: 'HTAC',
  reverse: false,
  first: null,
  second: null,
  third: null,
  final: null,
  game_id: '12353',
  creator_id: '13243',
  x_values: [4, 3, 1, 9, 2, 7, 8, 6, 5, 0],
  y_values: [1, 3, 2, 7, 6, 9, 0, 5, 4, 8],
};

const reduceScores = (scores: number[], size: number = 10) => {
  if (size === 10) {
    return scores.reduce((acc: number[][], curr: number) => {
      acc.push([curr]);
      return acc;
    }, []);
  }
  return scores.reduce<number[][]>((acc, current, index) => {
    if (index % 2 === 0) {
      acc.push([current, scores[index + 1]]);
    }
    return acc;
  }, []);
};

const GridScore = ({
  scores = [],
  isYValue = false,
}: {
  scores: number[];
  isYValue?: boolean;
}) => {
  if (!scores.length) return null;
  if (scores.length === 2) {
    if (isYValue) {
      return (
        <Box
          display="flex"
          position="relative"
          justifyContent="center"
          alignItems="center"
          h="100%"
        >
          <Text position="absolute" top={1} left={1}>
            {scores[0]}
          </Text>
          <Text position="absolute" top={0} left={0} bottom={0} right={0}>
            /
          </Text>
          <Text position="absolute" bottom={1} right={1}>
            {scores[1]}
          </Text>
        </Box>
      );
    }
    return <Text>{`${scores[0]} / ${scores[1]}`}</Text>;
  }
  return <Text>{scores[0]}</Text>;
};

const Grid = ({ token, grid = mockGridData }: OwnProps) => {
  const gridSize = Math.sqrt(grid.size);
  const x_values = reduceScores(grid.x_values, gridSize);
  const y_values = reduceScores(grid.y_values, gridSize);

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
        {grid.title}
      </Heading>
      <ChakraGrid
        w="100%"
        gap={1}
        templateColumns={`60px 25px repeat(${gridSize}, 1fr)`}
        templateRows={`60px 25px repeat(${gridSize}, 1fr)`}
      >
        {/* Left top corner */}
        <GridItem colSpan={2} rowSpan={2} bg="green.500" />

        {/* Top team banner */}
        <GridItem colSpan={gridSize} bg="white" />

        {/* x values row */}
        {Array.apply(null, Array(gridSize)).map((v, i) => (
          <GridItem
            key={`x_values_${i}`}
            bg="white"
            textAlign="center"
            fontSize="xs"
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <GridScore scores={x_values[i]} />
          </GridItem>
        ))}

        {/* Left team banner */}
        <GridItem rowSpan={gridSize} bg="white" />

        {/* Main grid including y values column */}
        {Array.apply(null, Array(grid.size + gridSize)).map((v, i) => {
          const isYValue = i % (gridSize + 1) === 0;
          const yIndex = i / (gridSize + 1);
          return (
            <GridItem
              key={isYValue ? `y_values_${i}` : i}
              h={gridSize === 5 ? 12 : 12}
              bg="white"
              fontSize="xs"
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {isYValue ? (
                <GridScore scores={y_values[yIndex]} isYValue />
              ) : (
                <Text fontSize={10} color="green.500">
                  Available
                </Text>
              )}
            </GridItem>
          );
        })}
      </ChakraGrid>
    </Container>
  );
};

export default Grid;
