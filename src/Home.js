import React from 'react';
import './styles/styles.css';
import VideoThumbnail from './VideoThumbnail';
import {useFetch} from './hooks/useFetch';

const Home = () => {
    const {data: videos, loading, error} = useFetch('api/videos');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading videos</div>;
    }

    return (
        <div className='home-container'>
            <h1>Live Shopping Videos</h1>
            <div className='video-thumbnails'>
                {videos.map(video => (<VideoThumbnail key={video._id} video={video}/>))}
            </div>
        </div>
    );
};

export default Home;