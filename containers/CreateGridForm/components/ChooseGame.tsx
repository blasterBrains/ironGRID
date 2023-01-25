import { Box, Button, Container, FormControl, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Event } from '../../../common/utils/espn';
import { getUpcomingGames } from '../../../common/utils/espn';
import type { FieldValues } from '../../CreateGridForm';
import GameCard from './GameCard';

const ChooseGame = () => {
  const [selectedGame, setSelectedGame] = useState<string | undefined>();
  const [upcomingGames, setUpcomingGames] = useState<Event[]>([]);
  const {
    formState: { errors },
    setValue,
    register,
  } = useFormContext<FieldValues>();

  const fetchUpcomingGames = async () => {
    try {
      const games = await getUpcomingGames();
      console.log(games);
      setUpcomingGames(games);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGameCardSelect = (id: string) => {
    setValue('gameId', id);
    setSelectedGame(id);
  };

  useEffect(() => {
    fetchUpcomingGames();
  }, []);

  return (
    <FormControl isInvalid={!errors.gameId}>
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
            Choose a Game
          </Heading>
        </Container>

        <Container paddingTop={200} paddingBottom={100} centerContent>
          <select
            {...register('gameId', {
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
          {upcomingGames
            ? upcomingGames.map((game) => {
                return (
                  <GameCard
                    key={game.id}
                    game={game}
                    selected={game.id === selectedGame}
                    onClick={handleGameCardSelect}
                  />
                );
              })
            : null}
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
