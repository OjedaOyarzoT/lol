//import {useState} from 'react';
//import axios from 'axios';
import './App.css';
//import React from 'react';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter as Router,  Routes, Route} from "react-router-dom";
import PagPrincipal from "./PagPrincipal";
import Jugadores from './Jugadores';

function App() {

return (
         
    <Router>
      <Routes>
        <Route path='/' element={<PagPrincipal/>} />
        <Route path='/jugador' element={<Jugadores/>} />
      </Routes>
    </Router>
          
);
}
export default App;



