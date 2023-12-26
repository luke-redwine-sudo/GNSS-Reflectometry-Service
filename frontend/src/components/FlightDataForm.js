import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone'
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import FileInput from './FileInput.js';
import LocationTextInput from './LocationTextInput.js';
import Date from './Date.js';
import Time from './Time.js';
import TideTextInput from './TideTextInput.js';
import UploadSubmitButton from './UploadSubmitButton.js'

import './components_css/FlightDataForm.css'


function FlightDataForm() {

    const [formData, setFormData] = useState({location: "Jeanette Creek", data: null, dataFileName:""});
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [uploadedFileURL, setUploadedFileURL] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploadStatusColor, setUploadStatusColor] = useState("#8EC5FC");

    useEffect(() => {
        if (formData.location != "" && formData.data != null && formData.dataFileName != "") {
            setSubmitDisabled(false);
        }
        else {
            setSubmitDisabled(true);

        }
    });

    const { getRootProps, getInputProps, open } = useDropzone({
        className: "dropzone",
        noClick: true,
        noKeyboard: true,
        accept: {
            "csv/plain": [".csv"],
        },
        onDrop: (acceptedFile) => {
            acceptedFile.forEach((file) => {
                setFormData((prevFormData) => ({ ...prevFormData, ["data"]: file }));
                setFormData((prevFormData) => ({ ...prevFormData, ["dataFileName"]: file.name }));
            })
        },
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitDisabled(true);
        setUploadStatus(`Uploading ${formData.dataFileName}...`);

        // Create FormData object and append data
        const formDataToSend = new FormData();
        formDataToSend.append('data', formData.data);
        formDataToSend.append('dataFileName', formData.dataFileName);
        formDataToSend.append('location', formData.location);

        try {
            // Use Axios to make a POST request
            const response = await axios.post('http://localhost:8000/upload_flight', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            // Assuming the backend returns a URL for the uploaded file
            setUploadedFileURL(response.data.fileURL);

            if (response.status == 200) {
                setSubmitDisabled(false);
                setUploadStatus(`Successfully uploaded ${formData.dataFileName}!`);
                setUploadStatusColor("green");
            }

        } catch (error) {
            // Check if there are any validation errors in the response
            if (error.response && error.response.status === 422) {
                console.log('Validation Error:', error.response.data.detail);
            } else {
                console.error('Error uploading file:', error);
            }

            setUploadStatus(`Failed to upload ${formData.dataFileName}`);
            setUploadStatusColor("red");
        }
    };

    return (

        <div class="flightformorg">
            <form onSubmit={handleSubmit}>
                <h1>Flight Data Form</h1>
                <div class="flightlocationdiv">
                    <LocationTextInput name="location" value={formData.location} onChange={handleChange}/>
                    <FileInput name="data" value={formData.data} onClick={open} filename={formData.dataFileName} inputname="Flight" filetype=".csv"/>
                </div>
                <UploadSubmitButton isSubmitDisabled={isSubmitDisabled}/>
            </form>
            <small><font color={uploadStatusColor}>{uploadStatus}</font></small>
        </div>

    );

}

export default FlightDataForm;