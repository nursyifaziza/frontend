import React from 'react';
import { Link } from 'react-router-dom';

const VideoThumbnail = ({ video }) => {
    return (
        <Link to={`/video/${video._id}`} className='video-thumbnail'>
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
        </Link>
    )
}

export default VideoThumbnail;