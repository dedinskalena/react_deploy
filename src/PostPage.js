import React from 'react'
import { useParams,Link } from 'react-router-dom'
import  { useContext } from 'react'
import DataContext from './context/DataContext.js'
import {useNavigate} from 'react-router-dom'
import api from './api/post.js'


const PostPage = () => {
  const {posts,setPosts}=useContext(DataContext)
  const {id}=useParams()
  const post=posts.find(post=>post.id==id)
  const navigate=useNavigate()

  const handleDelete=async (id)=>{
    try{
      await api.delete(`/posts/${id}` )
      const postsList=posts.filter(post=>post.id!=id)
      setPosts(postsList)
      navigate('/')
    }catch(error){
      console.log(`Error:${error.message}`)
    }
    }
    

  return (
    <main className='PostPage'>
      <article className='post'>
      {post && 
        <>
        <h2>{post.title}</h2>
        <p className='postDate'>{post.datetime}</p>
        <p className='posBody'>{post.body}</p>
        <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
        <button className='deleteButton' onClick={()=>handleDelete(post.id)}>
          Delete Post
        </button>
        </>
      }
      {!post&&
      <>
        <h2>Post Not found</h2>
        <p>Well that is disappointing</p>
        <p>
            <Link to='/'>Visit our Homepage</Link>
        </p>
      </>

      }
      </article>
         
    </main>
  )
}

export default PostPage