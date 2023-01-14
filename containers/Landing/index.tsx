import { useEffect } from 'react';
import { getUpcomingGames } from '../../common/utils/espn';

export default function Landing() {
  useEffect(() => {
    getUpcomingGames();
  }, []);

  return (
    <div>
      <h1>ironGRID</h1>
      <button>Create New ironGRID</button>
      <button>Join Existing ironGRID</button>
    </div>
  );
}
