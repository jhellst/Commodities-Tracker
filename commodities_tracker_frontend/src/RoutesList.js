import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import LeagueTable from "./LeagueTable";
import NotFound from './NotFound';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import LeagueList from './LeagueList';
import SingleTeam from './SingleTeam';
import TeamCardList from './TeamCardList';

/** Provides routing for app. Will provide access to routes with info on
 *    companies/jobs/profile if user is logged in, otherwise will
 *    show only login and signup buttons, and will not allow other routing.
 */
// function RoutesList({ user, login, signup, getTeamDetail, leagues, teams, followedLeagues, followedTeams, getLeagueTable, followedLeagueIds, handleSubmitFollowedLeagues, followedTeamIds, handleSubmitFollowedTeams, addTeamToFollowList, followLeague, unfollowLeague, followTeam, unfollowTeam }) {
function RoutesList({ user }) {

  return (
    <>
      {
        <Routes>
          <Route path="/" element={<Homepage user={user} />} />
          <Route path="/commodities/:ticker_symbol" element={<LeagueList user={user} leagues={followedLeagues} followedLeagueIds={followedLeagueIds} handleSubmitFollowedLeagues={handleSubmitFollowedLeagues} followLeague={followLeague} unfollowLeague={unfollowLeague} isUserList="True" title={user.username + "'s Followed Leagues"} />} />
          <Route path="/users/:user_id/leagues" element={<LeagueList user={user} leagues={followedLeagues} followedLeagueIds={followedLeagueIds} handleSubmitFollowedLeagues={handleSubmitFollowedLeagues} followLeague={followLeague} unfollowLeague={unfollowLeague} isUserList="True" title={user.username + "'s Followed Leagues"} />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
      {/* {user ?
        <Routes>
          <Route path="/" element={<Homepage user={user} />} />
          <Route path="/users/:user_id/leagues" element={<LeagueList user={user} leagues={followedLeagues} followedLeagueIds={followedLeagueIds} handleSubmitFollowedLeagues={handleSubmitFollowedLeagues} followLeague={followLeague} unfollowLeague={unfollowLeague} isUserList="True" title={user.username + "'s Followed Leagues"} />} />
          <Route path="/users/:user_id/teams" element={<TeamCardList user={user} teams={followedTeams} followedTeamIds={followedTeamIds} handleSubmitFollowedTeams={handleSubmitFollowedTeams} addTeamToFollowList={addTeamToFollowList} followTeam={followTeam} unfollowTeam={unfollowTeam} isUserList="True" title={user.username + "'s Followed Teams"} />} />
          <Route path="/teams" element={<TeamCardList teams={teams} user={user} title={"All Teams"} followedTeamIds={followedTeamIds} handleSubmitFollowedTeams={handleSubmitFollowedTeams} addTeamToFollowList={addTeamToFollowList} followTeam={followTeam} unfollowTeam={unfollowTeam} isUserList="False" />} />
          <Route path="/leagues" element={<LeagueList user={user} leagues={leagues} followedLeagueIds={followedLeagueIds} handleSubmitFollowedLeagues={handleSubmitFollowedLeagues} followLeague={followLeague} unfollowLeague={unfollowLeague} isUserList="False" title={"All Leagues"} />} />
          <Route path="/leagues/:league_id" element={<LeagueTable getLeagueTable={getLeagueTable} />} />
          <Route path="/teams/:team_id" element={<SingleTeam user={user} leagues={leagues} getTeamDetail={getTeamDetail} followedLeagueIds={followedLeagueIds} followedTeamIds={followedTeamIds} />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/leagues" element={<LeagueList leagues={leagues} title={"All Leagues"} />} />
          <Route path="/teams" element={<TeamCardList teams={teams} title={"All Teams"} />} />
          <Route path="/leagues/:league_id" element={<LeagueTable getLeagueTable={getLeagueTable} />} />
          <Route path="/teams/:team_id" element={<SingleTeam getTeamDetail={getTeamDetail} />} />
          <Route path="/signup" element={<SignupForm handleSubmit={signup} />} />
          <Route path="/login" element={<LoginForm handleSubmit={login} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      } */}
    </>
  );
}


export default RoutesList;
