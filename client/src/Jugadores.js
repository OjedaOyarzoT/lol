import {useState} from 'react';
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


function Jugadores() {
    
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]); 
  const [regiom, setRegion] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [playerDataRank, setPlayerDataRank] = useState([]);
  const apikey = "RGAPI-d03ffe84-1d20-41cf-a17a-ba2acb6dc061";

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

  function searchForPlayer(event){
        var call = "https://"+regiom+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+searchText+"?api_key="+apikey;
       
          axios.get(call).then(function(response){
          setPlayerData(response.data);
          console.log(response.status);
         }).catch(function(error){
          console.log(error);
        });

        axios.get("http://localhost:4000/rank/"+searchText+"/"+regiom)
        .then(function(response){
             setPlayerDataRank(response.data);
             console.log(response.data);
        }).catch(function(error){
             console.log(error);
        });
        
        axios.get("http://localhost:4000/match/"+searchText+"/"+regiom)
        .then(function(response){
             setGameList(response.data);
        }).catch(function(error){
             console.log(error);
        });    

      }

      return (
        <div className="Jugadores">
      
    
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
          <button onClick={e => searchForPlayer(searchText)} >Buscar un jugador</button>
          </div>
           {JSON.stringify(playerData) !== "{}" ? <>
           <p> {playerData.name}</p>
           <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/"+ playerData.profileIconId+".png" } alt="no has buscado jugador"></img>
           <p> Nivel :{playerData.summonerLevel}</p>        
           </>
           :
            <><p>no tenemos datos del jugador</p></>
           }

          {JSON.stringify(playerDataRank) !== '{}'  ? <>
         
          <img height="100" width="100" src={elo(playerDataRank.tier)} alt="no rankea"></img>
                <p> {playerDataRank.tier} {playerDataRank.rank}</p>
                <p> Winrate : {playerDataRank.winrate} %</p>
                <p> LP: {playerDataRank.leaguePoints}</p>
           </>
           :
           <>
             <h1> este invocador no rankea</h1>
           </>
           }
            
           {gameList.length !==0 ?
              <>
               <p> tenemos partidas</p>
               {
                  gameList.map((gameData,index) =>
                    <>
                     <h2> Game {index +1}</h2>
                     <div>
                      {gameData.info.participants.map((data,participantIndex)=> 
                      <p>JUGADOR {participantIndex+1}: {data.summonerName}, KDA: {data.kills}/{data.deaths}/{data.assists}  </p>
                      )
                        }
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