import { NavLink, Link } from "react-router-dom";
import './stylesheets/Homepage.css';
import logo from './images/logo.svg';

/** Homepage
 *  Displays welcome message or login/sign up buttons.
 */
function Homepage({ user }) {

  return (
    <div className="Homepage">

      <div className="homepageSummary">
        <div className="style-3"><img src={logo} alt="Soccer ProLeagues Title/Logo" width="260" height="260" className="style-4" /></div>
        <p className="style-5">Soccer ProLeagues uses web-scraped data to display team and league statistics from various professional soccer leagues.</p>
        <p className="style-5">Login/Register an account to follow leagues and teams, and to access your customized league and team pages.</p><a href="https://github.com/jhellst/Soccer-ProLeagues" className="style-8"><button className="style-9">See Project Details</button></a>

      </div>

      {user ?
        <>
          <h2 className="userWelcomeMessage">Welcome back, {user.username}!</h2>
          <div className="homepageButtonContainer">
            <NavLink to={"/users/" + user.user_id + "/leagues"}><button className="UserLink">My Followed Leagues</button></NavLink>
            <NavLink to={"/users/" + user.user_id + "/teams"}><button className="UserLink">My Followed Teams</button></NavLink>
          </div>
        </>
        :
        <>
          <div className="homepageButtonContainer">
            <NavLink to="/signup"><button>Sign Up</button></NavLink>
            <NavLink to="/login"><button>Login</button></NavLink>
          </div>
        </>
      }
    </div>
  );
}

export default Homepage;
