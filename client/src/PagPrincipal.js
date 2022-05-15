import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import searchForPlayer from "./Jugadores";
import { useParams } from 'react-router-dom';
const API_KEY = "RGAPI-2a0ad868-50d2-4ce7-b625-0f96cd9a294e";

var call = "https://la2.api.riotgames.com/lol/platform/v3/champion-rotations?api_key="+API_KEY;
var call2 = "http://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json";

var rotacion = [];
var datos = [];

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() =>{
    const campeones = [];
    axios.get(call2).then(function(response3){
      for(var x in response3.data.data){
        campeones.push(response3.data.data[x]);
      }
    })
    setOptions(campeones);
  }, [])

  return (
    <div className="flex-container flex-column pos-rel">
      <input id="auto" onClick={() => setDisplay(!display)} placeholder="Nombre del Campeon"></input>
      {display && (
        <div className='autoContainer'>
          {options.map((v,i) => {
            return <div className="option" key={i}>
              <span>{v.name}</span>
              <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${v.id}.png`} alt="img"></img>
            </div>
          })}
        </div>
      )}
    </div>
  );
};
  
function PagPrincipal({ history }) {
      

    const [suNombre, setSummoner] = useState("");
    const [suRegion, setRegion] = useState([]);
    const [loading, setLoading] = useState(0);
    const [names, setNames] = useState(0);

    useEffect(() => {
    

      async function loadData() {
       setLoading(1);

axios.get(call).then(function(response){
axios.get(call2).then(function(response2){

  for(var o in response.data.freeChampionIds){
    datos.push(String(response.data.freeChampionIds[o]));
}

const nombres = []
  for (var i in response2.data.data) {
     for(var m in datos){  
          if(response2.data.data[i].key===datos[m]){
              nombres.push(response2.data.data[i].id);
    }       
  }}
  let result = nombres.filter((item,index)=>{
    return nombres.indexOf(item) === index;
  })
   setNames(result);
   console.log(result);
} 
  )
  .catch(function(error){
  console.log(error);
});
})
     .catch(function(error){
      console.log(error);
    });

        }  loadData();

  }, [])

  

 return(
<div className="PagPrincipal">
    <input type="text" value={suNombre} onChange={e => setSummoner(e.target.value)} placeholder="suNombre"></input>
    <select value={suRegion} onChange={e => setRegion(e.target.value)}>
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
    <a href={`./jugador/${suNombre}/${suRegion}`}><button>Buscar un jugador</button></a>    
    <h1>Página principal</h1>
    <div>
      <Auto />
    </div>

<div>
  <h3>Rotación semanal</h3>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[0]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[1]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[2]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[3]}.png`}></img><br></br>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[4]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[5]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[6]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[7]}.png`}></img><br></br>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[8]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[9]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[10]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[11]}.png`}></img><br></br>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[12]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[13]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[14]}.png`}></img>
<img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[15]}.png`}></img>
</div>


</div>

      );
    }
    export default PagPrincipal;