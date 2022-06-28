const axios = require('axios');
const config = require('../config.js');
const API_KEY = config.API_KEY ;

function getPlayerPUUID(playername,reg) {
    return axios.get("https://"+reg+".api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/"+ playername+"?api_key=" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
}
exports.getPlayerPUUID = getPlayerPUUID;

function getContinente(region){
    if(region=="br1"||region=="la1"||region=="la2"||region=="na1")
       return "americas";
    else
       return "europe";
}
exports.getContinente = getContinente;

function getPlayerID(playername,reg){
    return axios.get("https://"+reg+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+playername+"?api_key="+API_KEY)
    .then(response => {
        return response.data.id
    }).catch(err => err);
}
exports.getPlayerID = getPlayerID;

function getChampionData(ChampionID){
    return axios.get("http://ddragon.leagueoflegends.com/cdn/12.12.1/data/es_MX/champion/"+ ChampionID +".json")
    .then(response => {
        return response.data
    }).catch(err => err);
}
exports.getChampionData = getChampionData;

function getAllChampionData(){
    return axios.get("http://ddragon.leagueoflegends.com/cdn/12.12.1/data/en_US/champion.json")
    .then(response => {
        return response.data
    }).catch(err => err);
}
exports.getAllChampionData = getAllChampionData;

function getCofre(Server,NameId,ChampionKey){
    return axios.get("https://"+Server+".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+NameId+"/by-champion/"+ChampionKey+"?api_key="+API_KEY)
    .then(response => {
        return response.data
    })
}
exports.getCofre = getCofre;


