import React, { useState } from 'react'
import axios from 'axios'

const Create = () => {
   
  const [task ,setTask] =useState([])

  const handleAdd =()=>{
      axios.post('http://localhost:3001/add',{task:task})
      .then(result => {
       window.location.reload()
      })
      .catch(err=>console.log(err))
      
  }


  return (
    <div>
      <input type='text' placeholder='write your note' onChange={(e)=>setTask(e.target.value)}/>
      <button className="btn-sub"onClick={handleAdd}>add</button>
    </div>
  )
}

export default Create