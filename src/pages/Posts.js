import {useEffect, useState} from 'react';
import '../App.css'
import MyModal from '../components/UI/MyModal/MyModal';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyButton from '../components/UI/button/MyButton';
import {usePosts} from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import {useFetching} from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';


const Posts = () => {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);


  const [fetchPosts, isPostsLoading, postError] = useFetching (async () => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      console.log(response.headers['x-total-count']);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {
    fetchPosts();
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page);
  }

  return (
    <div className="App">
      <MyButton style = {{marginTop: 30}} onClick = {() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError && //Если что-то находится
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading
        ? <div style = {{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        : <PostList remove={removePost} posts = {sortedAndSearchPosts} title = "Список JS"/>
      }
      <Pagination 
        page={page} 
        changePage={changePage}
        totalPage={totalPages}
      />
    </div>
  );
}

export default Posts;