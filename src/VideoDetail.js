import {useParams} from 'react-router-dom';
import {useFetch} from './hooks/useFetch';
import {useState, useEffect} from 'react';
import {Button, Heading, Input, Textarea, VStack } from '@chakra-ui/react'

const VideoDetail = () => {
    const {videoId} = useParams();

    const {data: video, loading: videoLoading, error: videoError} = useFetch(`/api/videos/${videoId}`);
    const {data: comments, loading: commentsLoading, error: commentsError} = useFetch(`/api/comments/${videoId}`);
    const {data: productList, loading: productListLoading, error: productListError} = useFetch(`/api/products/${videoId}`);

    const [newComment,
        setNewComment] = useState({username: '', text: ''});
    const [commentsState,
        setCommentsState] = useState([]);

    useEffect(() => {
        setCommentsState(comments); // Update the commentsState with the fetched comments
    }, [comments]);

    const refreshComments = async() => {
        try {
            const response = await fetch(`/api/comments/${videoId}`);
            if (response.ok) {
                const data = await response.json();
                setCommentsState(data);
            }
        } catch (error) {
            console.error('Error refreshing comments:', error);
        }
    }

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
            const response = await fetch(`http://localhost:5000/api/comments/${videoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: newComment.username, text: newComment.text, videoId: videoId})
            });

            console.log(JSON.stringify({username: newComment.username, text: newComment.text, videoId: videoId}));
            if (response.ok) {
                setNewComment({username: '', text: ''});
                refreshComments();
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
                <Heading as='h3' size='lg'>Comments</Heading>
                <ul>
                    {commentsState.map(comment => (
                        <li key={comment._id}>
                            <p>{comment.username}</p>
                            <p>{comment.text}</p>
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleCommentSubmit}>
                    <Heading as='h3' size='lg'>Add a Comment</Heading>
                    <VStack spacing='16px'>
                        <Input
                            type='text'
                            name='username'
                            value={newComment.username}
                            onChange={handleCommentChange}
                            placeholder='Your username'/>
                        <Textarea
                            name='text'
                            value={newComment.text}
                            onChange={handleCommentChange}
                            placeholder='Your comment'/>
                        <Button colorScheme='green' type='submit'>Submit Comment {console.log(newComment)}</Button>
                    </VStack>
                </form>
            </div>

            <div className='product-list'>
                <Heading as='h3' size='lg'>Product List</Heading>
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