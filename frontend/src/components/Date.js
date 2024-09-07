import "./components_css/Datetime.css"

function Date(props) {

    return (
        <div class="titlecomponent">
            <label>{props.name.split("_").join(" ")}:</label>
            <input class="component" min={props.min || "01-01-2000"} max={props.max || "12-31-3000"} type="date" id={props.name} name={props.name} value={props.value} onChange={(e)=>{props.onChange(e)}} />
        </div>
    );

}

export default Date;