import { useContext, useState, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylesheets/LeagueList.css";
import "./stylesheets/SimpleLeagueList.css";
import SimpleLeagueListRow from "./SimpleLeagueListRow";


function SimpleLeagueList({ user, leagues, title }) {
  // const [isLoaded, setIsLoaded] = useState(false);

  return (

    <div className="SimpleLeagueList">

      <h1 className="SimpleLeagueList-title">{title}</h1>
      <table className="SimpleLeagueListTable">
        <thead>
          <tr>
            <th className="SimpleLeagueList-Column"></th>
            <th scope="col" className="SimpleLeagueList-Column">League</th>
            <th scope="col" className="SimpleLeagueList-Column">Description</th>
          </tr>
        </thead>

        <tbody>

          {leagues && leagues.map((league, idx) => (
            <SimpleLeagueListRow key={idx} user_id={user?.user_id} leagueId={league.league_id}
              leagueName={league.league_name} leagueUrl={league.league_url} leagueDescription={league.league_description}
              lastUpdatedDate={league.last_updated_date} />
          ))}

        </tbody>

      </table>
    </div>

  );
}


export default SimpleLeagueList;
