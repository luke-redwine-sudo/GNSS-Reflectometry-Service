import './components_css/TideTextInput.css'

function TideTextInput(props) {

    return (

        <div class="tideinputwrapper">
            <label class="tidecomponent">Enter Tide (Feet):</label>
            <input class="tidecomponent" type="text" name={props.name} id={props.name} value={props.value} onChange={(e)=>{props.onChange(e)}} />
        </div>

    );

}

export default TideTextInput;