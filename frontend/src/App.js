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
                  <div class="toggle_btn">
                      <i class="fa-solid fa-bars"></i>
                  </div>
              </div>
              <div class="dropdown_menu">
                  <li><a href="uploads">Uploads</a></li>
                  <li><a href="analysis">Analysis</a></li>
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
          <script>
              const toggleBtn = document.querySelector(".toggle_btn");
              const toggleBtnIcon = document.querySelector(".toggle_btn i");
              const dropDownMenu = document.querySelector(".dropdown_menu");
              toggleBtn.onclick = toggleButtonFunction(dropDownMenu, toggleBtnIcon);

          </script>
      </>
  );
}

function toggleButtonFunction(dropDownMenu, toggleBtnIcon) {
    dropDownMenu.classList.toggle("open")
    const isOpen = dropDownMenu.classList.contains("open")
    toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"
}

export default App;
