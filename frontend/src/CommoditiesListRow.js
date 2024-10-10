import { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheets/SimpleLeagueListRow.css"


// function SimpleCommoditiesListRow({ user_id, leagueId, leagueName, leagueUrl, leagueDescription, lastUpdatedDate }) {
function CommoditiesListRow({ commodityName, stockExchangeSymbol, stockExchangeName, tickerSymbol }) {
  // const [isLoaded, setIsLoaded] = useState(false);

  return (

    <tr className="CommoditiesListRow">
      {/* <td>{leagueId}</td> */}
      <td></td>
      <Link to={`/commodities/${tickerSymbol}`}>
        {/* <div>{leagueName}</div> */}
        <td>{commodityName}</td>
      </Link>
      <td>{tickerSymbol}</td>
      <td>{stockExchangeName}</td>
      <td>{stockExchangeSymbol}</td>
      {/* <td>{lastUpdatedDate}</td> */}
    </tr>

  );
}


export default CommoditiesListRow;
