import UploadsSubNavbar from '../components/UploadsSubNavbar.js'
import GNSSDataForm from '../components/GNSSDataForm.js'
import VideoForm from '../components/VideoForm.js'
import FlightDataForm from '../components/FlightDataForm.js'
import WeatherDataForm from '../components/WeatherDataForm.js'

import './pages_css/UploadsPage.css'

import {useState} from 'react';

function UploadsPage() {

    const [GNSSIsShown, setGNSSIsShown] = useState(true);
    const [weatherIsShown, setWeatherIsShown] = useState(false);
    const [flightIsShown, setFlightIsShown] = useState(false);
    const [videoIsShown, setVideoIsShown] = useState(false);

    const handleGNSSClick = event => {
        setGNSSIsShown(true);
        setWeatherIsShown(false);
        setFlightIsShown(false);
        setVideoIsShown(false);
    };

    const handleWeatherClick = event => {
        setGNSSIsShown(false);
        setWeatherIsShown(true);
        setFlightIsShown(false);
        setVideoIsShown(false);
    };

    const handleFlightClick = event => {
        setGNSSIsShown(false);
        setWeatherIsShown(false);
        setFlightIsShown(true);
        setVideoIsShown(false);
    };

    const handleVideoClick = event => {
        setGNSSIsShown(false);
        setWeatherIsShown(false);
        setFlightIsShown(false);
        setVideoIsShown(true);
    };

    const clickEventHandlers = [handleGNSSClick, handleWeatherClick, handleFlightClick, handleVideoClick];

    return (
        <div>
            <UploadsSubNavbar clickEventHandlers={ clickEventHandlers } />
            <h class="uploadsbanner">UPLOADS</h>
            {GNSSIsShown && (<GNSSDataForm />)}
            {weatherIsShown && (<WeatherDataForm />)}
            {flightIsShown && (<FlightDataForm />)}
            {videoIsShown && (<VideoForm />)}
        </div>
    );
}

export default UploadsPage;