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
  const [commodityHistoricalData, setCommodityHistoricalData] = useState([]); // TODO: Remove?
  const [followedCommodities, setFollowedCommodities] = useState([]);
  const [customIndices, setcustomIndices] = useState([]);



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


  useEffect(() => {
    async function setInitialCommodities() {
      const commodities = await getCommodities();
      setCommodities(commodities);
    }
    setInitialCommodities();
  }, []);

  useEffect(() => {  // TODO: Remove?
    async function setInitialCommodityHistoricalData() {
      const commodityHistoricalData = await getCommodityHistoricalData();
      setCommodityHistoricalData(commodityHistoricalData);
    }
    setInitialCommodityHistoricalData();
  }, []);

  useEffect(() => {
    async function setInitialCustomIndices() {
      if (user && user.user_id && user.user_id !== undefined && user.user_id !== "") {
        const customIndices = await getCustomIndices();
        setcustomIndices(customIndices);
      }
    }
    setInitialCustomIndices();
  }, []);


  useEffect(() => {
    async function setInitialFollowedCommodities() {
      if (user && user.user_id && user.user_id !== undefined && user.user_id !== "") {
        const followedCommodities = await getFollowedCommodities(user.user_id);
        setFollowedCommodities(followedCommodities);
      }
    }
    setInitialFollowedCommodities();
  }, []);



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


  /** Retrieves list of followed leagues by user. */
  async function getFollowedCommodities(user_id) {
    if (!user_id) {
      return [];
    }
    const followedCommodities = await CommoditiesTrackerApi.getFollowedCommodities(user_id);
    return followedCommodities;
  }

  /** Retrieves list of custom indices for the current user. */
  async function getCustomIndices(user_id) {
    if (!user_id) {
      return [];
    }
    const customIndices = await CommoditiesTrackerApi.getCustomIndices(user_id);
    return customIndices;
  }

  /** Retrieves list of followed teams by user. */
  async function getCustomIndex(user_id, customIndexId) {
    if (!user_id) {
      // return [];
      return {};
    }
    const customIndex = await CommoditiesTrackerApi.getCustomIndices(user_id, customIndexId);
    return customIndex;
  }

  async function followCommodity(user_id, ticker_symbol) {
    await CommoditiesTrackerApi.followCommodity(user_id, ticker_symbol);
    const followedCommodities = await getFollowedLeagues(user_id);
    setFollowedCommodities(followedCommodities);
  }

  // TODO: Create routes to 1) create a custom index, 2) add commodity to custom_index, and 3) remove commodity from custom_index.
  //  - Need to decide if we need to delete an empty custom index, or if we can just avoid displaying those.


  console.log("user@App", user);
  console.log("token@App", token);

  console.log("commodities@App", commodities);
  console.log("followedCommodities@App", followedCommodities);

  console.log("commodityHistoricalData@App", commodityHistoricalData);


  return (
    <div className="App">
      {isLoaded ?

        // <userContext.Provider value={{ user, token }}>
        <BrowserRouter>
          {/* <Nav user={user} logout={logout} /> */}
          <Nav user={user} logout={logout} />
          <RoutesList user={user} login={login} signup={signup} commodities={commodities} getCommodities={getCommodities} getFollowedCommodities={getFollowedCommodities} getCommodityHistoricalData={getCommodityHistoricalData} followedCommodities={followedCommodities} customIndices={customIndices} getCustomIndex={getCustomIndex} getCustomIndices={getCustomIndices} followCommodity={followCommodity} />
          {/* <RoutesList user={user} login={login} signup={signup} getCommodities={getCommodities} getCommodityHistoricalData={getCommodityHistoricalData} commodities={commodities} /> */}
          {/* <RoutesList getCommodities={getCommodities} getCommodityHistoricalData={getCommodityHistoricalData} commodities={commodities} /> */}
        </BrowserRouter>
        // </userContext.Provider>
        :
        <Loading />
      }
    </div>
  );
}

export default App;
