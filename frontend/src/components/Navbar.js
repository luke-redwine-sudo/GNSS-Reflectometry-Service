import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div class="navbar">
        <div class="logo"><a><Link to="/"><i class="fa-solid fa-house"></i></Link></a></div>
        <ul class="Links">
          <li><a><Link to="/uploads">UPLOADS</Link></a></li>
          <li><a><Link to="/analysis">ANALYSIS</Link></a></li>
        </ul>
      </div>
      <Outlet />
    </header>
  )
};

export default Navbar;