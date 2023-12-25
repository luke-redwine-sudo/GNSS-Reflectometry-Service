import "./components_css/Datetime.css"

function Time(props) {

    return (
        <div class="titlecomponent">
            <label>Time:</label>
            <input class="component" type="time" id={props.name} name={props.name} value={props.value} onChange={(e)=>{props.onChange(e)}} step="1"/>
        </div>
    );

}

export default Time;