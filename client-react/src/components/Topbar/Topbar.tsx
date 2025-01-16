import { NavLink } from "react-router-dom";
import "./Topbar.scss";

export const Topbar = () => {
  return (
    <nav>
      <h1> Pomoparty </h1>

      <div className='links'>
        <NavLink to="/join">
          Join Party
        </NavLink>
      </div>
    </nav>
  );
}
