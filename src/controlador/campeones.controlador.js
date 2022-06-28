const config = require('../config.js');
const API_KEY = config.API_KEY ;
const axios = require('axios');
const funciones = require("./funciones.js");
var cors = require('cors');
const campeones = {}

campeones.champ = async(req,res)=>{
    const championName = req.params.championName;
    var champ = await funciones.getChampionData(championName);
    var champ1 = champ.data;
    res.json(champ1[championName]);
};
campeones.allchamp = async(req,res)=>{
    const todo = await axios.get("http://ddragon.leagueoflegends.com/cdn/12.12.1/data/en_US/champion.json")
    .then(response => response.data)
    .catch(err => err)
    
    var maxhealth = 0;
    var maxhpname = "";
    var minhealth = 1000;
    var minhpname = "";
    var maxmana = 0;
    var maxmananame = "";
    var minmana = 2000;
    var minmananame = "";
    var maxdmg = 0;
    var maxdmgname = "";
    var mindmg = 100;
    var mindmgname = "";

    for(i in todo.data){
        if(todo.data[i].stats.hp>maxhealth){
            maxhealth = todo.data[i].stats.hp;
            maxhpname = todo.data[i].name;
        }
    }
    for(i in todo.data){
        if(todo.data[i].stats.hp<minhealth){
            minhealth = todo.data[i].stats.hp;
            minhpname = todo.data[i].name;
        }
    }
    for(i in todo.data){
        if(todo.data[i].partype == "Mana"){
            if(todo.data[i].stats.mp>maxmana){
                maxmana = todo.data[i].stats.mp;
                maxmananame = todo.data[i].name;
            }
        }
    }
    for(i in todo.data){
        if(todo.data[i].partype == "Mana"){
            if(todo.data[i].stats.mp<minmana){
                minmana = todo.data[i].stats.mp;
                minmananame = todo.data[i].name;
            }
        }
    }
    for(i in todo.data){
        if(todo.data[i].stats.attackdamage>maxdmg){
            maxdmg = todo.data[i].stats.attackdamage;
            maxdmgname = todo.data[i].name;
        }
    }
    for(i in todo.data){
        if(todo.data[i].stats.attackdamage<mindmg){
            mindmg = todo.data[i].stats.attackdamage;
            mindmgname = todo.data[i].name;
        }
    }
    var arr = [maxhealth, maxhpname, minhealth, minhpname, maxmana, maxmananame, minmana, minmananame, maxdmg, maxdmgname, mindmg, mindmgname];
    res.json(arr);
}


module.exports = campeones;