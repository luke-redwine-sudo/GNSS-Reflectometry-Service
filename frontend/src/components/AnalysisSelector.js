import './components_css/AnalysisSelector.css'

function AnalysisSelector(props) {

    return (
        <div class="analysisselectorwrapper">
            <label class="analysisselectorlabel">Analysis Choice:
                <select class="analysisselector" name={props.name} id={props.name} value={props.value} onChange={(e)=>{props.onChange(e)}}>
                    <option value="Histogram">Histogram</option>
                    <option value="Line_Plot">Line Plot</option>
                    <option value="Map_Plot">Map Plot</option>
                    <option value="Scatter_Plot">Scatter Plot</option>
                    <option value="Video">Video</option>
                </select>
            </label>

        </div>
    );

}

export default AnalysisSelector;