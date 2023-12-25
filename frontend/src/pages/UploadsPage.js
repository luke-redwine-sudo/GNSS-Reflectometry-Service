import UploadsSubNavbar from '../components/UploadsSubNavbar.js'
import GNSSDataForm from '../components/GNSSDataForm.js'
import VideoForm from '../components/VideoForm.js'
import SatelliteDataForm from '../components/SatelliteDataForm.js'
import FlightDataForm from '../components/FlightDataForm.js'
import WeatherDataForm from '../components/WeatherDataForm.js'

import './pages_css/UploadsPage.css'

import {useState} from 'react';

function UploadsPage() {

    const [GNSSIsShown, setGNSSIsShown] = useState(true);
    const [weatherIsShown, setWeatherIsShown] = useState(false);
    const [satelliteIsShown, setSatelliteIsShown] = useState(false);
    const [flightIsShown, setFlightIsShown] = useState(false);
    const [videoIsShown, setVideoIsShown] = useState(false);

    const handleGNSSClick = event => {
        setGNSSIsShown(true);
        setWeatherIsShown(false);
        setSatelliteIsShown(false);
        setFlightIsShown(false);
        setVideoIsShown(false);
    };

    const handleWeatherClick = event => {
        setGNSSIsShown(false);
        setWeatherIsShown(true);
        setSatelliteIsShown(false);
        setFlightIsShown(false);
        setVideoIsShown(false);
    };

    const handleSatelliteClick = event => {
        setGNSSIsShown(false);
        setWeatherIsShown(false);
        setSatelliteIsShown(true);
        setFlightIsShown(false);
        setVideoIsShown(false);
    };

    const handleFlightClick = event => {
        setGNSSIsShown(false);
        setWeatherIsShown(false);
        setSatelliteIsShown(false);
        setFlightIsShown(true);
        setVideoIsShown(false);
    };

    const handleVideoClick = event => {
        setGNSSIsShown(false);
        setWeatherIsShown(false);
        setSatelliteIsShown(false);
        setFlightIsShown(false);
        setVideoIsShown(true);
    };

    const clickEventHandlers = [handleGNSSClick, handleWeatherClick, handleSatelliteClick, handleFlightClick, handleVideoClick];

    return (
        <div>
            <UploadsSubNavbar clickEventHandlers={ clickEventHandlers } />
            <h class="uploadsbanner">UPLOADS</h>
            <div class="formposition">
                {GNSSIsShown && (<GNSSDataForm />)}
                {weatherIsShown && (<WeatherDataForm />)}
                {satelliteIsShown && (<SatelliteDataForm />)}
                {flightIsShown && (<FlightDataForm />)}
                {videoIsShown && (<VideoForm />)}
            </div>
        </div>
    );
}

export default UploadsPage;