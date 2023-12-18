import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <>
          <header>
              <div class="navbar">
                  <div class="logo"><a href="#">HOME</a></div>
                  <ul class="links">
                      <li><a href="uploads">UPLOADS</a></li>
                      <li><a href="analysis">ANALYSIS</a></li>
                  </ul>
              </div>
          </header>
          <main>
              <section id="hero">
                  <h1>GNSS Reflectometry Service</h1>
                  <p>Welcome to the GNSS Reflectometry Service</p>
                  <div class="home_buttons">
                      <button>UPLOADS</button>
                      <button>ANALYSIS</button>
                  </div>
              </section>
          </main>
      </>
  );
}


export default App;
