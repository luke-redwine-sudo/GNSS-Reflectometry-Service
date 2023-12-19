import logo from './logo.svg';
import './App.css';
import SplashPage from "./pages/SplashPage.js"
import UploadsPage from "./pages/UploadsPage.js"
import AnalysisPage from "./pages/AnalysisPage.js"

import Navbar from "./components/Navbar.js"

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<SplashPage />} />
            <Route path="uploads" element={<UploadsPage />} />
            <Route path="analysis" element={<AnalysisPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}


export default App;
