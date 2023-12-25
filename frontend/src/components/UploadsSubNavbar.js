import SubNavbarButton from './SubNavbarButton.js'
import './components_css/SubNavbar.css'

function UploadsSubNavbar(props) {

    const handleGNSSClick = props.clickEventHandlers[0];
    const handleWeatherClick = props.clickEventHandlers[1];
    const handleSatelliteClick = props.clickEventHandlers[2];
    const handleFlightClick = props.clickEventHandlers[3];
    const handleVideoClick = props.clickEventHandlers[4];

    return (
        <div class="subnavbar">
            <SubNavbarButton handleClick={handleGNSSClick} label={"GNSS"}/>
            <SubNavbarButton handleClick={handleWeatherClick} label={"Weather"}/>
            <SubNavbarButton handleClick={handleSatelliteClick} label={"Satellite"}/>
            <SubNavbarButton handleClick={handleFlightClick} label={"Flight"}/>
            <SubNavbarButton handleClick={handleVideoClick} label={"Video"}/>
        </div>
    );
}

export default UploadsSubNavbar;