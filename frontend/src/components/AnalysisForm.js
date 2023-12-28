import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone'
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import FileInput from './FileInput.js';
import LocationTextInput from './LocationTextInput.js';
import Date from './Date.js';
import Time from './Time.js';
import TideTextInput from './TideTextInput.js';
import AnalysisQueryButton from './AnalysisQueryButton.js'
import AnalysisSelector from './AnalysisSelector.js'
import HistogramAnalysisForm from './HistogramAnalysisForm.js'

import './components_css/AnalysisForm.css'

function AnalysisForm () {

    const [formData, setFormData] = useState({analysis_selector: "Histogram"});
    const [histogramFormDisplay, setHistogramFormDisplay] = useState(true);
    const [lineFormDisplay, setLineFormDisplay] = useState(false);
    const [mapFormDisplay, setMapFormDisplay] = useState(false);
    const [scatterFormDisplay, setScatterFormDisplay] = useState(false);
    const [videoFormDisplay, setVideoFormDisplay] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if (value === "Histogram"){
            setHistogramFormDisplay(true)
            setLineFormDisplay(false)
            setMapFormDisplay(false)
            setScatterFormDisplay(false)
            setVideoFormDisplay(false)
        }
        if (value === "Line_Plot"){
            setHistogramFormDisplay(false)
            setLineFormDisplay(true)
            setMapFormDisplay(false)
            setScatterFormDisplay(false)
            setVideoFormDisplay(false)
        }
        if (value === "Map_Plot"){
            setHistogramFormDisplay(false)
            setLineFormDisplay(false)
            setMapFormDisplay(true)
            setScatterFormDisplay(false)
            setVideoFormDisplay(false)
        }
        if (value === "Scatter_Plot"){
            setHistogramFormDisplay(false)
            setLineFormDisplay(false)
            setMapFormDisplay(false)
            setScatterFormDisplay(true)
            setVideoFormDisplay(false)
        }
        if (value === "Video"){
            setHistogramFormDisplay(false)
            setLineFormDisplay(false)
            setMapFormDisplay(false)
            setScatterFormDisplay(false)
            setVideoFormDisplay(true)
        }
    };

    return (
            <div class="analysisformorg">
                <div>
                    <h1>Analysis Form</h1>
                    <div class="horizontalanalysisform">
                        <div class="analysislocationdiv">
                            <div>
                                <AnalysisSelector name="analysis_selector" value={formData.analysis_selector} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    {histogramFormDisplay && (<HistogramAnalysisForm />)}
                </div>
            </div>
    );
}

export default AnalysisForm;