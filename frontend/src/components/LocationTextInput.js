import './components_css/LocationTextInput.css'

function LocationTextInput(props) {

    return (

        <div class="locationinputwrapper">
            <label class="locationcomponent">Enter Site Location:
                <input class="locationcomponent" type="text" name={props.name} id={props.name} value={props.value} onChange={(e)=>{props.onChange(e)}}/>
            </label>
            </div>

    );

}

export default LocationTextInput;