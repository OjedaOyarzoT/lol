var express = require('express');
var cors = require('cors');
const axios = require('axios');
const { response } = require('express');

var app = express();


app.use(cors());
app.listen(4000)

const API_KEY = "RGAPI-949fe819-d828-4226-af2b-779aa6f590e2";

const playername = "bluesstyles";
const reg = "la2";

function getPlayerPUUID(playername,reg){
    return axios.get("https://"+ reg +".api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/"+ playername +"?api_key=" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
}

function getContinente(reg){
    if(reg=="br1"||reg=="la1"||reg=="la2"||reg=="na1")
       return "americas";
    else
       return "europe";
}

app.get("/summoner", async(req,res)=>{
    const PUUID = await getPlayerPUUID(playername,reg);
    const sucontinente = getContinente(reg);
    API_CALL = "https://"+ sucontinente +".api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids?api_key=" + API_KEY;
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    
    var matchDataArray = [];
    for(var i = 0; i < gameIDs.length - 15; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/"+ matchID+"?api_key="+API_KEY)
           .then(response => response.data)
           .catch(err => err)
        matchDataArray.push(matchData);
    }

    API_CALL2 = "https://"+ reg +".api.riotgames.com" + "/lol/summoner/v4/summoners/by-puuid/"+ PUUID +"?api_key=" + API_KEY;
    var iconID = await axios.get(API_CALL2)
        .then(response => response.data.profileIconId)
        .catch(err => err)
    console.log(iconID)
    var icon = await axios.get("http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/"+ iconID +".png")
        .then(response => response.data)
        .catch(err => err)
    
    res.send(icon);
})