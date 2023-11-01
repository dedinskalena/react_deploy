import { createContext,useEffect,useState } from "react";
import {useNavigate} from 'react-router-dom'
import {format} from 'date-fns'
import api from '../api/post'
 

const DataContext=createContext({}) 

export const DataProvider=({children})=>{
const [posts,setPosts]=useState([])
const [search,setSearch]=useState('')
const [searchResults,setSerachResults]=useState([])
 

const navigate=useNavigate()
 



useEffect(()=>{
  const fetchPost= async ()=>{
    try{
      const response=await api.get('/posts') 
      setPosts(response.data)
    }catch(error){
      if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }else{
        console.log(`Error:${error.message}`)
      }
      
    }
  }
  fetchPost()
},[])

useEffect(()=>{
  const filteredResults=posts.filter((post)=>
  ((post.body).toLowerCase()).includes(search.toLowerCase())
  ||((post.title).toLowerCase()).includes(search.toLowerCase()))
  setSerachResults(filteredResults.reverse())
},[posts,search])








    return (
        <DataContext.Provider value={{
          search,setSearch,searchResults,posts,setPosts
        }}>
        {children}
        </DataContext.Provider>
    )
}

export default DataContext