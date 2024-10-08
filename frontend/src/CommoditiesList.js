import { useContext, useState, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./stylesheets/LeagueList.css";
// import "./stylesheets/SimpleLeagueList.css";
// import SimpleLeagueListRow from "./SimpleLeagueListRow";
import CommoditiesListRow from "./CommoditiesListRow";

// function CommoditiesList({ user, commodities, title }) {
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
            <th scope="col" className="CommoditiesList-Column">Stock Exchange Symbol</th>
          </tr>
        </thead>

        <tbody>

          {commodities && commodities.map((commodity, idx) => (
            // <CommoditiesListRow key={idx} user_id={user?.user_id} commodity={commodity} />
            <CommoditiesListRow key={idx} commodity={commodity} />

          ))}

        </tbody>

      </table>
    </div>

  );
}


export default CommoditiesList;
