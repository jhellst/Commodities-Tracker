import "./stylesheets/Nav.css";
import { NavLink, Link, useNavigate } from "react-router-dom";


/** Renders navigation bar for website.
 * Shows login/signup/homepage only if user not logged in.
 * If user is logged in, show all links to followed_leagues/homepage.
 */
function Nav({ user, logout }) {

  return (
    <nav className="NavBar">
      {user ?
        <>
          <NavLink to="/">Homepage</NavLink>
          <NavLink to="/leagues">All Leagues</NavLink>
          <NavLink to="/teams">All Teams</NavLink>
          <NavLink to={"/users/" + user.user_id + "/leagues"}>My Followed Leagues</NavLink>
          <NavLink to={"/users/" + user.user_id + "/teams"}>My Followed Teams</NavLink>
          <Link to="/" onClick={logout}>Logout</Link>
        </>
        :
        <>
          <NavLink to="/">Homepage</NavLink>
          <NavLink to="/leagues">All Leagues</NavLink>
          <NavLink to="/teams">All Teams</NavLink>
          <NavLink to="/signup" >Sign Up</NavLink>
          <NavLink to="/login" >Login</NavLink>
        </>
      }
    </nav>

  );
}


export default Nav;