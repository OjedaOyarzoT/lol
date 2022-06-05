const config = require('../config.js');
const API_KEY = config.API_KEY ;
const axios = require('axios');
const funciones = require("./funciones.js");
var cors = require('cors');
const { response } = require('express');
const jugadores = {}

jugadores.match = async(req,res)=>{
     const summonerName = req.params.summonerName;
     const region = req.params.region;
     const PUUID = await funciones.getPlayerPUUID(summonerName,region);
     const sucontinente = funciones.getContinente(region);
     API_CALL = "https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids?api_key=" + API_KEY;
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
     res.json(matchDataArray);
 };

jugadores.partidaActual = async(req,res)=>{
    const summonerName = req.params.summonerName;
    const region = req.params.region;
    let idJug = funciones.getPlayerID(summonerName,region);

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
};

jugadores.rank = async(req,res)=>{
    const summonerName = req.params.summonerName;
    const region = req.params.region;
    let idJugador = funciones.getPlayerID(summonerName,region);
   
    idJugador.then(function(result) {
        const RANKEDINFO = axios.get("https://"+region+".api.riotgames.com/lol/league/v4/entries/by-summoner/"+result+"?api_key="+API_KEY)
        .then(function(response){
          console.log(response.data);
          response.data[0].winrate = ((response.data[0].wins/(response.data[0].wins+response.data[0].losses))*100).toFixed(1)
          res.json(response.data[0]);
        }).catch(function(error){
             console.log(error);
             res.json("{}");
        });

     });

};

jugadores.campeonKey = async(req,res)=>{

    const todo = await axios.get("http://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json")
    .then(response => response.data)
    .catch(err => err)
    var arr = [];

    for(i in todo.data){
           arr.push([String(todo.data[i].id),String(todo.data[i].key)]); 
    }
    res.json(arr);

};

jugadores.mastery = async(req,res)=>{
    const summonerName = req.params.summonerName;
    const region = req.params.region;
    let idJugador = await funciones.getPlayerID(summonerName,region);
    const PUUID = await funciones.getPlayerPUUID(summonerName,region);
    const sucontinente = funciones.getContinente(region);
    axios.get("https://"+region+".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+idJugador+"?api_key="+API_KEY
    ).then(function(response){
        arr2 = [];
        arr2.push(response.data[0]);
        arr2.push(response.data[1]);
        arr2.push(response.data[2]);      
        res.json(arr2);
   }).catch(function(error){
        console.log(error);
        res.json("{}");
   });
 
 };

module.exports = jugadores;