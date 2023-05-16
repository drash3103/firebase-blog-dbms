import React from 'react'
import Nav from './components/Nav'
import EditBlog from './components/EditBlog'
import DisplayBlog from './components/DisplayBlog'
import firebase from './firebase'
function App() {
  return (
   <>

   <Nav/>
   <EditBlog/>
   <DisplayBlog/>
   </>
  )
}

export default App