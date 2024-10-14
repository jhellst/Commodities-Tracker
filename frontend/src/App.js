import './stylesheets/App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from 'react-router-dom'; // Navigate
import RoutesList from './RoutesList';
import Nav from './Nav';
// import userContext from "./userContext";
import { jwtDecode } from "jwt-decode";
import Loading from './Loading';

import CommoditiesTrackerApi from './api';


// Long-Term: Implement search for commodities and custom indices.

/**
 * App: Commodities Tracker application.
 * Allows the user to view tracked historical data for all commodities, and to create custom indices of commodities to track combined historical performance.
 *
 * Props: None
 *
 * State:
 *  - User: The current logged in user, if any
 *  - Token: The authorization token that determines if a user is logged in
 *  - Commodities: A complete list of commodities in the database
 *
 */
function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  // const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const [commodities, setCommodities] = useState([]);
  const [commodityHistoricalData, setCommodityHistoricalData] = useState([]);
  const [followedCommodities, setFollowedCommodities] = useState([]);
  const [customIndices, setcustomIndices] = useState([]);



  useEffect(() => {
    async function setInitialCommodities() {
      const commodities = await getCommodities();
      setCommodities(commodities);
    }
    setInitialCommodities();
  }, []);

  useEffect(() => {
    async function setInitialCommodityHistoricalData() {
      const commodityHistoricalData = await getCommodityHistoricalData();
      setCommodityHistoricalData(commodityHistoricalData);
    }
    setInitialCommodityHistoricalData();
  }, []);

  useEffect(() => {
    async function setInitialCustomIndices() {
      const customIndices = await getCustomIndices();
      setcustomIndices(customIndices);
    }
    setInitialCustomIndices();
  }, []);

  useEffect(() => {
    async function setInitialToken() {
      if (user && user.user_id && user.user_id !== undefined && user.user_id !== "") {
        const token = await CommoditiesTrackerApi.getToken(user.user_id);
        // console.log("****token", token);
        setToken(token.access_token);
      } else {
        setToken(null);
      }
    }
    setInitialToken();
  }, [user]);

  /** Checks state for a token, if token exists set token in CommoditiesTracker API
   *    and set user state if token exists. */
  useEffect(function getUserData() {
    async function fetchUserData() {
      // console.log("token", token);

      if (token && token !== undefined && token !== "" && token !== null) {
        try { // Using try/catch block here to check for bad existing token from local storage
          CommoditiesTrackerApi.token = token;
          // const decoded = jwtDecode(JSON.stringify(token));
          const decoded = jwtDecode(token);

          if (decoded.exp * 1000 < Date.now()) {
            logout(); // Removes token/user if expired.
          }

          const user = JSON.parse(decoded.sub);
          const user_id = user.user_id;
          const userData = await CommoditiesTrackerApi.getUserInfo(user_id);
          updateUser(userData);

        }
        catch (err) {
          // console.error(err); // Possibly uncomment this later for error-checking.
        }
      }
      setIsLoaded(true);
    }
    fetchUserData();
  }, [token]);




  /** Updates token and sets within local storage (removes if not available) */
  function updateToken(token) {
    console.log("****token", token);
    setToken(token);
    (token) ?
      sessionStorage.setItem("token", token) :
      sessionStorage.removeItem("token");
  }

  /** Updates token and sets within local storage (removes if not available) */
  function updateUser(user) {
    setUser(user);
  }

  /** Logs in user and retrieves token from backend. */
  async function login(formData) {
    const token = await CommoditiesTrackerApi.loginUser(formData);
    updateToken(token.access_token);
    updateUser({ username: formData.username, user_id: formData.user_id });
  }

  /** Signs up a new user, logs them in, and retrieves token from backend. */
  async function signup(formData) {
    const token = await CommoditiesTrackerApi.registerUser(formData);
    await login(formData);
  }

  /** Logs out user and removes token from local storage. */
  function logout() {
    updateUser(null);
    updateToken(null);

    setFollowedLeagues([]);
    setFollowedTeams([]);
    setFollowedTeamIds([]);
  }



  /** Retrieves all historical data from the database for a specified ticker symbol. */
  async function getCommodities() {
    const commodities = await CommoditiesTrackerApi.getCommodities();
    return commodities;
  }

  /** Retrieves all historical data from the database for a specified ticker symbol. */
  async function getCommodityHistoricalData(tickerSymbol) {
    const commodityHistoricalData = await CommoditiesTrackerApi.getCommodityHistoricalData(tickerSymbol);
    return commodityHistoricalData;
  }


  /** Retrieves all custom indices in the database. */
  async function getCustomIndices() {
    const customIndices = await CommoditiesTrackerApi.getCustomIndices();
    return customIndices;
  }

  /** Retrieves all custom indices in the database. */
  async function getCustomIndex(id) {
    const customIndex = await CommoditiesTrackerApi.getCustomIndex(id);
    return customIndex;
  }


  console.log("commodities@App", commodities);
  console.log("commodityHistoricalData@App", commodityHistoricalData);



  return (
    <div className="App">
      {isLoaded ?

        // <userContext.Provider value={{ user, token }}>
        <BrowserRouter>
          {/* <Nav user={user} logout={logout} /> */}
          <Nav />
          {/* <RoutesList user={user} login={login} signup={signup} getTeamDetail={getTeamDetail} getLeagueTable={getLeagueTable} leagues={leagues} teams={teams} followedLeagues={followedLeagues} followedTeams={followedTeams} followedLeagueIds={followedLeagueIds} handleSubmitFollowedLeagues={handleSubmitFollowedLeagues} followedTeamIds={followedTeamIds} handleSubmitFollowedTeams={handleSubmitFollowedTeams} followLeague={followLeague} unfollowLeague={unfollowLeague} unfollowTeam={unfollowTeam} followTeam={followTeam} /> */}
          {/* <RoutesList user={user} login={login} signup={signup} getCommodities={getCommodities} getCommodityHistoricalData={getCommodityHistoricalData} commodities={commodities} /> */}
          <RoutesList getCommodities={getCommodities} getCommodityHistoricalData={getCommodityHistoricalData} commodities={commodities} />
        </BrowserRouter>
        // </userContext.Provider>
        :
        <Loading />
      }
    </div>
  );
}

export default App;
