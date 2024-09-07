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

import "./components_css/VideoSelector.css"

function VideoSelector (props) {

    return (
            <div class="videoselectorwrapper">
                <label class="videoselectorlabel">Video Choice:
                    <select class="videoselector" name={props.name} id={props.name} value={props.value} onChange={(e) => { props.onChange(e, props.options.find((item) => item.id === e.target.value)) }}>
                        {props.options.map(function(item, idx) {
                            return (<option key={idx} value={item.id}>{item.name}</option>)
                        })}
                    </select>
                </label>
            </div>
    );
}

export default VideoSelector;