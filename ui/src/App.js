import React from 'react';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Home from './components/home'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return(
   
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App;
