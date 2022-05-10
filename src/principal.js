var express = require('express');
var cors = require('cors')
const axios = require('axios');
const { response } = require('express');

var app = express();


app.use(cors());
app.listen(4000)

const API_KEY = "RGAPI-a017be0f-b150-4e48-b9c1-6dd82f48f1bd";

function getPlayerPUUID(playername,reg){
    return axios.get("https://"+reg+".api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/"+ playername+"?api_key=" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
}

function getContinente(region){
    if(region=="br1"||region=="la1"||region=="la2"||region=="na1")
       return "americas";
    else
       return "europe";
}

app.get("/match/:summonerName/:region",async(req,res)=>{
    const summonerName = req.params.summonerName;
    const region = req.params.region;
    const PUUID = await getPlayerPUUID(summonerName,region);
    const sucontinente = getContinente(region);
    API_CALL = "https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids?api_key=" + API_KEY;
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(gameIDs);

    var matchDataArray = [];
    for(var i = 0; i < gameIDs.length - 15; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/"+ matchID+"?api_key="+API_KEY)
           .then(response => response.data)
           .catch(err => err)
        matchDataArray.push(matchData);
    }

    res.json(matchDataArray);
});