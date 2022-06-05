import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import IRON from './images/IRON.png';
import BRONZE from './images/BRONZE.png';
import SILVER from './images/SILVER.png';
import GOLD from './images/GOLD.png';
import PLATINUM from './images/PLATINUM.png';
import DIAMOND from './images/DIAMOND.png';
import MASTER from './images/MASTER.png';
import GRANDMASTER from './images/GRANDMASTER.png';
import CHALLENGER from './images/CHALLENGER.png';
import { useParams } from 'react-router-dom';
import { BooleanKeyframeTrack } from 'three';
import {
  Chart
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import Plot from "react-plotly.js";


const config = require('./config.js');

function Jugadores({ match, history }) {
  
  const apikey = config.API_KEY ;
  
  const [gameList, setGameList] = useState([]); 
  const [loading, setLoading] = useState(0);
  const [partida,actual] = useState([]);
  const [playerDataRank, setPlayerDataRank] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [regiom, setRegion] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [summonerId, setId] = useState("");
  const {suNombre} = useParams();
  const {suRegion} = useParams();
  const [ca, setChamps] = useState([]);
  const [jug, setJug] = useState([]);
  const [mastery, setMastery] = useState([]);
  const [lbl, setLabels] = useState([]);
  const [datos, setData] = useState([]);
  const [lbl2, setLabels2] = useState([]);
  const [datos2, setData2] = useState([]);
  const [count, setCount] = useState(0);
  var arr = [];


  const elnombre = {suNombre}.suNombre;
  const laregion = {suRegion}.suRegion;

  function elo(tier){
    switch(tier){
      case "IRON":
        return IRON;
      case "BRONZE":
        return BRONZE;
      case "SILVER":
        return SILVER;
      case "GOLD":
        return GOLD;
      case "PLATINUM":
        return PLATINUM;
      case "DIAMOND":
        return DIAMOND;  
      case "MASTER":
        return MASTER;
      case "GRANDMASTER":
        return GRANDMASTER;
      case "CHALLENGER":
        return CHALLENGER;
      default: break;
    }
  }
  function cambio(ide){
    switch(ide){
      case "false":
          return "#f93034";
      case "true":
          return "lightblue";
  }
  } 
  function camp(championId){
    for(var x in ca){
         if(String(ca[x][1])==String(championId)){

         return String(ca[x][0])
     
     }
    }
  }
  const handleAdd = (dato) => {
   if(count<11){  
   arr.push(dato);
 
    let result = arr.filter((item,index)=>{
      return arr.indexOf(item) === index;
    })
 
    setJug(result);
    setCount(count + 1);
 
   }
  };


  useEffect(() => {

     async function loadData() {
      setLoading(1);

        var call = "https://"+laregion+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+elnombre+"?api_key="+apikey;
          axios.get(call).then(function(response){
          setPlayerData(response.data);
          setId(response.data.id);
         })
         .catch(function(error){
          console.log(error);
        });

        var call2 = "https://"+laregion+".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+summonerId;
        

        axios.get("http://localhost:4000/rank/"+elnombre+"/"+laregion)
        .then(function(response){
             setPlayerDataRank(response.data);
        })
        .catch(function(error){
             console.log(error);
        });
        
        axios.get("http://localhost:4000/partida/"+elnombre+"/"+laregion)
        .then(function(response){
             actual(response.data);
        })
        .catch(function(error){
             console.log(error);
        });

        axios.get("http://localhost:4000/match/"+elnombre+"/"+laregion)
        .then(function(response){
             setGameList(response.data);
        })
        .catch(function(error){
             console.log(error);
        }); 
        
        axios.get("http://localhost:4000/campeonkey/")
        .then(function(response){
             setChamps(response.data);
        })
        .catch(function(error){
             console.log(error);
        }); 

        axios.get("http://localhost:4000/mastery/"+elnombre+"/"+laregion)
        .then(function(response){
             setMastery(response.data);
        })
        .catch(function(error){
             console.log(error);
        }); 
        
        
       if(jug.length>1){
        for(var i in jug){
        var call4= "https://"+laregion+".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+jug[i]+"?api_key="+apikey;
        axios.get(call4).then(function(response){
          setMastery(response.data)    
         })
         .catch(function(error){
          console.log(error);
          
        });
      }
      }

      axios.get("http://localhost:4000/cienPartidas/"+elnombre+"/"+laregion)
        .then(function(response){
                setLabels([response.data[0][0][response.data[0][0].length - 1],response.data[0][1][response.data[0][1].length - 1],response.data[0][2][response.data[0][2].length - 1]]);
                setData(response.data[1]);
                setLabels2([response.data[2]]);
                setData2([response.data[3]])
        })
        .catch(function(error){
                console.log(error);
        }); 


        setLoading(0);
      }
      loadData();

      }, [])

  
        
    
      
      return (
        <div className="Jugadores">
        <div style={{float: 'right'}}>

        <Plot
           data={[
                { type: "bar", 
                  x: lbl, 
                  y: datos,
                  marker: { color: 'rgb(23,24,25)'}
                  },
                ]}
           layout={{ width: 640, height: 480, title: "Tres campeones más jugados en las últimas 100 partidas y su winrate"}}
        />
         <Plot
           data={[
                { type: "bar", 
                  x: lbl, 
                  y: datos,
                  marker: { color: 'rgb(23,24,25)'}
                  },
                ]}
           layout={{ width: 640, height: 480, title: "Tres roles más jugados en las últimas 100 partidas"}}
          />
        </div>
    

       <input type="text" onChange={e => setSearchText(e.target.value)} ></input>
          <select onChange={e => setRegion(e.target.value)}>

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
          <a href={`../${searchText}/${regiom}`} ><button >Buscar un jugador</button></a>

          </div>


          <div style={{display: 'flex', justifyContent: 'center', display: 'grid', 'grid-template-columns' : 'repeat(2,1fr)'}}>
          
           {JSON.stringify(playerData) !== "{}" ? <>
           <div style={{display: 'flex', justifyContent: 'right'}}>
          
           <img width="140" height="140" src={"http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/"+ playerData.profileIconId+".png" } alt="no has buscado jugador"></img>
           <p><h1> {playerData.name}</h1><h5> Nivel {playerData.summonerLevel}</h5> </p>    
           </div> 
           </>
           :
            <><p style={{display: 'flex', justifyContent: 'center'}} >no tenemos datos del jugador</p></>
           }

          {JSON.stringify(playerDataRank) == '"{}"'  ? <>
          <h3 style={{display: 'flex', justifyContent: 'center'}} > Este invocador no rankea</h3>
           </>
           :
           <>
             <div style={{display: 'flex', justifyContent: 'left'}}>
          <img height="140" width="140" src={elo(playerDataRank.tier)} alt="no rankea"></img>
                <p><h3>{playerDataRank.tier} {playerDataRank.rank}  {playerDataRank.leaguePoints} PL</h3>
                <h5>Winrate : {playerDataRank.winrate} % </h5>
                </p>
                </div>           
           </>
           }
            </div>



             {JSON.stringify(partida) !== '"{}"' ?
                  <>
               {
              partida.map((partidaData,index) =>
                <>
                <div  style={{ display: 'grid', 'grid-template-columns' : 'repeat(5,1fr)'}}>

                  {partidaData.participants.map((data,participantIndex)=>



                      <div onLoad={handleAdd(data.summonerId)} style={{clear: 'both', display: 'flex', justifyContent: 'center', display: 'grid', 'grid-template-columns' : 'repeat(1,1fr)'}}>
                        <img width="70" height="70" alt="champ" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${camp(data.championId)}.png`}></img>
                        <br></br>
                        <h4>{data.summonerName}</h4> 
                     
                        
                     

                      </div>




                     )
                    }
                  </div>
           
                </>
              )
                  
           }
           
           </>
           :
           <>
             <div style={{display: 'flex', justifyContent: 'center'}} >
             <h3>Este invocador no está en una partida</h3>
            
            </div>
          
          </>
               }
        


            
           {gameList.length !==0 ?
              <>
               {
                  gameList.map((gameData,index) =>
                    <>
                    <div style={{clear: 'both', display: 'flex', justifyContent: 'center'}}>
                   
                     <table class="default">
                     <h2> Partida {index +1}</h2>
                      {gameData.info.participants.map((data,participantIndex)=> 
                      <tr style={{backgroundColor: cambio(String(data.win)), border: '10px solid', borderColor: `${cambio(String(data.win))}` }}>
                      <th><img width="70" height="70" alt="champ" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${data.championName}.png`}></img></th>  
  
                      <td width="260"><h4>{data.summonerName}</h4></td>
                      <td><img width="25" height="30" alt="" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item0}.png`}></img>
                      <img width="25" height="30" alt="" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item1}.png`}></img>
                      <img width="25" height="30" alt="" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item2}.png`}></img>
                      <img width="25" height="30" alt="" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item3}.png`}></img>
                      <img width="25" height="30" alt="" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item4}.png`}></img>
                      <img width="25" height="30" alt="" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item5}.png`}></img>
                      <img width="25" height="30" alt="" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/item/${data.item6}.png`}></img>
                      </td>
                      <td width="150"><h4>{data.kills}/{data.deaths}/{data.assists}</h4></td>
                      <td> <img width="70" height="70" src={"http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/"+ data.profileIcon+".png" } alt="icono"></img></td>
                      </tr>
                      
                      )
                        }
                     </table>
                     </div>
                    </>
                  )
                      
               }
               
    
              </>
              :
              <>
               <p> no tenemos partidas</p>
              </>
           }
        </div>

       
      );
}
    export default Jugadores;