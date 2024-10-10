import { useContext, useState, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./stylesheets/LeagueList.css";
import "./stylesheets/SimpleLeagueList.css";

import CommoditiesListRow from "./CommoditiesListRow";


// function SimpleLeagueList({ user, leagues, title }) {
function CommoditiesList({ commodities, title }) {

  // const [isLoaded, setIsLoaded] = useState(false);

  return (

    <div className="CommoditiesList">

      <h1 className="CommoditiesList-title">{title}</h1>
      <table className="CommoditiesListTable">
        <thead>
          <tr>
            <th className="CommoditiesList-Column"></th>

            <th scope="col" className="CommoditiesList-Column">Commodity Name</th>
            <th scope="col" className="CommoditiesList-Column">Ticker Symbol</th>
            <th scope="col" className="CommoditiesList-Column">Stock Exchange Name</th>
            <th scope="col" className="CommoditiesList-Column">Stock Exchange Symbol</th>

          </tr>
        </thead>

        <tbody>

          {commodities && commodities.map((commodity, idx) => (
            // <SimpleCommoditiesListRow key={idx} user_id={user?.user_id} leagueId={league.league_id}
            //   leagueName={league.league_name} leagueUrl={league.league_url} leagueDescription={league.league_description}
            //   lastUpdatedDate={league.last_updated_date} />
            <CommoditiesListRow key={idx} commodityName={commodity.name} stockExchangeName={commodity.stock_exchange_name} stockExchangeSymbol={commodity.stock_exchange_symbol} tickerSymbol={commodity.ticker_symbol} />
          ))}

        </tbody>

      </table>
    </div>

  );
}


export default CommoditiesList;
