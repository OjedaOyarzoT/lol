var express = require('express');
var cors = require('cors')
const axios = require('axios');
const { response } = require('express');
const config = require('./config.js');

var app = express();
app.use(cors());
app.listen(4000);

const API_KEY = config.API_KEY ;

function getPlayerID(playername,reg){
    return axios.get("https://"+reg+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+playername+"?api_key="+API_KEY)
    .then(response => {
        return response.data.id
    }).catch(err => err);
}

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

function getChampionData(ChampionID){
    return axios.get("http://ddragon.leagueoflegends.com/cdn/12.9.1/data/es_MX/champion/"+ ChampionID +".json")
    .then(response => {
        return response.data
    }).catch(err => err);
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

app.get("/partida/:summonerName/:region",async(req,res)=>{
    const summonerName = req.params.summonerName;
    const region = req.params.region;
    let idJug = getPlayerID(summonerName,region);

    idJug.then(function(result) {
    const lapartida = axios.get("https://"+region+".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+result+"?api_key="+API_KEY)
      .then(function(response){
        var arr = [];
        console.log(response.data);   
        arr.push(response.data); 
        res.json(arr);
      }).catch(function(error){
           console.log(error);
           res.json("{}");
      });
    });
});


app.get("/rank/:summonerName/:region",async(req,res)=>{
    const summonerName = req.params.summonerName;
    const region = req.params.region;
    let idJugador = getPlayerID(summonerName,region);
   
    idJugador.then(function(result) {
        const RANKEDINFO = axios.get("https://"+region+".api.riotgames.com/lol/league/v4/entries/by-summoner/"+result+"?api_key="+API_KEY)
        .then(function(response){
          console.log(response.data[0]);
          response.data[0].winrate = ((response.data[0].wins/(response.data[0].wins+response.data[0].losses))*100).toFixed(1)
          res.json(response.data[0]);
        }).catch(function(error){
             console.log(error);
             res.json("{}");
        });

     });

});

app.get("/champ/:championName", async(req,res)=>{
    const championName = req.params.championName;
    var champ = await getChampionData(championName);
    var champ1 = champ.data
    console.log(champ1)
    res.json(champ1[championName]);
});
