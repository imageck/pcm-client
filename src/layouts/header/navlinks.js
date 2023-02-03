import { NavLink } from "react-router-dom";

export default function Navlinks() {
  return (
    <nav className="order-lg-first">
     <ul className="navbar-nav gap-3 mt-3 mt-lg-0">
      <li className="nav-item">
       <NavLink to="/" className="nav-link">Home</NavLink>
      </li>
      <li className="nav-item">
       <NavLink to="/collections" className="nav-link">Collections</NavLink>
      </li>
     </ul>
    </nav>
  );
}
