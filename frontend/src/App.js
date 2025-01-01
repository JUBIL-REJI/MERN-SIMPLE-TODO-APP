import React from "react";
import './index.css'
import Contextprovider from "./context/Contextprovider";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Create from "./Create";
import NoteFound from "./NoteFound";





function App() {
  return (
    <Contextprovider>
      <BrowserRouter>
      <Routes>
        <Route path ="/" element = { <Create/>}/>
        <Route path="notfound" element = {<NoteFound/>}/>
      
      </Routes>

      </BrowserRouter>
   
    </Contextprovider>
  );
}

export default App;
