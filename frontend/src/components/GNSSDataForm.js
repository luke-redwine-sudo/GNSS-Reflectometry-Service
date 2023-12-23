import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Datetime from './Datetime.js';
import FileInput from './FileInput.js';
import LocationTextInput from './LocationTextInput.js';
import GNSSSelector from './GNSSSelector.js';
import TideTextInput from './TideTextInput.js';
import UploadSubmitButton from './UploadSubmitButton.js'

import './components_css/GNSSDataForm.css'

function GNSSDataForm() {

    const [formData, setFormData] = useState({location: "Jeanette Creek",source: "Drone",data: ""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        alert(`Location: ${formData.location}, Source: ${formData.source}, Data: ${formData.data}`);
    };

    return (
        <div class="gnssformorg">
            <form onSubmit={handleSubmit}>
                <h1>GNSS Data Form</h1>
                <LocationTextInput name="location" value={formData.location} onChange={handleChange}/>
                <GNSSSelector name="source" value={formData.source} onChange={handleChange} />
                <FileInput name="data" value={formData.data} onChange={handleChange} inputname={"GNSS"} filetype={".23O"}/>
                <UploadSubmitButton />
            </form>
        </div>
    );

}

export default GNSSDataForm;