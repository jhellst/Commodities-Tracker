import { useState } from "react";
import { Link } from "react-router-dom";
// import "./stylesheets/LeagueTableRow.css";


function TeamListRow({ leagueId, leagueName, leagueUrl, lastUpdatedDate }) {
  // const [isLoaded, setIsLoaded] = useState(false);

  return (

    <tr className="wpos">
      <Link to={`/leagues/${leagueId}`}>
        <td>{leagueId}</td>
        <td>{leagueName}</td>
        <td>{leagueUrl}</td>
        <td>{lastUpdatedDate}</td>
      </Link>
    </tr>

  );
}


export default TeamListRow;
