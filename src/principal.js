var express = require('express');
var cors = require('cors')
const axios = require('axios');
const { response } = require('express');

var app = express();
app.listen(3000)
app.use(cors());

const API_KEY = "RGAPI-2818de61-abc9-4221-a4a9-d79f2317c0cf"

function getPlayerPUUID(playername){
    return axios.get("https://la2.api.riotgames.com"+"/lol/summoner/v4/summoners/by-name/"+ playername+"?api_key=" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
}

app.get("/match",async(req,res)=>{
    //const { summonerName } = req.params;
    const PUUID = await getPlayerPUUID("Desmy");
    API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids?api_key=" + API_KEY;
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(gameIDs);

    var matchDataArray = [];
    for(var i = 0; i < gameIDs.length - 15; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com"+"/lol/match/v5/matches/"+ matchID+"?api_key="+API_KEY)
           .then(response => response.data)
           .catch(err => err)
        matchDataArray.push(matchData);
    }

res.json(matchDataArray);
});

