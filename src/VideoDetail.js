import {useParams} from 'react-router-dom';
import {useFetch} from './hooks/useFetch';

const VideoDetail = () => {
    const {videoId} = useParams();

    const {data: video, loading: videoLoading, error: videoError} = useFetch(`/api/videos/${videoId}`);
    const {data: comments, loading: commentsLoading, error: commentsError} = useFetch(`/api/comments/${videoId}`);
    const {data: productList, loading: productListLoading, error: productListError} = useFetch(`/api/products/${videoId}`);

    console.log('Video Data:', video);
    console.log('Comments Data:', comments);
    console.log('Product List Data:', productList);

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

                {/* Comment submission form */}
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