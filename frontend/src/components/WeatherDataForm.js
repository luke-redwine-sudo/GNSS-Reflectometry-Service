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

import './components_css/WeatherDataForm.css'
import "./components_css/Datetime.css"


function WeatherDataForm() {

    const [formData, setFormData] = useState({location: "Jeanette Creek", date: "", time: "", tide: null, data: null, dataFileName:""});
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
        const [uploadedFileURL, setUploadedFileURL] = useState(null);

    useEffect(() => {
        if (formData.location != "" && formData.date != "" && formData.time != "" && formData.tide != null && formData.data != null && formData.dataFileName != "") {
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

        // Create FormData object and append data
        const formDataToSend = new FormData();
        formDataToSend.append('data', formData.data);
        formDataToSend.append('date', formData.date);
        formDataToSend.append('time', formData.time);
        formDataToSend.append('tide', formData.tide);
        formDataToSend.append('dataFileName', formData.dataFileName);
        formDataToSend.append('location', formData.location);

        try {
            // Use Axios to make a POST request
            const response = await axios.post('http://localhost:8000/upload_weather', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            // Assuming the backend returns a URL for the uploaded file
            setUploadedFileURL(response.data.fileURL);

            // Handle the response or perform additional actions as needed
            console.log(response.data);

        } catch (error) {
            // Check if there are any validation errors in the response
            if (error.response && error.response.status === 422) {
                console.log('Validation Error:', error.response.data.detail);
            } else {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (

        <div class="weatherformorg">
            <form onSubmit={handleSubmit}>
                <h1>Weather Data Form</h1>
                <div class="horizontalweather">
                    <div class="datetimewrapper">
                        <Date name="date" value={formData.date} onChange={handleChange} />
                        <Time name="time" value={formData.time} onChange={handleChange} />
                    </div>
                    <div class="weatherlocationdiv">
                        <div>
                            <LocationTextInput name="location" value={formData.location} onChange={handleChange}/>
                            <TideTextInput name="tide" value={formData.tide} onChange={handleChange}/>
                            <FileInput name="data" value={formData.data} onClick={open} filename={formData.dataFileName} inputname="Weather" filetype=".csv"/>
                        </div>
                    </div>
                </div>
                <UploadSubmitButton isSubmitDisabled={isSubmitDisabled}/>
            </form>
        </div>

    );

}

export default WeatherDataForm;