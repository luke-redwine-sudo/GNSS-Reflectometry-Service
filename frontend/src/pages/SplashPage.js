import Navbar from "../components/Navbar.js"
import UploadsPage from "./UploadsPage.js"

import { Outlet, Link } from "react-router-dom";

function SplashPage() {
    return (
        <main>
            <section id="hero">
                <h1>GNSS Reflectometry Service</h1>
                <p>Welcome to the GNSS Reflectometry Service</p>
                <div class="home_buttons">
                    <Link to="/uploads"><button>UPLOADS</button></Link>
                    <Link to="/analysis"><button>ANALYSIS</button></Link>
                </div>
                <Outlet />
            </section>
        </main>
  );
}


export default SplashPage;