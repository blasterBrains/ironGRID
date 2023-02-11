import axios from 'axios';

enum HomeAway {
  home,
  away,
}

interface Logo {
  href: string;
  height: number;
  width: number;
}

interface Team {
  ['$ref']: string;
  id: string;
  logos: Logo[];
  color: string;
  displayName: string;
}

interface Competitor {
  ['$ref']: string;
  abbreviation: string;
  alternateColor: string;
  color: string;
  displayName: string;
  id: string;
  homeAway: HomeAway;
  location: string;
  logo: string;
  logoDark: string;
  name: string;
  record: string;
  score: string;
  uid: string;
  order: number;
  winner: boolean;
  team: Team;
}

interface Note {
  headline: string;
  type: string;
}

export interface Event {
  id: string;
  clock: string;
  competitionId: string;
  name: string;
  date: string;
  note: string;
  location: string;
  period: number;
  season: number;
  playByPlayAvailable: boolean;
  shortname: string;
  summary: string;
  week: number;
  weekText: number;
  competitors: Competitor[];
  notes: Note[];
  fullStatus: {
    clock: number;
    displayClock: string;
    period: number;
  };
}

interface SmartDate {
  label: string;
  season: number;
  seasontype: number;
  week: number;
}

interface League {
  abbreviation: string;
  id: string;
  isTournament: boolean;
  name: string;
  shortName: string;
  slug: string;
  uid: string;
  events: Event[];
  smartdates: SmartDate[];
}

export interface Sport {
  id: string;
  name: string;
  slug: string;
  uid: string;
  leagues: League[];
}

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
  const { data: game } = await axios.get<Event>(
    `http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${id}/competitions/${id}?lang=en&region=us`
  );

  if (!game) return game;

  const [{ data: homeTeam }, { data: awayTeam }] = await Promise.all([
    axios.get<Team>(game.competitors[0].team['$ref']),
    axios.get<Team>(game.competitors[1].team['$ref']),
  ]);

  game.competitors[0].team = homeTeam;
  game.competitors[1].team = awayTeam;

  return game;
};
