import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LOGO from './images/LOL_Logo.png';
import BG from './images/bg.jpg';
import { useParams } from 'react-router-dom';


const config = require('./config.js');
const API_KEY = config.API_KEY ;
var call = "https://la2.api.riotgames.com/lol/platform/v3/champion-rotations?api_key="+API_KEY;
var call2 = "http://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json";
var datos = [];

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() =>{
    const campeones = [];
    axios.get(call2).then(function(response3){
      for(var x in response3.data.data){
        campeones.push(response3.data.data[x]);
      }
    })
    setOptions(campeones);
  }, []);

  useEffect(() =>{
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    const {current: wrap} = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const setChamp = champ => {
    setSearch(champ);
    setDisplay(false);
  }

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input id="auto" onKeyDown={() => setDisplay(true)} placeholder="Nombre del Campeón" value={search} onChange={event => setSearch(event.target.value)} size="17"></input>
      {display && (
        <div className='autoContainer'>
          {options.filter(({name}) => name.indexOf(search) > -1).map((v,i) => {
            return (
              <div onClick={() => setChamp(v.id)} className="option" key={i}>
              <span class="text-white">{v.name}</span>
              <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${v.id}.png`} alt="img"></img>
              </div>
            )
          })}
        </div>
      )}
      <a href={`./campeon/${search}`}><button>Buscar Campeón</button></a>    
    </div> 
  );
};

const Auto2 = () => {
  const [regi, setRegi] = useState("");
  const [inv, setInv] = useState("");
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() =>{
    const campeones = [];
    axios.get(call2).then(function(response3){
      for(var x in response3.data.data){
        campeones.push(response3.data.data[x]);
      }
    })
    setOptions(campeones);
  }, []);

  useEffect(() =>{
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    const {current: wrap} = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const setChamp = champ => {
    setSearch(champ);
    setDisplay(false);
  }

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input type="text" value={inv} onChange={e => setInv(e.target.value)} placeholder="Nombre de Invocador" size="17"></input>
      <select value={regi} onChange={e => setRegi(e.target.value)}>
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
      <input id="auto" onKeyDown={() => setDisplay(true)} placeholder="Nombre del Campeón" value={search} onChange={event => setSearch(event.target.value)} size="17"></input>
      {display && (
        <div className='autoContainer'>
          {options.filter(({name}) => name.indexOf(search) > -1).map((v,i) => {
            return (
              <div onClick={() => setChamp(v.id)} className="option" key={i}>
              <span class="text-white">{v.name}</span>
              <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${v.id}.png`} alt="img"></img>
              </div>
            )
          })}
        </div>
      )}
      <a href={`./cofre/${inv}/${regi}/${search}`}><button>Buscar</button></a>    
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
<div class="lul">
<div class="container">
<div class="masthead" style={{backgroundImage: `url(${BG})`}}></div>
  <div class="row camp">
    <div class="col-1">
      <img src={LOGO} width="50" height="50" alt="img"></img>
    </div>
    <div class="col-6">
      <input type="text" value={suNombre} onChange={e => setSummoner(e.target.value)} placeholder="Nombre de Invocador" size="17"></input>
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
      <a href={`./jugador/${suNombre}/${suRegion}`}><button>Buscar Jugador</button></a>  
    </div>
    <div class="col-5">
      <Auto />
    </div>
  
<div class="col-4">
  <h3 class="text-white">Rotación semanal</h3>
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
  <img width="70" height="70" alt="nada" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${names[15]}.png`}></img><br></br>
  <a href={'./3d'}><button> ???????????</button></a>
</div>
<div class="col-8">
  <h3 class="text-white">Cofre disponible?</h3>
  <Auto2 />
</div>
</div>




</div>
</div>

      );
    }
    export default PagPrincipal;