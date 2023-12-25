import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone'
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import FileInput from './FileInput.js';
import LocationTextInput from './LocationTextInput.js';
import UploadSubmitButton from './UploadSubmitButton.js'

import './components_css/SatelliteDataForm.css'


function SatelliteDataForm() {

    const [formData, setFormData] = useState({location: "Jeanette Creek", data: null, dataFileName:""});
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
        const [uploadedFileURL, setUploadedFileURL] = useState(null);

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
            "ngz/plain": [".ngz"],
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
        formDataToSend.append('dataFileName', formData.dataFileName);
        formDataToSend.append('location', formData.location);

        try {
            // Use Axios to make a POST request
            const response = await axios.post('http://localhost:8000/upload_satellite', formDataToSend, {
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

        <div class="satelliteformorg">
            <form onSubmit={handleSubmit}>
                <h1>Satellite Data Form</h1>
                <div class="satellitelocationdiv">
                    <LocationTextInput name="location" value={formData.location} onChange={handleChange}/>
                    <FileInput name="data" value={formData.data} onClick={open} filename={formData.dataFileName} inputname="Satellite" filetype=".csv"/>
                </div>
                <UploadSubmitButton isSubmitDisabled={isSubmitDisabled}/>
            </form>
        </div>

    );

}

export default SatelliteDataForm;