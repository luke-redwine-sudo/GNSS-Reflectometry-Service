import AnalysisForm from "../components/AnalysisForm.js"

import "./pages_css/AnalysisPage.css"

function AnalysisPage () {
    return (
        <div>
            <h class="analysisbanner">ANALYSIS</h>
            <div class="formposition">
                <AnalysisForm />
            </div>
        </div>
    );
}

export default AnalysisPage;