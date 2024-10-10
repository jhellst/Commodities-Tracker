import "./stylesheets/Nav.css";
import { NavLink, Link, useNavigate } from "react-router-dom";


/** Renders navigation bar for website.
 * Shows login/signup/homepage only if user not logged in.
 * If user is logged in, show all links to commodities/custom_page/homepage.
 */
function Nav({ user, logout }) {

  return (
    <nav className="NavBar">
      {user ?
        <>
          <NavLink to="/">Homepage</NavLink>
          <NavLink to="/commodities">All Commodities</NavLink>
          <NavLink to={"/users/" + user.user_id + "/commodities"}>My Tracked Commodities</NavLink>
          <NavLink to={"/users/" + user.user_id + "/custom_index"}>My Custom Indices</NavLink>
          <Link to="/" onClick={logout}>Logout</Link>
        </>
        :
        <>
          <NavLink to="/">Homepage</NavLink>
          <NavLink to="/commodities">All Commodities</NavLink>
          <NavLink to="/signup" >Sign Up</NavLink>
          <NavLink to="/login" >Login</NavLink>
        </>
      }
    </nav>

  );
}


export default Nav;