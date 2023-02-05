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
        <Box>
          <Text>{scores[0]}</Text>
          <Text>/</Text>
          <Text>{scores[1]}</Text>
        </Box>
      );
    }
    return <Text>{`${scores[0]} / ${scores[1]}`}</Text>;
  }
  return <Text>{scores[0]}</Text>;
};

const Grid = ({ token }: OwnProps) => {
  const gridSize = Math.sqrt(mockGridData.size);

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
        {mockGridData.title}
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
          <GridItem key={`x_values_${i}`} bg="white" textAlign="center">
            <GridScore
              scores={
                gridSize === 10
                  ? [mockGridData.x_values[i]]
                  : [mockGridData.x_values[i], mockGridData.x_values[i + 1]]
              }
            />
          </GridItem>
        ))}

        {/* Left team banner */}
        <GridItem rowSpan={gridSize} bg="white" />

        {/* Main grid including y values column */}
        {Array.apply(null, Array(mockGridData.size + gridSize)).map((v, i) => {
          const isYValue = i % (gridSize + 1) === 0;
          const yIndex = i / (gridSize + 1);
          return (
            <GridItem
              key={isYValue ? `y_values_${i}` : i}
              h={gridSize === 5 ? 12 : 12}
              bg="white"
            >
              {isYValue
                ? `${mockGridData.y_values[yIndex][0]} / ${mockGridData.y_values[yIndex][1]}`
                : null}
            </GridItem>
          );
        })}
      </ChakraGrid>
    </Container>
  );
};

export default Grid;
