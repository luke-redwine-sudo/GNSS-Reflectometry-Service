import './components_css/GNSSSelector.css'

function GNSSSelector(props) {

    return (
        <div class="gnssselectorwrapper">
            <label class="gnssselectorlabel">GNSS Source:
                <select class="gnssselector" name={props.name} id={props.name} value={props.value} onChange={(e)=>{props.onChange(e)}}>
                    <option value="Drone">Drone</option>
                    <option value="Ground_Station">Ground Station</option>
                </select>
            </label>

        </div>
    );

}

export default GNSSSelector;