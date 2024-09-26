import { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheets/TeamCard.css";
import CheckCircle from "./CheckCircle";
import RemoveButton from "./RemoveButton";

function TeamCard({ teamId, teamName, teamNameAbbrev, teamCrest, teamUrl, submitFollowedTeams, followTeam, unfollowTeam, isFollowedByUser, isUserList, user_id = null, title }) {

  return (

    <div className="TeamCard">
      <div className={(title === "All Teams") ? "TeamCardCheckbox" : "TeamCardRemoveButton"}>
        {(isFollowedByUser === true && isUserList === "True") ?
          <RemoveButton listType="Team" unfollowTeam={unfollowTeam} user_id={user_id} id={teamId} /> :

          (user_id) &&
          <td className="LeagueTable-Column-CheckCircle-Team">
            <CheckCircle user_id={user_id} team_id={teamId} submitFollowedTeams={submitFollowedTeams} isFollowedByUser={isFollowedByUser} followTeam={followTeam} unfollowTeam={unfollowTeam} isUserList={isUserList} />
          </td>
        }
      </div>

      <div className="TeamCardInfo">

        <Link className="TeamCard-Link" to={"/teams/" + teamId}>
          <div className="TeamName">{teamName}</div>
          <div className="TeamCrest">
            <img src={teamCrest} alt={teamName + " Team Crest"} />
          </div>
        </Link>

        <Link className="TeamCardNews" to={teamUrl}>
          <div className="TeamCardNewsDiv">{teamName} Team News</div>
        </Link>
      </div>

    </div>


  );
}


export default TeamCard;
