import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "./userContext";
import "./stylesheets/LeagueTableRow.css";


function LeagueTableRow({ teamId, teamName, teamNameAbbrev, teamCrest, teamHyperlink, gamesPlayed, currentStanding, wins, draws, losses, goalsFor, goalsAgainst, goalDifferential, points }) {

  const { user } = useContext(userContext);
  // const navigate = useNavigate();


  return (
    <tr className="LeagueTableRow">
      <td>{currentStanding}</td>
      <td className="TeamAndCrest">
        <Link className="LeagueTableRow-Link" to={`/teams/${teamId}`}>
          <img src={teamCrest}></img>
          <td>{teamName}</td>
        </Link>
      </td>
      <td>{gamesPlayed}</td>
      <td>{wins}</td>
      <td>{draws}</td>
      <td>{losses}</td>
      <td>{goalDifferential}</td>
      <td>{goalsFor}</td>
      <td>{goalsAgainst}</td>
      <td>{points}</td>
    </tr>
  );
}

export default LeagueTableRow;