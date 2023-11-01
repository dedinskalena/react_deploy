 import React from 'react'
 import { useState,useEffect} from 'react'
 import  { useContext } from 'react'
 import DataContext from './context/DataContext.js'
 import {useNavigate} from 'react-router-dom'
 import api from './api/post.js'
 import {format} from 'date-fns'

const NewPost = () => {
const [postTitle,setPostTitle]=useState('')
const [postBody,setPostBody]=useState('')
const navigate=useNavigate()

const {posts,setPosts}=useContext(DataContext)
const handleSubmit=async (e)=>{
  e.preventDefault()
  const  id=posts.length ?posts[posts.length-1].id+1:1
  const datetime=format(new Date(),'MMMM dd, yyyy pp')
  const newPost={id,title:postTitle, datetime, body:postBody}

  try{
    const response=await api.post('/posts',newPost)
    const allPost=[...posts,response.data]
    setPosts(allPost)
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }catch(error){
    console.log(`Error:${error.message}`)
  }
}
   return (
    <main className='NewPost'>
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
          <label htmlFor='postTitle'>Title:</label>
          <input 
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e)=>setPostTitle(e.target.value)}
          />
          <label htmlFor='postBody'>Body:</label>
          <textarea 
          id='postBody'
          required
          value={postBody}
          onChange={(e)=>setPostBody(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>  
    </main>
   )
 }
 
 export default NewPost