const config = require('../config.js');
const API_KEY = config.API_KEY ;
const axios = require('axios');
const funciones = require("./funciones.js");
var cors = require('cors');
const { response } = require('express');
const cien = {}

cien.cienPartidas = async(req,res)=>{
    const summonerN = req.params.summonerName;
    const region = req.params.region;
    const PUUID = await funciones.getPlayerPUUID(summonerN,region);
    const sucontinente = funciones.getContinente(region);
    API_CALL = "https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids?start=0&count=100api_key=" + API_KEY;
    const gameIDs = await axios.get(API_CALL)
   .then(response => response.data)
        .catch(err => err)

    var arro1 = []; var inf = []; var rol1 = [];

    for(var i=0;i<gameIDs.length;i++){
        const matchID = gameIDs[i];
        var cienp = await axios.get("https://"+sucontinente+".api.riotgames.com" + "/lol/match/v5/matches/"+ matchID +"?api_key="+API_KEY)
        .then(function(response){
            var campeon = response.data.info.participants.find(participant => participant.puuid==PUUID).championName; 
            var victoria = response.data.info.participants.find(participant => participant.puuid==PUUID).win;
            arro1.push(campeon)
            inf.push([campeon,
                    victoria]);
            rol1.push(response.data.info.participants.find(participant => participant.puuid==PUUID).teamPosition)

            }).catch(err => err)
         
    }
   
    console.log(arro1.length,"uno");
    const arro = arro1.sort();
    const rol = rol1.sort();
    console.log(rol);
    let elementos = [];
    let contador = 1;

    for(let i=0;i < arro.length;i++){
        if(arro[i+1] === arro[i]){
            contador++;
        }else{
            elementos.push([contador,arro[i]]);
            contador = 1 ;
        }
    }
    
    var elementos1= elementos.sort(([a,s],[b,t]) => b-a);
   // console.log(elementos1);
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
    res.send([[elementos[0],elementos[1],elementos[2]],
        [winr1,winr2,winr3]],
        [],
        []);
};

module.exports = cien;