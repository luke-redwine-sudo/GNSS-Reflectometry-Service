import "./components_css/Datetime.css"

function Datetime() {

    return (
        <div class="datetimewrapper">
            <div class="titlecomponent">
                <label>Date:</label>
                <input class="component" type="date" />
            </div>
            <div class="titlecomponent">
                <label>Time:</label>
                <input class="component" type="time" step="1"/>
            </div>
        </div>
    );

}

export default Datetime;