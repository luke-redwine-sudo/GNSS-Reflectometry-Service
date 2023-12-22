import './components_css/FileInput.css'

function FileInput(props){

    return (
        <div class="fileinputwrapper">
            <label class="filecomponent" for={props.inputname}>Upload {props.inputname}:</label>
            <input class="filecomponent" type="file" id={props.inputname} accept={props.filetype} />
        </div>
    );

}

export default FileInput;