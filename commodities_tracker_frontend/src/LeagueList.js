import { useContext, useState, useParams } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylesheets/LeagueList.css";
import LeagueListRow from "./LeagueListRow";


function LeagueList({ user, leagues, title, followedLeagueIds, followLeague, unfollowLeague, isUserList }) {
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
            <p className="style-5">See below for a list of all Pro Soccer Leagues tracked in our records.</p>
            {(isUserList === "True") ?
              <p className="style-5">Click the remove button (X) to remove a league from your follow list.</p> :
              <p className="style-5">Toggle the checkboxes to follow and unfollow leagues.</p>
            }
            <p className="style-5">Click on a League entry to view its detailed league table.</p>
          </div>
        </div>

        <table className="LeagueListTable">
          <thead>
            <tr>
              <th className="LeagueList-Column"></th>
              <th scope="col" className="LeagueList-Column">League</th>
              <th scope="col" className="LeagueList-Column">Description</th>
              {/* <th scope="col" className="LeagueTable-Column">Country / Region</th> */}
              {user && <th scope="col" className="LeagueList-Column-CheckCircle"></th>}
              {/* <th scope="col" className="LeagueTable-Column">League Data Last Updated:</th> */}
            </tr>
          </thead>

          <tbody>

            {leagues && leagues.map((league, idx) => (
              <LeagueListRow key={idx} user_id={user?.user_id} leagueId={league.league_id}
                leagueName={league.league_name} leagueUrl={league.league_url} leagueCountry={league.league_country} leagueDescription={league.league_description}
                lastUpdatedDate={league.last_updated_date} followLeague={followLeague} unfollowLeague={unfollowLeague} isUserList={isUserList} isFollowedByUser={((isUserList == "True") || (league && league.league_id && followedLeagueIds && followedLeagueIds.has(league.league_id))) ? (true) : (false)} />
            ))}

          </tbody>
        </table>
      </div>
    </>

  );
}


export default LeagueList;
