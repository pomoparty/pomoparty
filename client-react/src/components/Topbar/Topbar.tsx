import { NavLink } from "react-router-dom";
import "./Topbar.scss";

export const Topbar = () => {
  return (
    <nav>
      <h1> Pomoparty </h1>

      <div className='links'>
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink to="/create-party">
          Create Party
        </NavLink>
        <NavLink to="/join-party">
          Join Party
        </NavLink>
      </div>
    </nav>
  );
}
