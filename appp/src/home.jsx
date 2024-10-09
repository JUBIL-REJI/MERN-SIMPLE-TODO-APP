import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'

function Home() {

  const [todos ,setTodos] =useState([]);
   
  useEffect(()=>{
    axios.get('http://localhost:3001/get').then(result =>setTodos(result.data)) 
    .catch(err=>console.log(err))

  },[])


  const handleDelete =(id)=>{
    axios.delete('http://localhost:3001/delete/'+id)
    .then(result =>setTodos(result.data)) 
    .catch(err=>console.log(err))
  }

  
  return (
    <div>
        <h1>Notes app</h1>
         <Create/>
            {
              todos.length === 0 ? 
                 <div>add notes bro</div>:
                 Array.isArray(todos) && todos?.map((todo,index)=>{
                      return(
                   <div key={index}>
                  <h2>{todo.task}</h2>
                 <button onClick={()=>handleDelete(todo.id)}>delete</button>
               </div>
           )})    
          }
    </div>
  )
}

export default Home