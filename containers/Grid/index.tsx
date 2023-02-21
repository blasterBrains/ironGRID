import {
  Box,
  Button,
  Container,
  Grid as ChakraGrid,
  GridItem,
  Heading,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps } from 'next';
import { Event, getGame } from '../../common/utils/espn';
import type { ParsedUrlQuery } from 'querystring';
import { formatDate } from '../../common/utils/time';
import type {
  GridWithSquaresAndCreator,
  SquareWithOwner,
} from '../../common/types';
import Payouts from '../../common/components/Payouts';
import SquareModal from './components/SquareModal';
import { useCallback, useState } from 'react';

interface QueryParams extends ParsedUrlQuery {
  token: string;
}

interface OwnProps {
  grid?: GridWithSquaresAndCreator;
  game?: Event;
}

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
  if (!scores.length) return <Text>TBD</Text>;
  if (scores.length === 2) {
    if (isYValue) {
      return (
        <Box position="relative" w="100%" h="100%" display="flex">
          <Text position="absolute" top={1} left={1}>
            {scores[0]}
          </Text>
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
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

const Grid = ({ grid, game }: OwnProps & QueryParams) => {
  console.log({ grid, game });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedSquare, setSelectedSquare] = useState<
    SquareWithOwner | undefined
  >();

  const onSquareClick = (square?: SquareWithOwner) => {
    setSelectedSquare(square);
    onOpen();
  };

  // Render our 404 response
  if (!grid || !game) {
    return (
      <Container
        centerContent
        bg="green.500"
        minHeight="100vh"
        justifyContent="center"
      >
        <Text>Sorry, we could not find the grid you are looking for.</Text>
      </Container>
    );
  }

  const gridSize = Math.sqrt(grid.size);
  const x_values = reduceScores(grid.x_values, gridSize);
  const y_values = reduceScores(grid.y_values, gridSize);
  let yIndex = 0;

  return (
    <Container mt={20} bg="green.500" minHeight="100vh" justifyContent="center">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={10}
      >
        <Heading fontSize={[32, 32]} color="white" textAlign="center">
          {grid.title}
        </Heading>
        <Text color="white" mb={5}>{`by ${grid.creator.name}`}</Text>
        <Heading fontSize={18} color="white">
          {game.notes[0]?.headline || game.group?.name}
        </Heading>
        <Text color="white" mb={5}>
          {formatDate(game.date)}
        </Text>
        <Text color="white">{`$${grid.cost} per square`}</Text>
      </Box>
      <ChakraGrid
        w="100%"
        gap={1}
        templateColumns={`60px 25px repeat(${gridSize}, 1fr)`}
        templateRows={`60px 25px repeat(${gridSize}, 1fr)`}
      >
        {/* Left top corner */}
        <GridItem colSpan={2} rowSpan={2} bg="green.500" />

        {/* Top team banner */}
        <GridItem
          colSpan={gridSize}
          bg={`#${game.competitors[0].team.color}`}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Image
            src={game.competitors[0].team.logos[3].href}
            alt="Home Team Logo"
            w={14}
            fontSize="xs"
          />
          <Text color="white">{game.competitors[0].team.displayName}</Text>
        </GridItem>

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
        <GridItem
          rowSpan={gridSize}
          bg={`#${game?.competitors[1].team.color}`}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDirection="column"
          pt={3}
        >
          <Image
            src={game.competitors[1].team.logos[3].href}
            alt="Home Team Logo"
            w={14}
            fontSize="xs"
          />
          <Text ml={1} color="white">
            {game.competitors[1].team.displayName}
          </Text>
        </GridItem>

        {/* Main grid including y values column */}
        {Array.apply(null, Array(grid.size + gridSize)).map((v, i) => {
          // `isYValue` is a boolean that determines whether the current
          // square in this iteration is the left score column box
          const isYValue = i % (gridSize + 1) === 0;
          yIndex = isYValue ? i / (gridSize + 1) : yIndex;
          const squareIndex = i - (yIndex + 1);
          const currentSquare = grid.squares[squareIndex];
          return (
            <GridItem
              key={isYValue ? `y_values_${i}` : i}
              h={gridSize === 5 ? 12 : 10}
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
                <Button
                  fontSize={10}
                  color="green.500"
                  p={0}
                  m={0}
                  fontWeight={400}
                  w="100%"
                  h="100%"
                  borderRadius={0}
                  onClick={() => onSquareClick(currentSquare)}
                >
                  {currentSquare?.owner
                    ? currentSquare.owner.name
                    : 'Available'}
                </Button>
              )}
            </GridItem>
          );
        })}
      </ChakraGrid>

      {/* Modal to appear when user clicks on square */}
      <SquareModal isOpen={isOpen} onClose={onClose} square={selectedSquare} />

      {/* Payout display */}
      <Payouts cost={grid.cost} gridSize={grid.size} reverse={grid.reverse} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<
  OwnProps,
  QueryParams
> = async (context) => {
  const { token = '' } = context.params || {};
  const prisma = new PrismaClient();

  try {
    const grid =
      (await prisma.grid.findFirst({
        where: { token: token.toUpperCase() },
        include: {
          squares: {
            include: {
              owner: true,
            },
          },
          creator: true,
        },
      })) || undefined;

    if (!grid) {
      return { props: {} };
    }
    const game = await getGame(grid.game_id, grid.sport);
    return {
      props: {
        game,
        grid,
      },
    };
  } catch (error) {
    console.error('Error fetching Grid.tsx server side props:', error);
    return { props: {} };
  }
};

export default Grid;
