import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort:'', query:''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const lastPostElement = useRef();

    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));

    })

    useObserver(lastPostElement, page<totalPages, isPostLoading, ()=>{
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page);
        /* eslint-disable */
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false);
    }
    const removePost = (post) => {
        setPosts(posts.filter(p=>p.id !== post.id))
    }

    const changePage = (page) => {
        setPosts([])
        setPage(page);
    }

    return (
        <div className="App">
            <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
                <MyButton onClick={() => setModal(true)} style={{fontSize:'20px'}}>Создать пост</MyButton>
            </div>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                defaultValue="Количество постов на странице"
                onChange={value => setLimit(value)}
                options={[
                    {value:5, name:'5'},
                    {value:10, name:'10'},
                    {value:25, name:'25'},
                    {value:-1, name:'Все'},
                ]}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList posts={sortedAndSearchedPosts} title="Список постов" remove={removePost}/>
            <div ref={lastPostElement} style={{height:20, background:'#f00'}}></div>
            {isPostLoading &&
                <Loader/>
            }
            <Pagination totalPages={totalPages} current={page} setPage={changePage} />
        </div>
    );
}

export default Posts;
