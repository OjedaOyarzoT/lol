import {useState} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



function PagPrincipal() {

    const [searchText, setSearchText] = useState("");
    const [regiom, setRegion] = useState([]);

    function redireccionar(){

    };

 return(
<div className="PagPrincipal">
    <input type="text" onChange={e => setSearchText(e.target.value)} ></input>
          <select value={regiom} onChange={e => setRegion(e.target.value)}>
    <option value="br1">BRASIL</option>
    <option value="kr">COREA</option>
    <option value="eun1">EUROPA NÓRDICA Y ESTE</option>
    <option value="euw1">EUROPA OESTE</option>
    <option value="jp1">JAPÓN</option>
    <option value="la1">LATINOAMÉRICA NORTE</option>
    <option value="la2">LATINOAMÉRICA SUR</option>
    <option value="na1">NORTEAMÉRICA</option>
    <option value="oc1">OCEANÍA</option>
    <option value="ru">RUSIA</option>
    <option value="tr1">TURQUÍA</option> 
    </select>
          <div className="container">
          <button onClick={e => redireccionar(searchText)} >Buscar un jugador</button>
          </div>


          <h1>Página principal</h1>
</div>


      );
    
    
    
    }
    export default PagPrincipal;