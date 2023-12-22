import './components_css/GNSSSelector.css'

function GNSSSelector() {

    return (
        <div class="gnssselectorwrapper">
            <label class="gnssselectorlabel">GNSS Source:</label>
            <select class="gnssselector">
              <option value="Drone">Drone</option>
              <option value="Ground_Station">Ground Station</option>
            </select>
        </div>
    );

}

export default GNSSSelector;