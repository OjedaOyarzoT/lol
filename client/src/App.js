//import {useState} from 'react';
//import axios from 'axios';
import './App.css';
//import React from 'react';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter as Router,  Routes, Route }  from "react-router-dom";
import PagPrincipal from "./PagPrincipal";
import Jugadores from './Jugadores';
import Campeones from './Campeones';
import Tresd from './Tresd.js';

function App() {

return (
         
    <Router>
      <Routes>
        <Route path='/' element={<PagPrincipal/>} />
        <Route path='/jugador/:suNombre/:suRegion' element={<Jugadores/>} />
        <Route path='/campeon/:nCampeon' element={<Campeones/>} />
        <Route path='/3d' element={<Tresd/>} />
      </Routes>
    </Router>
          
);
}
export default App;



