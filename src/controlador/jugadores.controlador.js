const config = require('../config.js');
const API_KEY = config.API_KEY ;
const axios = require('axios');
const funciones = require("./funciones.js");
var cors = require('cors');
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

jugadores.cienPartidas = async(req,res)=>{
    const summonerN = req.params.summonerName;
    const region = req.params.region;
    const PUUID = await funciones.getPlayerPUUID(summonerN,region);
    const sucontinente = funciones.getContinente(region);
    API_CALL = "https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids?start=0&count=100&api_key=" + API_KEY;
    const gameIDs = await axios.get(API_CALL)
   .then(response => response.data)
        .catch(err => err)

    var matchDataArray = [];
    var arro = [];
    var inf = [];
    for(var i = 0; i < gameIDs.length; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/"+ matchID+"?api_key="+API_KEY)
        .then(function(response){
            arro.push(response.data.info.participants.find(participant => participant.puuid==PUUID).championName)
            inf.push([response.data.info.participants.find(participant => participant.puuid==PUUID).championName,
                     response.data.info.participants.find(participant => participant.puuid==PUUID).win]);
        }).catch(err => err)
    }
    arro.sort();

    let elementos = [];
    let vecesrepetidas = [];
    let contador = 1;

    for(let i=0;i < arro.length;i++){
        if(arro[i+1] === arro[i]){
            contador++;
        }else{
            elementos.push([contador,arro[i]]);
            vecesrepetidas.push(contador);
            contador = 1 ;
        }
    }
    
    elementos = elementos.sort();
    elementos = elementos.reverse();
    console.log(elementos);
    var d1=0;var d2=0;var d3=0;
    var v1=0;var v2=0;var v3=0;
 
for(var x=0;x<inf.length;x++){
    if(elementos[0][1]===inf[x][0]){
        if(inf[x][1]===true){
            v1 = v1 + 1;
        }else{
            d1 = d1 + 1;
        }    
    }
    if(elementos[1][1]===inf[x][0]){
        if(inf[x][1]===true){ 
            v2 = v2 + 1;
        }else{
            d2 = d2 + 1;
        }    
    }
    if(elementos[2][1]===inf[x][0]){
        if(inf[x][1]===true){
            v3 = v3 + 1;
        }else{
            d3 = d3 + 1;
        }    
    }
}   

    const winr1 = (((v1/(v1+d1))*100).toFixed(1));
    const winr2 = (((v2/(v2+d2))*100).toFixed(1));
    const winr3 = (((v3/(v3+d3))*100).toFixed(1));
    console.log([elementos[0],elementos[1],elementos[2]]);
    console.log(elementos);
    res.send([[elementos[0],elementos[1],elementos[2]],
        [winr1,winr2,winr3]]);
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