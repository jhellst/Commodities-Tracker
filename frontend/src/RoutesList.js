import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import NotFound from './NotFound';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import CommoditiesList from './CommoditiesList';
import CommodityDetail from './CommodityDetail';

import StockChart from './StockChart';

/** Provides routing for app. Will provide access to routes with info on
 *    companies/jobs/profile if user is logged in, otherwise will
 *    show only login and signup buttons, and will not allow other routing.
 */
function RoutesList({ user, login, signup, commodities, getCommodities, getFollowedCommodities, getCommodityHistoricalData, followedCommodities, customIndices, getCustomIndex, getCustomIndices, followCommodity }) {

  return (
    <>
      {user ?
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/commodities" element={<CommoditiesList title="All Commodities"  user={user} commodities={commodities}/>} />
          <Route path="/users/:user_id/commodities" element={<CommoditiesList user={user} commodities={followedCommodities} isUserList="True" title={user.username + "'s Tracked Commodities"} />} />
          {/* <Route path="/users/:user_id/custom_index" element={<CommoditiesList user={user} isUserList="True" title={user.username + "'s Custom Indices"} />} /> */}

          <Route path="/commodities/:ticker_symbol" element={<CommodityDetail title={"Commodity Detail"} commodities={commodities} getCommodityHistoricalData={getCommodityHistoricalData} />} />
          <Route path="/stock_chart/:ticker_symbol" element={<StockChart title={"Commodity Chart"} getCommodityHistoricalData={getCommodityHistoricalData} />} />

          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupForm handleSubmit={signup} />} />
          <Route path="/login" element={<LoginForm handleSubmit={login} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      }
    </>
  );
}


export default RoutesList;
