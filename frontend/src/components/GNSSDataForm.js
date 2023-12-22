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

    return (
        <div class="gnssformorg">
            <h1>GNSS Data Form</h1>
            <LocationTextInput />
            <GNSSSelector />
            <FileInput inputname={"GNSS"} filetype={".23O"}/>
            <UploadSubmitButton />
        </div>
    );

}

export default GNSSDataForm;