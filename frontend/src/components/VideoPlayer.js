import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';


function VideoPlayer (props) {

    const videoRef = useRef();

    useEffect(() => {
        console.log(props.path);
        if (videoRef.current && props.path) {
            videoRef.current.load();
            videoRef.current.play();
        }
    }, [props.path]);

    return (
        <div>
            <ReactPlayer
                url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Test with a public video URL
                controls={true}
                width="400px"
                height="auto"
            />
        </div>
    );

}

export default VideoPlayer;