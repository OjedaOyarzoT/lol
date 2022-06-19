const config = require('../config.js');
const API_KEY = config.API_KEY ;
const axios = require('axios');
const funciones = require("./funciones.js");
var cors = require('cors');
const { response } = require('express');
const jugadores = {}

jugadores.cienPartidas = async(req,res)=>{
    const summonerN = req.params.summonerName;
    const region = req.params.region;
    const PUUID = await funciones.getPlayerPUUID(summonerN,region);
    const sucontinente = funciones.getContinente(region);
    API_CALL = "https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids?start=0&count=20&api_key=" + API_KEY;
    const gameIDs = await axios.get(API_CALL)
    .then(response => response.data)
        .catch(err => err)

    API_CALL1 = "https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids?start=21&count=20&api_key=" + API_KEY;
    const gameIDs1 = await axios.get(API_CALL1)
    .then(response => response.data)
        .catch(err => err)

    var arro1 = []; var inf = []; var rol1 = []; var kdas = []; var kills = []; var kda3 = [];

    for(var i=0;i<gameIDs.length;i++){
        const matchID = gameIDs[i];
        var cienp = await axios.get("https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/"+ matchID +"?api_key="+API_KEY)
        .then(function(response){
            var campeon = response.data.info.participants.find(participant => participant.puuid==PUUID).championName; 
            var victoria = response.data.info.participants.find(participant => participant.puuid==PUUID).win;
            var kda = response.data.info.participants.find(participant => participant.puuid==PUUID).challenges.kda;
            var kill = response.data.info.participants.find(participant => participant.puuid==PUUID).kills;
            arro1.push(campeon)
            inf.push([campeon,
                    victoria]);
            rol1.push(response.data.info.participants.find(participant => participant.puuid==PUUID).teamPosition)
            kdas.push(kda);
            kills.push([campeon,kill]);
            kda3.push([campeon,kda]);
            }).catch(err => err)
         
    }

    for(var c=0;c<gameIDs1.length;c++){
        const matchID2 = gameIDs1[c];
        var cienp2 = await axios.get("https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/"+ matchID2 +"?api_key="+API_KEY)
        .then(function(response){
            var campeon = response.data.info.participants.find(participant => participant.puuid==PUUID).championName; 
            var victoria = response.data.info.participants.find(participant => participant.puuid==PUUID).win;
            var kda = response.data.info.participants.find(participant => participant.puuid==PUUID).challenges.kda;
            var kill = response.data.info.participants.find(participant => participant.puuid==PUUID).kills;
            arro1.push(campeon)
            inf.push([campeon,
                    victoria]);
            rol1.push(response.data.info.participants.find(participant => participant.puuid==PUUID).teamPosition)
            kdas.push(kda);
            kills.push([campeon,kill]);
            kda3.push([campeon,kda]);

            }).catch(err => err)
         
    }
   
    console.log(kdas1);
    const arro = arro1.sort();
    const rol = rol1.sort();
    let elementos = []; let roles = []; let grafkda = []; let grafkills = [];
    let contador = 1; let contadorRol = 1; let contaor = 0; let ct = 1; let contaor2 = [];
    let ke =kda3.sort();
    let kills1 = kills.sort();
    var kdas1 = [];
    var kills2 = [];
    for(m=0;m<ke.length;m++)
      {
            kdas1.push(ke[m][1]);
            kills2.push(kills1[m][1])
      }

    for(var i=0;i < kdas1.length;i++){
        if(arro[i+1] === arro[i]){
            ct++;
            contaor = contaor + kdas1[i];
            contaor2 = contaor2 + kills2[i];
        }else{
            var elnum = contaor/ct;
            var elnum2 = contaor2/ct;
            grafkda.push([elnum,arro[i]]);
            grafkills.push([elnum2,arro[i]]);
            contaor = kdas1[i+1];
            contaor2 = kills2[i+1];
            ct =1;
        }
    } 

    const kdagraf = grafkda.sort().reverse();
    const killsgraf = grafkills.sort().reverse();

    for(let i=0;i < arro.length;i++){
        if(arro[i+1] === arro[i]){
            contador++;
        }else{
            elementos.push([contador,arro[i]]);
            contador = 1 ;
        }
    }  

    let cont = []; let linea = [];

    for(let i=0;i < rol.length;i++){
        if(rol[i+1] === rol[i]){
            contadorRol++;
        }else{
            switch(rol[i]){
                case 'BOTTOM':
                    var p = "ADC";
                    break;
                case 'MIDDLE':
                    var p = "MID";
                    break;
                case 'TOP':
                    var p = "TOP";
                    break;
                case 'UTILITY':
                    var p = "SUPP";
                    break;
                case 'JUNGLE':
                    var p = "JUNGLA";
                    break;
                case '':
                    var p = "Modo de juego sin roles";
                    break;
            }
            linea.push(p);
            cont.push(contadorRol);
            contadorRol = 1 ;
        }
    }  
    
    var elementos1= elementos.sort(([a,s],[b,t]) => b-a);
    var d1=0;var d2=0;var d3=0;
    var v1=0;var v2=0;var v3=0;

for(var x=0;x<inf.length;x++){
    if(elementos1[0][1]===inf[x][0]){
        if(inf[x][1]===true){
            v1 = v1 + 1;
        }else{
            d1 = d1 + 1;
        }    
    }
    if(elementos1[1][1]===inf[x][0]){
        if(inf[x][1]===true){ 
            v2 = v2 + 1;
        }else{
            d2 = d2 + 1;
        }    
    }
    if(elementos1[2][1]===inf[x][0]){
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
    console.log(linea,cont);
    console.log([elementos1[0],elementos1[1],elementos1[2]], [winr1,winr2,winr3]);
    res.send([[elementos1[0],elementos1[1],elementos1[2]], [winr1,winr2,winr3]
   ,linea, cont,
   [kdagraf[0][1],kdagraf[1][1],kdagraf[2][1]],[kdagraf[0][0],kdagraf[1][0],kdagraf[2][0]],
   [killsgraf[0][1],killsgraf[1][1],killsgraf[2][1]],[killsgraf[0][0],killsgraf[1][0],killsgraf[2][0]]]);
};

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
        arr.push(response.data); 
        res.json(arr);
      }).catch(function(error){
        //   console.log(error);
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
          //console.log(response.data);
          response.data[0].winrate = ((response.data[0].wins/(response.data[0].wins+response.data[0].losses))*100).toFixed(1)
          res.json(response.data[0]);
        }).catch(function(error){
            // console.log(error);
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
        res.json("{}");
   });
 
 };


module.exports = jugadores;