import axios from 'axios';

enum HomeAway {
  home,
  away,
}

interface Competitor {
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
}

interface Event {
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

interface Sport {
  id: string;
  name: string;
  slug: string;
  uid: string;
  leagues: League[];
}

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

export const getGame = async (id: string) => {};
