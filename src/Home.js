import React from 'react'
import Feed from './Feed'
import  { useContext } from 'react'
import DataContext from './context/DataContext.js'

const Home = () => {
  const {searchResults}=useContext(DataContext)
  return (
    <main className='Home'>
        {searchResults.length ? (
          <Feed posts={searchResults}/>
        ):(
          <p style={{marginTop:"2rem"}}> 
          No post to display.
          </p>
        )}
    </main>
  )
}

export default Home