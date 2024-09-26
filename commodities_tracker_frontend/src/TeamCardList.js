import TeamCard from "./TeamCard";
import { useState, useEffect } from "react";
import { useHistory } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./stylesheets/TeamCardList.css";


function TeamCardList({ user, teams, title, followedTeamIds, followTeam, unfollowTeam, isUserList }) {
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

      <div className="TeamCardList">
        {/* {!isLoaded && <p>League Table Loading...</p>} */}

        <div className="homepageSummary">
          <div>
            <h1 className="LeagueList-title">{title}</h1>

            <p className="style-5">See below for a list of all Pro Soccer Teams tracked in our records.</p>
            {(isUserList === "True") ?
              <p className="style-5">Click the remove button (X) to remove a team from your follow list.</p> :
              <p className="style-5">Toggle the checkboxes to follow and unfollow teams.</p>
            }
          </div>
        </div>

        <div className="TeamCardListInfo">

          {teams.map((team, idx) => (
            <TeamCard key={idx} teamId={team.team_id} teamName={team.team_name} teamNameAbbrev={team.team_name_abbrev}
              teamCrest={team.team_crest} teamUrl={team.team_url} user_id={user?.user_id} title={title} followTeam={followTeam} unfollowTeam={unfollowTeam} isUserList={isUserList} isFollowedByUser={(team && team.team_id && followedTeamIds && followedTeamIds.has(team.team_id)) ? (true) : (false)} />

          ))}

        </div>
      </div>
    </>
  );
}


export default TeamCardList;
