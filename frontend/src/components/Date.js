import "./components_css/Datetime.css"

function Date(props) {

    return (
        <div class="titlecomponent">
            <label>Date:</label>
            <input class="component" type="date" id={props.name} name={props.name} value={props.value} onChange={(e)=>{props.onChange(e)}} />
        </div>
    );

}

export default Date;