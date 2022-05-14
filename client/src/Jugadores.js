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
const config = require('./config.js');

function Jugadores({ match, history }) {
  
  const apikey = config.API_KEY ;
  const [gameList, setGameList] = useState([]); 
  const [loading, setLoading] = useState(0);
  const [playerDataRank, setPlayerDataRank] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [regiom, setRegion] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [summonerId, setId] = useState("");
  const {suNombre} = useParams();
  const {suRegion} = useParams();

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
        
        axios.get("http://localhost:4000/match/"+elnombre+"/"+laregion)
        .then(function(response){
             setGameList(response.data);
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
           {JSON.stringify(playerData) !== "{}" ? <>
           <p> {playerData.name}</p>
           <img width="140" height="140" src={"http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/"+ playerData.profileIconId+".png" } alt="no has buscado jugador"></img>
           <p> Nivel :{playerData.summonerLevel}</p>        
           </>
           :
            <><p>no tenemos datos del jugador</p></>
           }

          {JSON.stringify(playerDataRank) == '"{}"'  ? <>
          <h3> este invocador no rankea</h3>
           </>
           :
           <>
             <div>
          <img height="140" width="140" src={elo(playerDataRank.tier)} alt="no rankea"></img>
                <p> {playerDataRank.tier} {playerDataRank.rank}</p>
                <p> Winrate : {playerDataRank.winrate} %</p>
                <p> LP: {playerDataRank.leaguePoints}</p>
                </div>

           
           </>
           }
            
           {gameList.length !==0 ?
              <>
               {
                  gameList.map((gameData,index) =>
                    <>
                     <h2> Partida {index +1}</h2>
                     <table class="default">
                      {gameData.info.participants.map((data,participantIndex)=> 
                      <tr>
                      <th><img width="70" height="70" alt="campeón" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${data.championName}.png`}></img></th>   
                      <td><h3>{data.summonerName}</h3></td><td><h3>{data.kills}/{data.deaths}/{data.assists}</h3></td>
                      <td> <img width="70" height="70" src={"http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/"+ data.profileIcon+".png" } alt="no has buscado jugador"></img></td>
                      <td></td>
                      </tr>
                      )
                        }
                        </table>
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