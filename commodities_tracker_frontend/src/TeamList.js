import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TeamListRow from "./TeamListRow";
import TeamsAndLeaguesContext from "./Contexts";


function TeamList() {
  // const [isLoaded, setIsLoaded] = useState(false);
  const teamsAndLeagues = useContext(TeamsAndLeaguesContext);
  const leagues = teamsAndLeagues.leagues;
  const teams = teamsAndLeagues.teams;

  return (

    <div className="LeagueList">
      <h1 className="LeagueList-title">Followed Leagues</h1>
      <table className="LeagueListHeader">

        {leagues.map((league, idx) => (
          <TeamListRow key={idx} leagueId={league.league_id}
            leagueName={league.league_name} leagueUrl={league.league_url}
            lastUpdatedDate={league.last_updated_date} />
        ))}

      </table>
    </div>

  );
}


export default TeamList;
