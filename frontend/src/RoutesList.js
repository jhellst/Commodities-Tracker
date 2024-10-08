import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import NotFound from './NotFound';
// import SignupForm from './SignupForm';
// import LoginForm from './LoginForm';
import CommoditiesList from './CommoditiesList';


/** Provides routing for app. Will provide access to routes with info on
 *    companies/jobs/profile if user is logged in, otherwise will
 *    show only login and signup buttons, and will not allow other routing.
 */
// function RoutesList({ user, login, signup, getTeamDetail, leagues, teams, followedLeagues, followedTeams, getLeagueTable, followedLeagueIds, handleSubmitFollowedLeagues, followedTeamIds, handleSubmitFollowedTeams, addTeamToFollowList, followLeague, unfollowLeague, followTeam, unfollowTeam }) {
function RoutesList({ getCommodities }) {

  return (
    <>
      {user ?
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/commodities" element={<CommoditiesList title={"All Commodities"} getCommodities={getCommodities}/>} />
          {/* <Route path="/commodities/:ticker_symbol" element={<CommoditiesList title={"Commodity Detail"} getCommodities={getCommodities} getCommodityHistoricalData={getCommodityHistoricalData}/>} /> */}

          {/* <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      }
    </>
  );
}


export default RoutesList;
