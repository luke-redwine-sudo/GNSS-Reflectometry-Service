import './components_css/FileInput.css'

function FileInput(props){

    return (
        <div class="fileinputwrapper">
            <label class="filecomponent" for={props.inputname}>Upload {props.inputname}:
                <input class="filecomponent" type="file" id={props.name} accept={props.filetype} name={props.name} value={props.value} onChange={(e)=>{props.onChange(e)}}/>
            </label>
            </div>
    );

}

export default FileInput;