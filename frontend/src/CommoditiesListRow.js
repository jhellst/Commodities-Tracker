import { useState } from "react";
import { Link } from "react-router-dom";
// import "./stylesheets/SimpleLeagueListRow.css";


// function CommoditiesListRow({ user_id, commodity }) {
function CommoditiesListRow({ commodity }) {
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [tickerSymbol, setTickerSymbol] = useState(useParams().ticker_symbol);


  return (

    // <tr className="CommoditiesListRow">
    //   {/* <td>{leagueId}</td> */}
    //   <td></td>
    //   <Link to={`/leagues/${leagueId}`}>
    //     {/* <div>{leagueName}</div> */}
    //     <td>{leagueName}</td>
    //   </Link>
    //   <td>{leagueDescription}</td>
    //   {/* <td>{lastUpdatedDate}</td> */}
    // </tr>

    <tr className="CommoditiesListRow">
      {/* <td>{leagueId}</td> */}
      <td></td>
      <Link to={`/commodities/${tickerSymbol}`}>
        {/* <div>{leagueName}</div> */}
        {/* <td>{commodity.name}</td> */}
        <td>Hello - !</td>
      </Link>
      {/* <td>{commodity.ticker_symbol}</td> */}
      {/* <td>{lastUpdatedDate}</td> */}
    </tr>

  );
}


export default CommoditiesListRow;
