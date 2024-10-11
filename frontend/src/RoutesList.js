import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import NotFound from './NotFound';
// import SignupForm from './SignupForm';
// import LoginForm from './LoginForm';
import CommoditiesList from './CommoditiesList';
import CommodityDetail from './CommodityDetail';

import StockChart from './StockChart';

/** Provides routing for app. Will provide access to routes with info on
 *    companies/jobs/profile if user is logged in, otherwise will
 *    show only login and signup buttons, and will not allow other routing.
 */
// function RoutesList({ user, login, signup, getTeamDetail, leagues, teams, followedLeagues, followedTeams, getLeagueTable, followedLeagueIds, handleSubmitFollowedLeagues, followedTeamIds, handleSubmitFollowedTeams, addTeamToFollowList, followLeague, unfollowLeague, followTeam, unfollowTeam }) {
function RoutesList({ commodities, getCommodities, getCommodityHistoricalData }) {

  return (
    <>
      {/* {user ? */}
      {true ?
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/commodities" element={<CommoditiesList title={"All Commodities"} getCommodities={getCommodities} commodities={commodities}/>} /> */}
          {/* <Route path="/commodities" element={<CommoditiesList2 title="All Commodities" commodities={commodities}/>} /> */}
          <Route path="/commodities" element={<CommoditiesList title="All Commodities" commodities={commodities}/>} />
          <Route path="/commodities/:ticker_symbol" element={<CommodityDetail title={"Commodity Detail"} commodities={commodities} getCommodityHistoricalData={getCommodityHistoricalData} />} />
          <Route path="/stock_chart/:ticker_symbol" element={<StockChart title={"Commodity Chart"} getCommodityHistoricalData={getCommodityHistoricalData} />} />

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
