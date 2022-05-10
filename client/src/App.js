import {useState} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import { response } from 'express';

function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]); 
  const [regiom, setRegion] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [playerDataRank, setPlayerDataRank] = useState([]);
  const apikey = "RGAPI-a017be0f-b150-4e48-b9c1-6dd82f48f1bd";

  function searchForPlayer(event){
        var call = "https://"+regiom+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+searchText+"?api_key="+apikey;
        axios.get(call).then(function(response){
          setPlayerData(response.data);
        }).catch(function(error){
          console.log(error);
        });

        axios.get("http://localhost:4000/match/"+playerData.name+"/"+regiom)
        .then(function(response){
             setGameList(response.data);
        }).catch(function(error){
             console.log(error);
        })
        
        axios.get("https://"+regiom+".api.riotgames.com/lol/league/v4/entries/by-summoner/"+playerData.id+"?api_key="+apikey)
        .then(function(response){
          setPlayerDataRank(response.data);
        }).catch(function(error){
             console.log(error);
        })

      }

      console.log(playerDataRank);
      

    
  return (
    <div className="App">

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
       {JSON.stringify(playerData) !== '{}' ? <>
       <p> {playerData.name}</p>
       <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/"+ playerData.profileIconId+".png" } alt="no has buscado jugador"></img>
       <p> Nivel :{playerData.summonerLevel}</p>        
       </>
       :
        <><p>no tenemos datos del jugador</p></>
       }

       
      {JSON.stringify(playerDataRank) !== '{}' ? <>
            <p> {playerDataRank.tier}</p>
            <p> {playerDataRank.rank}</p>  
            <p>Winrate: {playerDataRank.wins} + {playerDataRank.losses}</p>  
       </>
       :
        <><p>Este invocador no rankea</p></>
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
export default App;



