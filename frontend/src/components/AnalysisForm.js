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

import './components_css/AnalysisForm.css'

function AnalysisForm (props) {

    const [formData, setFormData] = useState({analysis_option: "XY PLOT", location: "Jeanette Creek", Start_Date: "", Start_Time: "", End_Date: "", End_Time: ""});
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [uploadedFileURL, setUploadedFileURL] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploadStatusColor, setUploadStatusColor] = useState("#8EC5FC");

    useEffect(() => {
        if (formData.Start_Date != "" && formData.Start_Time != "" && formData.End_Date != "" && formData.End_Time != "" && formData.Start_Date === formData.End_Date && formData.Start_Time >= formData.End_Time) {
            setUploadStatusColor("red");
            setUploadStatus(`Start Time cannot be after End Time`);
            setSubmitDisabled(true);
        }
        else if (formData.location != "" && formData.Start_Date != "" && formData.Start_Time != "" && formData.End_Date != "" && formData.End_Time != "") {
            setSubmitDisabled(false);
            setUploadStatus("");
        }
        else {
            setSubmitDisabled(true);
            setUploadStatus("");
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setUploadStatusColor("#8EC5FC");
        setUploadStatus("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitDisabled(true);
        setUploadStatus(`Searching for data at ${formData.location}...`);

        // Create FormData object and append data
        const formDataToSend = new FormData();
        formDataToSend.append('analysis_option', formData.analysis_option);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('Start_Date', formData.Start_Date);
        formDataToSend.append('Start_Time', formData.Start_Time);
        formDataToSend.append('End_Date', formData.End_Date);
        formDataToSend.append('End_Time', formData.End_Time);

        try {
            // Use Axios to make a POST request
            const response = await axios.post('http://localhost:8000/retrieve_plot_attributes', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            // Assuming the backend returns a URL for the uploaded file
            setUploadedFileURL(response.data.fileURL);

            if (response.status == 200) {
                if (response.data.length === 0) {
                    setSubmitDisabled(false);
                    setUploadStatus(`No data found at ${formData.location}!`);
                    setUploadStatusColor("red");
                }
                else {
                    props.setCurrentResponseData(response.data);
                    setSubmitDisabled(false);
                    setUploadStatus(`Found data at ${formData.location}!`);
                    setUploadStatusColor("green");
                }


            }

        } catch (error) {
            // Check if there are any validation errors in the response
            if (error.response && error.response.status === 422) {
                console.log('Validation Error:', error.response.data.detail);
            } else {
                console.error('Error uploading file:', error);
            }

            setUploadStatus(`Failed to search for data at ${formData.location}...`);
            setUploadStatusColor("red");
        }
    };

    return (
            <div class="analysisformorg">
                <div>
                    <h1>Analysis Form</h1>
                    <div class="horizontalanalysisform">
                        <div class="analysislocationdiv">
                            <div>
                                <AnalysisSelector name="analysis_option" value={formData.analysis_option} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div class="datesformorg">
                        <form onSubmit={handleSubmit}>
                            <div class="horizontaldates">
                                <div class="datetimewrapper">
                                    <Date max={formData.End_Date} name="Start_Date" value={formData.Start_Date} onChange={handleChange} />
                                    <Time name="Start_Time" value={formData.Start_Time} onChange={handleChange} />
                                </div>
                                <div class="datetimewrapper">
                                    <Date min={formData.Start_Date} name="End_Date" value={formData.End_Date} onChange={handleChange} />
                                    <Time name="End_Time" value={formData.End_Time} onChange={handleChange} />
                                </div>
                            </div>
                            <div class="dateslocationdiv">
                                <div>
                                    <LocationTextInput name="location" value={formData.location} onChange={handleChange}/>
                                </div>
                            </div>
                            <AnalysisQueryButton isSubmitDisabled={isSubmitDisabled}/>
                        </form>
                        <small><font color={uploadStatusColor}>{uploadStatus}</font></small>
                    </div>
                </div>
            </div>
    );
}

export default AnalysisForm;