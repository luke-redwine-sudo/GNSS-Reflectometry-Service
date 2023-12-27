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
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploadStatusColor, setUploadStatusColor] = useState("#8EC5FC");

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
                setUploadStatusColor("#8EC5FC");
                setUploadStatus("");
            })
        },
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
        setUploadStatus(`Uploading ${formData.videoFileName}...`);

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

            if (response.status == 200) {
                setSubmitDisabled(false);
                setUploadStatus(`Successfully uploaded ${formData.videoFileName}!`);
                setUploadStatusColor("green");
            }

        } catch (error) {
            // Check if there are any validation errors in the response
            if (error.response && error.response.status === 422) {
                console.log('Validation Error:', error.response.data.detail);
            } else {
                console.error('Error uploading file:', error);
            }

            setUploadStatus(`Failed to upload ${formData.videoFileName}`);
            setUploadStatusColor("red");
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
            <small><font color={uploadStatusColor}>{uploadStatus}</font></small>
        </div>

    );

}

export default VideoForm;