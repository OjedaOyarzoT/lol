import {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]); 

  function getPlayerGames(event){
    axios.get("http://localhost:3000/match")
      .then(function(response){
        setGameList(response.data);
      }).catch(function(error){
        console.log(error);
      })
  }

  console.log(gameList);

  return (
    <div className="App">
      <input type="text" onChange={e => setSearchText(e.target.value)}></input>
      <button onClick={getPlayerGames}>Buscar ultims 5 partidas de un jugador</button>
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
