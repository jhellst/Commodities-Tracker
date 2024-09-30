import './stylesheets/App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from 'react-router-dom'; // Navigate
import RoutesList from './RoutesList';
import Nav from './Nav';
import userContext from "./userContext";
import { jwtDecode } from "jwt-decode";
import Loading from './Loading';

import CommoditiesTrackerApi from './api';

import TeamsAndLeaguesContext from './Contexts';


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
  const [isLoaded, setIsLoaded] = useState(false);

  const [commodities, setCommodities] = useState([]);
  const [customIndices, setcustomIndices] = useState([]);

  // const [followedLeagues, setFollowedLeagues] = useState([]);
  // const [followedTeams, setFollowedTeams] = useState([]);
  // const [followedTeamIds, setFollowedTeamIds] = useState(new Set());
  // const [followedLeagueIds, setFollowedLeagueIds] = useState(new Set());



  useEffect(() => {
    async function setInitialCommodities() {
      const commodities = await CommoditiesTrackerApi.getCommodities();
      setCommodities(commodities);
    }
    setInitialCommodities();
  }, []);

  useEffect(() => {
    async function setInitialCustomIndices() {
      const customIndices = await CommoditiesTrackerApi.getCustomIndices();
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

  /** Checks state for a token, if token exists set token in SoccerLeagues API
   *    and set user state if token exists. */
  useEffect(function getUserData() {
    async function fetchUserData() {
      // console.log("token", token);

      if (token && token !== undefined && token !== "" && token !== null) {
        try { // Using try/catch block here to check for bad existing token from local storage
          SoccerLeaguesApi.token = token;
          // const decoded = jwtDecode(JSON.stringify(token));
          const decoded = jwtDecode(token);

          if (decoded.exp * 1000 < Date.now()) {
            logout(); // Removes token/user if
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
    async function setInitialFollowedLeagues() {
      if (user && user.user_id && user.user_id !== undefined && user.user_id !== "") {
        const leagues = await getFollowedLeagues(user.user_id);
        setFollowedLeagues(leagues);
      }
    }
    setInitialFollowedLeagues([]);
  }, [user]);

  useEffect(() => {
    async function setInitialFollowedTeams() {
      if (user && user.user_id && user.user_id !== undefined && user.user_id !== "") {
        const teams = await getFollowedTeams(user.user_id);
        setFollowedTeams(teams);
      }
    }
    setInitialFollowedTeams();
  }, [user]);






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
    // updateUser({ username: formData.username, user_id: formData.user_id });
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

    // setFollowedLeagues([]);
    // setFollowedTeams([]);
    // setFollowedTeamIds([]);
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











  /** Retrieves league table of specified league. */
  async function getLeagueTable(league_id) {
    const leagueTable = await SoccerLeaguesApi.getLeagueById(league_id);
    return leagueTable;
  }

  /** Retrieves all details of specified team. */
  async function getTeamDetail(team_id) {
    const teamDetail = await SoccerLeaguesApi.getTeamById(team_id);
    return teamDetail;
  }

  /** Retrieves list of followed leagues by user. */
  async function getFollowedLeagues(user_id) {
    if (!user_id) {
      return [];
    }
    const leagues = await SoccerLeaguesApi.getFollowedLeagues(user_id);
    return leagues;
  }

  /** Retrieves list of followed teams by user. */
  async function getFollowedTeams(user_id) {
    if (!user_id) {
      return [];
    }
    const teams = await SoccerLeaguesApi.getFollowedTeams(user_id);
    return teams;
  }

  /** Follows a team and adds to the user's followed_teams page. */
  async function handleSubmitFollowedTeams(newFollowedTeams, newUnfollowedTeams) {
    if (user && user?.user_id && user.user_id !== undefined && user.user_id !== null) {
      if (newUnfollowedTeams && newUnfollowedTeams !== undefined && newUnfollowedTeams !== null) {
        await submitUnfollowedTeams(newUnfollowedTeams);
      }
      if (newFollowedTeams && newFollowedTeams !== undefined && newFollowedTeams !== null) {
        await submitFollowedTeams(newFollowedTeams);
      }
    }

    async function submitFollowedTeams(newFollowedTeams) {
      for (const team_id in newFollowedTeams) {
        if (newFollowedTeams[team_id]) {
          await SoccerLeaguesApi.followTeam(user.user_id, team_id);
        }
        const followedTeams = await getFollowedTeams(user.user_id);
        setFollowedTeams(followedTeams);
      }
    }

    async function submitUnfollowedTeams(newUnfollowedTeams) {
      for (const team_id in newUnfollowedTeams) {
        if (newUnfollowedTeams[team_id]) {
          await SoccerLeaguesApi.unfollowTeam(user.user_id, team_id);
        }
        const followedTeams = await getFollowedTeams(user.user_id);
        setFollowedTeams(followedTeams);
      }
    }
    console.log(newFollowedTeams);
    console.log(newUnfollowedTeams);
  }



  /** Follows a league and adds to the user's followed_leagues page. */
  async function handleSubmitFollowedLeagues(newFollowedLeagues, newUnfollowedLeagues) {
    if (user && user?.user_id && user.user_id !== undefined && user.user_id !== null) {
      if (newUnfollowedLeagues && newUnfollowedLeagues !== undefined && newUnfollowedLeagues !== null) {
        await submitUnfollowedLeagues(newUnfollowedLeagues);
      }
      if (newFollowedLeagues && newFollowedLeagues !== undefined && newFollowedLeagues !== null) {
        await submitFollowedLeagues(newFollowedLeagues);
      }
    }

    async function submitFollowedLeagues(newFollowedLeagues) {
      for (const league_id in newFollowedLeagues) {
        if (newFollowedLeagues[league_id]) {
          await SoccerLeaguesApi.followLeague(user.user_id, league_id);
        }
        const followedLeagues = await getFollowedLeagues(user.user_id);
        setFollowedLeagues(followedLeagues);
      }
    }

    async function submitUnfollowedLeagues(newUnfollowedLeagues) {
      for (const league_id in newUnfollowedLeagues) {
        if (newUnfollowedLeagues[league_id]) {
          await SoccerLeaguesApi.unfollowLeague(user.user_id, league_id);
        }
        const followedLeagues = await getFollowedLeagues(user.user_id);
        setFollowedLeagues(followedLeagues);
      }
    }
    console.log(newFollowedLeagues);
  }

  async function followLeague(user_id, league_id) {
    await SoccerLeaguesApi.followLeague(user_id, league_id);
    const followedLeagues = await getFollowedLeagues(user_id);
    setFollowedLeagues(followedLeagues);
  }

  async function unfollowLeague(user_id, league_id) {
    await SoccerLeaguesApi.unfollowLeague(user_id, league_id);
    const followedLeagues = await getFollowedLeagues(user_id);
    setFollowedLeagues(followedLeagues);
  }

  async function followTeam(user_id, team_id) {
    await SoccerLeaguesApi.followTeam(user_id, team_id);
    const followedTeams = await getFollowedTeams(user_id);
    setFollowedTeams(followedTeams);
  }

  async function unfollowTeam(user_id, team_id) {
    await SoccerLeaguesApi.unfollowTeam(user_id, team_id);
    const followedTeams = await getFollowedTeams(user_id);
    setFollowedTeams(followedTeams);
  }


  return (
    <div className="App">
      {isLoaded ?

        <userContext.Provider value={{ user, token }}>
          <TeamsAndLeaguesContext.Provider value={{ teams: teams, leagues: leagues }}>
            <BrowserRouter>
              <Nav user={user} logout={logout} />
              <RoutesList user={user} login={login} signup={signup} getTeamDetail={getTeamDetail} getLeagueTable={getLeagueTable} leagues={leagues} teams={teams} followedLeagues={followedLeagues} followedTeams={followedTeams} followedLeagueIds={followedLeagueIds} handleSubmitFollowedLeagues={handleSubmitFollowedLeagues} followedTeamIds={followedTeamIds} handleSubmitFollowedTeams={handleSubmitFollowedTeams} followLeague={followLeague} unfollowLeague={unfollowLeague} unfollowTeam={unfollowTeam} followTeam={followTeam} />
            </BrowserRouter>
          </TeamsAndLeaguesContext.Provider>
        </userContext.Provider>
        :
        <Loading />
      }
    </div>
  );
}

export default App;
