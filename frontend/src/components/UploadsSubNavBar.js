import SubNavBarButton from './SubNavBarButton.js'
import './components_css/SubNavBar.css'

function UploadsSubNavBar(props) {

    const handleGNSSClick = props.clickEventHandlers[0];
    const handleWeatherClick = props.clickEventHandlers[1];
    const handleFlightClick = props.clickEventHandlers[2];
    const handleVideoClick = props.clickEventHandlers[3];

    return (
        <div class="subnavbar">
            <SubNavBarButton handleClick={handleGNSSClick} label={"GNSS"}/>
            <SubNavBarButton handleClick={handleWeatherClick} label={"Weather"}/>
            <SubNavBarButton handleClick={handleFlightClick} label={"Flight"}/>
            <SubNavBarButton handleClick={handleVideoClick} label={"Video"}/>
        </div>
    );
}

export default UploadsSubNavBar;