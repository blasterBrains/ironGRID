import { useEffect } from 'react';
import { getGame, getUpcomingGames } from '../../common/utils/espn';

export default function Landing() {
  useEffect(() => {
    // getGame('401438002');
  }, []);

  return (
    <div>
      <h1>ironGRID</h1>
      <button>Create New ironGRID</button>
      <button>Join Existing ironGRID</button>
    </div>
  );
}
