import React from 'react';
import {Link} from 'react-router-dom';
import {AspectRatio, Image} from '@chakra-ui/react'

const VideoThumbnail = ({video}) => {
    return (
        <Link to={`/video/${video._id}`} className='video-thumbnail'>
            <AspectRatio maxW='400px' ratio={4 / 3}>
                <Image src={video.thumbnail} alt={video.title}/>
            </AspectRatio>
            <p>{video.title}</p>
        </Link>
    )
}

export default VideoThumbnail;