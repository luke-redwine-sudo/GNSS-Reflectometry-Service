import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone'
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import VideoTile from "../components/VideoTile.js"
import AnalysisForm from "../components/AnalysisForm.js"
import "./pages_css/AnalysisPage.css"

function AnalysisPage () {
    const [currentResponseData, setCurrentResponseData] = useState([]);
    const [currentPlots, setCurrentPlots] = useState([]);
    const [numberOfPlots, setNumberOfPlots] = useState(0);
    const [isFormVisible, setIsFormVisible] = useState(true);

    useEffect(() => {
        if (currentResponseData.length != 0){
            setIsFormVisible(false);
            setCurrentPlots(currentResponseData);
            setCurrentResponseData([]);
        }
    }, [currentResponseData])

    return (
        <div>
            <h class="analysisbanner">ANALYSIS</h>
            <div class="formposition">
                {isFormVisible && <AnalysisForm setCurrentResponseData={setCurrentResponseData}/>}
                {!isFormVisible && <VideoTile options={currentPlots} />}
            </div>
        </div>
    );
}

export default AnalysisPage;