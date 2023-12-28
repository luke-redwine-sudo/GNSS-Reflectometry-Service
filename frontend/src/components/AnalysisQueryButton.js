import './components_css/AnalysisQueryButton.css'

function AnalysisQueryButton(props) {

    return (
        <button type="submit" class="analysisquerybutton" disabled={props.isSubmitDisabled}>SUBMIT QUERY</button>
    );

}

export default AnalysisQueryButton;