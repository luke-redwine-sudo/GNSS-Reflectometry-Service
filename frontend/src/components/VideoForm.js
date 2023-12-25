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

import './components_css/VideoForm.css'


function VideoForm() {

    const [formData, setFormData] = useState({location: "Jeanette Creek", video: null, videoFileName:""});
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
        const [uploadedFileURL, setUploadedFileURL] = useState(null);

    useEffect(() => {
        if (formData.location != "" && formData.video != null && formData.videoFileName != "") {
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
            "mp4/video": [".mp4"],
        },
        onDrop: (acceptedFile) => {
            acceptedFile.forEach((file) => {
                setFormData((prevFormData) => ({ ...prevFormData, ["video"]: file }));
                setFormData((prevFormData) => ({ ...prevFormData, ["videoFileName"]: file.name }));
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
        formDataToSend.append('video', formData.video);
        formDataToSend.append('videoFileName', formData.videoFileName);
        formDataToSend.append('location', formData.location);

        try {
            // Use Axios to make a POST request
            const response = await axios.post('http://localhost:8000/upload_video', formDataToSend, {
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

        <div class="videoformorg">
            <form onSubmit={handleSubmit}>
                <h1>Video Data Form</h1>
                <div class="videolocationdiv">
                    <LocationTextInput name="location" value={formData.location} onChange={handleChange}/>
                    <FileInput name="video" value={formData.video} onClick={open} filename={formData.videoFileName} inputname="Video" filetype=".mp4"/>
                </div>
                <UploadSubmitButton isSubmitDisabled={isSubmitDisabled}/>
            </form>
        </div>

    );

}

export default VideoForm;