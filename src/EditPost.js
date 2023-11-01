import React from 'react'
import  { useContext } from 'react'
import DataContext from './context/DataContext.js'
import { useEffect ,useState} from 'react'
import { useParams,Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import api from './api/post.js'
import format from 'date-fns/format'

const EditPost = () => {
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const navigate=useNavigate()

    const {posts,setPosts}=useContext(DataContext)
    const {id}=useParams()
    const post=posts.find(post=>(post.id).toString()===id)   

    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post,setEditTitle,setEditBody])

    const handleEdit=async (id)=>{
      const datetime=format(new Date(),'MMMM dd, yyyy pp')
      const updatedPost={id,title:editTitle, datetime, body:editBody}
      try{
        const response=await api.put(`/posts/${id}`,updatedPost)
        setPosts(posts.map(post=>post.id===id?{...response.data}:post))
        setEditBody('')
        setEditTitle('')
        navigate('/')
      
      }catch(error){
          console.log(`Error:${error.message}`)
        }
      
      
      }



   return (
    <main className='NewPost'>
        {editTitle&&
        <>
            <h2>Edit Post</h2>
            <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input 
            id="postTitle"
            type="text"
            required
            value={editTitle}
            onChange={(e)=>setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Body:</label>
            <textarea 
            id='postBody'
            required
            value={editBody}
            onChange={(e)=>setEditBody(e.target.value)}
            />
            <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
            </form>  
        </>
        }
        {!editTitle&&
      <>
        <h2>Post Not found</h2>
        <p>Well that is disappointing</p>
        <p>
            <Link to='/'>Visit our Homepage</Link>
        </p>
      </>
    }
    </main>
   )
 }

export default EditPost