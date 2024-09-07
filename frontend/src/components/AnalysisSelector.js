import './components_css/AnalysisSelector.css'

function AnalysisSelector(props) {

    return (
        <div class="analysisselectorwrapper">
            <label class="analysisselectorlabel">Analysis Choice:
                <select class="analysisselector" name={props.name} id={props.name} value={props.value} onChange={(e)=>{props.onChange(e)}}>
                    <option value="XY_Plot">XY Plot</option>
                    <option value="Map_Plot">Map Plot</option>
                    <option value="Video">Video</option>
                </select>
            </label>

        </div>
    );

}

export default AnalysisSelector;