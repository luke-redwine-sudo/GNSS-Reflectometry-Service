import './components_css/UploadSubmitButton.css'

function UploadSubmitButton(props) {

    return (
        <button type="submit" class="uploadsubmitbutton" disabled={props.isSubmitDisabled}>SUBMIT DATA</button>
    );

}

export default UploadSubmitButton;