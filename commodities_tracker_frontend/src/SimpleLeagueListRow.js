import { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheets/SimpleLeagueListRow.css"


function SimpleLeagueListRow({ user_id, leagueId, leagueName, leagueUrl, leagueDescription, lastUpdatedDate }) {
  // const [isLoaded, setIsLoaded] = useState(false);

  return (

    <tr className="SimpleLeagueListRow">
      {/* <td>{leagueId}</td> */}
      <td></td>
      <Link to={`/leagues/${leagueId}`}>
        {/* <div>{leagueName}</div> */}
        <td>{leagueName}</td>
      </Link>
      <td>{leagueDescription}</td>
      {/* <td>{lastUpdatedDate}</td> */}
    </tr>

  );
}


export default SimpleLeagueListRow;
