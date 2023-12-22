import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Datetime from './Datetime.js';
import FileInput from './FileInput.js';
import LocationTextInput from './LocationTextInput.js';
import GNSSSelector from './GNSSSelector.js';
import TideTextInput from './TideTextInput.js';
import UploadSubmitButton from './UploadSubmitButton.js'

function GNSSDataForm() {

    return (

        <div>
            <h1>GNSSDataForm</h1>
            <Datetime />
            <FileInput inputname={"GNSS"} filetype={".23O"}/>
            <LocationTextInput />
            <GNSSSelector />
            <TideTextInput />
            <UploadSubmitButton />
        </div>
    );

}

export default GNSSDataForm;