import './components_css/FileInput.css'

function FileInput(props){

    return (
        <div class="fileinputwrapper">
            <label class="filecomponent" for={props.inputname}>Upload {props.inputname}:</label>
            <button class="filebutton" type="button" id={props.name} accept={props.filetype} name={props.name} value={props.value} onClick={props.onClick}>Upload</button>
            <p class="filecomponentp">{props.filename}</p>
        </div>
    );

}

export default FileInput;