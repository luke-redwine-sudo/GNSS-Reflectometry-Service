import SubNavBarButton from './SubNavBarButton.js'
import './components_css/SubNavBar.css'

function UploadsSubNavBar () {
    return (
        <div class="subnavbar">
            <SubNavBarButton label={"Phone Data"}/>
            <SubNavBarButton label={"Weather Data"}/>
            <SubNavBarButton label={"Flight Data"}/>
            <SubNavBarButton label={"Video"}/>
        </div>
    );
}

export default UploadsSubNavBar;