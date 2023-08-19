import {useParams} from 'react-router-dom';
import {useFetch} from './hooks/useFetch';
import {useState} from 'react';

const VideoDetail = () => {
    const {videoId} = useParams();

    const {data: video, loading: videoLoading, error: videoError} = useFetch(`/api/videos/${videoId}`);
    const {data: comments, loading: commentsLoading, error: commentsError} = useFetch(`/api/comments/${videoId}`);
    const {data: productList, loading: productListLoading, error: productListError} = useFetch(`/api/products/${videoId}`);

    const [newComment,
        setNewComment] = useState({username: '', text: ''});

    const handleCommentChange = (event) => {
        const {name, value} = event.target;
        setNewComment((prevComment) => ({
            ...prevComment,
            [name]: value
        }));
    };

    const handleCommentSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/comments/${videoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            });

            if (response.ok) {
                setNewComment({username: '', text: ''});
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    }

    if (videoLoading || commentsLoading || productListLoading) {
        return <div>Loading...</div>;
    }

    if (videoError || commentsError || productListError) {
        return <div>Error loading video details</div>;
    }

    return (
        <div className='video-detail-container'>
            <iframe
                width={560}
                height={315}
                src={video.url}
                title='Video Player'
                allowFullScreen></iframe>

            <div className='comments-section'>
                <h2>Comments</h2>
                <ul>
                    {comments.map(comment => (
                        <li key={comment._id}>
                            <p>{comment.username}</p>
                            <p>{comment.text}</p>
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleCommentSubmit}>
                    <h2>Comments</h2>
                    <input
                        type='text'
                        name='username'
                        value={newComment.username}
                        onChange={handleCommentChange}
                        placeholder='Your Name'/>
                    <textarea
                        name='text'
                        value={newComment.text}
                        onChange={handleCommentChange}
                        placeholder='Your Comment'/>
                    <button type='submit'>Submit Comment</button>
                </form>
            </div>

            <div className='product-list'>
                <h2>Product List</h2>
                <ul>
                    {productList.map(product => (
                        <li key={product._id}>
                            <p>{product.title}</p>
                            <p>{product.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VideoDetail;