import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import type { Event } from '../../../common/utils/espn';
import { formatDate } from '../../../common/utils/time';

interface GameCardProps {
  game: Event;
  onClick: (id: string) => void;
  selected?: boolean;
}

const GameCard = ({ game, onClick, selected }: GameCardProps) => {
  const onGameCardClick = () => {
    onClick(game.id);
  };

  return (
    <Card
      variant={selected ? 'selected' : 'elevated'}
      size="md"
      as="button"
      onClick={onGameCardClick}
      type="button"
    >
      <CardHeader>
        <Box>
          <Heading size="sm" color="gray.800">
            {game.note || game.group?.name}
          </Heading>
        </Box>
        <Box marginTop="1rem">
          <Text>{formatDate(game.date)}</Text>
        </Box>
      </CardHeader>
      <CardBody>
        <Box flexDirection="column">
          <Box display="flex" alignItems="center" flexDirection="column">
            <Image
              alt="away team logo"
              src={game.competitors[1].logo}
              width={100}
              height={100}
            />

            <Center mb="1rem">({game.competitors[1].record})</Center>
            <Box fontWeight={600}>
              <Text>{game.competitors[1].location}</Text>
              <Text>{game.competitors[1].name}</Text>
            </Box>
          </Box>
        </Box>

        <Flex alignContent="center" mx="1rem">
          <Center>@</Center>
        </Flex>

        <Box flexDirection="column">
          <Box display="flex" alignItems="center" flexDirection="column">
            <Image
              alt="home team logo"
              src={game.competitors[0].logo}
              width={100}
              height={100}
            />
            <Center mb="1rem">({game.competitors[0].record})</Center>
            <Box fontWeight={600}>
              <Text>{game.competitors[0].location}</Text>
              <Text>{game.competitors[0].name}</Text>
            </Box>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default GameCard;
