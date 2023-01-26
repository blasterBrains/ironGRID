import axios from 'axios';
import type {HomeAway, Competitor, Event, SmartDate, League, Sport } from '../types'

/* 
  ESPN API routes taken from this gist:
  https://gist.github.com/nntrn/ee26cb2a0716de0947a0a4e9a157bc1c#v2sportsfootballleaguesnflcalendar
 */

export const getUpcomingGames = async () => {
  const { data } = await axios.get<{ sports: Sport[] }>(
    'https://site.web.api.espn.com/apis/v2/scoreboard/header',
    {
      params: {
        sport: 'football',
        league: 'nfl',
        region: 'us',
        lang: 'en',
        contentorigin: 'espn',
        buyWindow: '1m',
        showAirings: 'buy,live,replay',
        showZipLookup: true,
        tz: 'America/New_York',
      },
    }
  );

  return data.sports[0]?.leagues[0]?.events || [];
};

export const getGame = async (id: string) => {
  const event = await axios.get<Event>(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${id}`
  );

  return event;
};
