import { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./stylesheets/TeamCard.css";
import SimpleLeagueList from "./SimpleLeagueList";
import TeamCardSingle from "./TeamCardSingle";


function SingleTeam({ user = null, getTeamDetail, leagues, followedLeagueIds, followedTeamIds }) {
  const [teamId, setTeamId] = useState(useParams().team_id);
  const [teamDetail, setTeamDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function setInitialTeamDetail() {
      const teamDetail = await getTeamDetail(teamId);
      setTeamDetail(teamDetail);
    }
    setInitialTeamDetail();
  }, [teamId]);

  return (
    <div>
      <span className="pageButtonsSingleTeam">
        <button onClick={() => {
          navigate(-1);
        }
        }>Back</button>
      </span>

      <TeamCardSingle userId={user?.user_id} teamId={teamId} teamName={teamDetail.team_name} teamNameAbbrev={teamDetail.team_name_abbrev} teamCrest={teamDetail.team_crest} teamUrl={teamDetail.team_hyperlink} />
      <SimpleLeagueList user={user} leagues={teamDetail.leagues_team_is_member_of} followedLeagueIds={followedLeagueIds} title={teamDetail.team_name + "'s Leagues "} />
    </div>

  );
}


export default SingleTeam;
