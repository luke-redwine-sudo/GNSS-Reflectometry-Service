import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import Datetime from './Datetime.js';
import FileInput from './FileInput.js';
import LocationTextInput from './LocationTextInput.js';
import GNSSSelector from './GNSSSelector.js';
import TideTextInput from './TideTextInput.js';
import UploadSubmitButton from './UploadSubmitButton.js'

import './components_css/GNSSDataForm.css'

function GNSSDataForm() {

    const [formData, setFormData] = useState({location: "Jeanette Creek",source: "Drone",data: null, dataFileName:""});
    const [uploadedFileURL, setUploadedFileURL] = useState(null);

    const { getRootProps, getInputProps, open } = useDropzone({
        className: "dropzone",
        noClick: true,
        noKeyboard: true,
        accept: {
            "23o/plain": [".23o"],
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
        formDataToSend.append('source', formData.source);
        formDataToSend.append('location', formData.location);

        try {
            // Use Axios to make a POST request
            const response = await axios.post('http://localhost:8000/upload', formDataToSend, {
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
        <div class="gnssformorg">
            <form onSubmit={handleSubmit}>
                <h1>GNSS Data Form</h1>
                <LocationTextInput name="location" value={formData.location} onChange={handleChange}/>
                <GNSSSelector name="source" value={formData.source} onChange={handleChange} />
                <FileInput name="data" value={formData.data} onClick={open} inputname="GNSS" filetype=".23O"/>
                <UploadSubmitButton />
            </form>
        </div>
    );

}

export default GNSSDataForm;