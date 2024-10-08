import { NavLink, Link } from "react-router-dom";
// import './stylesheets/Homepage.css';
import logo from './images/logo.svg';

/** Homepage
 *  Displays welcome message or login/sign up buttons.
 */
// function Homepage({ user }) {
function Homepage({ }) {

  return (
    <div className="Homepage">

      <div className="homepageSummary">
        <div className="style-3"><img src={logo} alt="Soccer ProLeagues Title/Logo" width="260" height="260" className="style-4" /></div>
        <p className="style-5">Soccer ProLeagues uses web-scraped data to display team and league statistics from various professional soccer leagues.</p>
        <p className="style-5">Login/Register an account to follow leagues and teams, and to access your customized league and team pages.</p><a href="https://github.com/jhellst/Soccer-ProLeagues" className="style-8"><button className="style-9">See Project Details</button></a>
      </div>

    </div>
  );
}

export default Homepage;
