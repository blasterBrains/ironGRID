import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { Event } from '../../../common/utils/espn';
import { getUpcomingGames } from '../../../common/utils/espn';
import type { FieldValues } from '../../CreateGridForm';
import GameCard from './GameCard';

const ChooseGame = () => {
  const [selectedGame, setSelectedGame] = useState<string | undefined>();
  const [upcomingGames, setUpcomingGames] = useState<Event[]>([]);
  const [gamesLoading, setGamesLoading] = useState(false);

  const {
    formState: { errors },
    setValue,
    register,
    control,
  } = useFormContext<FieldValues>();

  const sport = useWatch({
    control,
    name: 'sport',
  });

  const fetchUpcomingGames = useCallback(async () => {
    setGamesLoading(true);
    try {
      const games = await getUpcomingGames(sport);
      console.log(games);
      setUpcomingGames(games);
      setGamesLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [sport]);

  const handleGameCardSelect = (id: string) => {
    setValue('game_id', id);
    setSelectedGame(id);
  };

  useEffect(() => {
    fetchUpcomingGames();
  }, [fetchUpcomingGames]);

  return (
    <FormControl isInvalid={!errors.game_id}>
      <Container centerContent bg={'green.500'} minHeight="100vh">
        <Container
          zIndex={1}
          position="fixed"
          centerContent
          bg="green.500"
          background="none"
          bgGradient="linear(to-t, rgba(77, 161, 103, 0.8), 10%, green.500)"
        >
          <Heading
            fontSize={[32, 32]}
            color="white"
            textAlign="center"
            pt={[20, 32]}
            pb={[12, 22]}
          >
            Choose Game
          </Heading>
        </Container>

        <Container paddingTop={200} paddingBottom={100} centerContent>
          <select
            {...register('game_id', {
              validate: (value) => value && value !== '',
            })}
            style={{ display: 'none' }}
          >
            {upcomingGames
              ? upcomingGames.map((game, i) => (
                  <option key={i} value={game.id} />
                ))
              : null}
          </select>
          {gamesLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="yellow.300"
              size="xl"
            ></Spinner>
          ) : upcomingGames ? (
            upcomingGames.map((game) => {
              return (
                <GameCard
                  key={game.id}
                  game={game}
                  selected={game.id === selectedGame}
                  onClick={handleGameCardSelect}
                />
              );
            })
          ) : null}
        </Container>

        {selectedGame ? (
          <Box position="fixed" bottom={5} zIndex={1}>
            <Button type="submit" size="xl" variant="outline">
              Choose Game
            </Button>
          </Box>
        ) : null}
      </Container>
    </FormControl>
  );
};

export default ChooseGame;
