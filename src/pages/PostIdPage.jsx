import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchingPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        if (error){
            return;
        }
        setPost(response.data);
    })
    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        if(commentsError){
            return;
        }
        setComments(response.data);
    })

    useEffect(()=>{
        fetchingPostById(params.id)
        fetchComments(params.id)
        /* eslint-disable */
    }, [])

    return (
        <div>
            <h1>Страница поста с ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h2>Комментарии</h2>
            {isCommentsLoading
                ? <Loader/>
                : <div>
                    {comments.map(comment=>
                        <div key={comment.id} style={{marginTop:20}}>
                            <h4>{comment.email}</h4>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;