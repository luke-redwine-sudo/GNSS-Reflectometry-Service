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
import VideoSelector from './VideoSelector.js'
import VideoPlayer from './VideoPlayer.js'

import './components_css/VideoTile.css'

function VideoTile (props) {

    const [formData, setFormData] = useState({video_option: props.options});
    const [currentVideo, setCurrentVideo] = useState("");
    const [currentVideoId, setCurrentVideoId] = useState("");
    const [currentVideoPath, setCurrentVideoPath] = useState("");

    const handleChange = (event, selectedItem) => {
        setCurrentVideo(selectedItem.name);
        setCurrentVideoId(selectedItem.id);
        console.log(selectedItem.path);
        setCurrentVideoPath(selectedItem.path);
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
            <div class="videotileformorg">
                <div>
                    <h1>Video Tile</h1>
                    <div class="horizontalvideotile">
                        <div class="videotilelocationdiv">
                            <VideoSelector name="video_option" value={formData.video_option} options={props.options} onChange={handleChange} />
                            <VideoPlayer path={currentVideoPath} />
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default VideoTile;