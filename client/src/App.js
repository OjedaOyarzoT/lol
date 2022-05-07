import {useState} from 'react';
//import {setState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]); 
  const [playerData, setPlayerData] = useState([]);
  const apikey = "RGAPI-58358b62-b6be-40f1-b4b9-50ca7f0e9e7e";

  function searchForPlayer(event){
        var call = "https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+searchText+"?api_key="+apikey;
        axios.get(call).then(function(response){
          setPlayerData(response.data);
        }).catch(function(error){
          console.log(error);
        });
        getPlayerGames(searchText);
      }
  
      console.log(playerData);

  function getPlayerGames(e,name){
    axios.get("http://localhost:4000/match/"+name)
      .then(function(response){
        setGameList(response.data);
      }).catch(function(error){
        console.log(error);
      })
  }

  //console.log(gameList);
 
   //  <button onClick={e => getPlayerGames(e,{playerData.name})}>Buscar ultims 5 partidas de un jugador</button>

  return (
    <div className="App">
      <input type="text" onChange={e => setSearchText(e.target.value)} ></input>

      <div className="container">
      <button onClick={e => searchForPlayer(searchText)}>Buscar un jugador</button>
      </div>
       {JSON.stringify(playerData) !== '{}' ? <>
       <p> {playerData.name}</p>
       <p> {playerData.summonerLevel}</p>
       </>
       :
        <><p>no tenemos datos del jugador</p></>

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
       }
      </div>
  );
}

export default App;


/*
<select id="m" value={reg} onChange={e => setRegion(e.target.value)}>
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
</select>*/
