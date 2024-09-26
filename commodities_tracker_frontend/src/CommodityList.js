import { useContext, useState, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylesheets/LeagueList.css";
import CommodityListRow from "./CommodityListRow";


function CommodityList({ user, commodities }) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  return (

    <>
      <span className="pageButtonsLeague">
        <button onClick={() => {
          navigate(-1);
        }
        }>Back</button>
      </span>

      <div className="LeagueList">
        <div className="homepageSummary">
          <div>
            <h1 className="LeagueList-title">{title}</h1>
          </div>
        </div>

        <table className="LeagueListTable">
          <thead>
            <tr>
              <th className="LeagueList-Column"></th>
              <th scope="col" className="LeagueList-Column">Commodity</th>
              {/* <th scope="col" className="LeagueTable-Column">Country / Region</th> */}
              {user && <th scope="col" className="LeagueList-Column-CheckCircle"></th>}
              {/* <th scope="col" className="LeagueTable-Column">League Data Last Updated:</th> */}
            </tr>
          </thead>

          <tbody>

            {commodities && commodities.map((commodity, idx) => (
              <LeagueListRow key={idx} user_id={user?.user_id} leagueId={league.league_id}
                leagueName={league.league_name} leagueUrl={league.league_url} leagueCountry={league.league_country} leagueDescription={league.league_description}
                lastUpdatedDate={league.last_updated_date} followLeague={followLeague} unfollowLeague={unfollowLeague} isUserList={isUserList} isFollowedByUser={((isUserList == "True") || (league && league.league_id && followedLeagueIds && followedLeagueIds.has(league.league_id))) ? (true) : (false)} />
              // <LeagueListRow key={idx} user_id={user?.user_id} leagueId={league.league_id}
              //   leagueName={league.league_name} leagueUrl={league.league_url} leagueCountry={league.league_country} leagueDescription={league.league_description}
              //   lastUpdatedDate={league.last_updated_date} followLeague={followLeague} unfollowLeague={unfollowLeague} isUserList={isUserList} isFollowedByUser={((isUserList == "True") || (league && league.league_id && followedLeagueIds && followedLeagueIds.has(league.league_id))) ? (true) : (false)} />
            ))}

          </tbody>
        </table>
      </div>
    </>

  );
}


export default CommodityList;
