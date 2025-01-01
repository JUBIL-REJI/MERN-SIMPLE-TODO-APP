import React, { useState } from 'react'
import TodoContext from './Createcontect'

function Contextprovider({children}) {
   const [todos, setTodos] = useState([]);
  return (
   <TodoContext.Provider value={{todos,setTodos}}> 
      {children}
   </TodoContext.Provider>
  )
}

export default Contextprovider