import { useState, useEffect } from "react";
import LeagueTableRow from "./LeagueTableRow";
import TeamsAndLeaguesContext from "./Contexts";
import { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./stylesheets/LeagueTable.css";


function LeagueTable({ getLeagueTable }) {
  const [leagueId, setLeagueId] = useState(useParams().league_id);
  const [leagueTable, setLeagueTable] = useState([]);
  const teamsAndLeaguesContext = useContext(TeamsAndLeaguesContext);
  const leagues = teamsAndLeaguesContext.leagues;

  const navigate = useNavigate();
  const curLeague = leagues.filter(league => league.league_id == leagueId);

  useEffect(() => {
    async function setCurrentLeagueTable() {
      const league = await getLeagueTable(leagueId);
      setLeagueTable(league);
    }
    setCurrentLeagueTable();
  }, leagueId);


  if (leagueId) {

    return (

      <div className="LeagueTableContainer">
        <span className="pageButtonsLeagueTable">
          <button onClick={() => {
            navigate(-1);
          }
          }>Back</button>
        </span>

        <div class="homepageSummary">
          <div>
            <h1 className="LeagueList-title">{curLeague[0]?.league_name}</h1>
            <p className="style-5">See below for the complete league table for the {curLeague[0]?.league_name}.</p>
            <p className="style-5">Users can explore statistics by team by clicking on the corresponding row in the league table.</p>
          </div>
        </div>

        <table className="LeagueTable">
          <thead>
            <tr>
              <th scope="col" className="LeagueTable-Column"></th>
              <th scope="col" className="LeagueTable-Column">Team</th>
              <th scope="col" className="LeagueTable-Column">MP</th>
              <th scope="col" className="LeagueTable-Column">W</th>
              <th scope="col" className="LeagueTable-Column">D</th>
              <th scope="col" className="LeagueTable-Column">L</th>
              <th scope="col" className="LeagueTable-Column">GF</th>
              <th scope="col" className="LeagueTable-Column">GA</th>
              <th scope="col" className="LeagueTable-Column">GD</th>
              <th scope="col" className="LeagueTable-Column">Pts</th>
              {/* <th scope="col" className="LeagueTable-Column">Last 5</th> */}
            </tr>
          </thead>

          {leagueTable.map((team, idx) => (
            <LeagueTableRow key={idx} teamId={team.team_id} teamName={team.team_name} teamNameAbbrev={team.team_name_abbrev}
              teamCrest={team.team_crest} teamHyperlink={team.team_hyperlink} currentStanding={team.current_standing} wins={team.wins}
              draws={team.draws} losses={team.losses} gamesPlayed={team.games_played}
              goalsFor={team.goals_for} goalsAgainst={team.goals_against}
              goalDifferential={team.goal_differential} points={team.points} />
          ))}

        </table>
      </div>


    );
  } else {

    return (

      <div className="LeagueTable">
        {/* <LeagueList leagues={leagues} /> */}
      </div>

    );
  }
}

export default LeagueTable;
