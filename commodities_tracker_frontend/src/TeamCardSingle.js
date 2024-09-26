import { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheets/TeamCardSingle.css";
import CheckCircle from "./CheckCircle";

function TeamCardSingle({ teamId, teamName, teamNameAbbrev, teamCrest, teamUrl, submitFollowedTeams, addTeamToFollowList, addTeamToUnfollowList, isFollowedByUser, user_id = null }) {

  return (

    <div className="TeamCardSingle">
      {/* <div className="TeamCardSingleCheckbox">
          <CheckCircle user_id={user_id} team_id={teamId} submitFollowedTeams={submitFollowedTeams} isFollowedByUser={isFollowedByUser} addTeamToFollowList={addTeamToFollowList} addTeamToUnfollowList={addTeamToUnfollowList}/>
        </div> */}

      <div className="TeamCardSingleInfo">

        <Link className="TeamCardSingle-Link" to={"/teams/" + teamId}>
          <div className="TeamName">{teamName}</div>
          <div className="TeamCrest">
            <img src={teamCrest} alt={teamName + " Team Crest"} />
          </div>
        </Link>

        <Link className="TeamCardSingleNews" to={teamUrl}>
          <div className="TeamCardSingleNewsDiv">{teamName} Team News</div>
        </Link>
      </div>

    </div>


  );
}


export default TeamCardSingle;
