const config = require('../config.js');
const API_KEY = config.API_KEY ;
const axios = require('axios');
const funciones = require("./funciones.js");
var cors = require('cors');
const campeones = {}

campeones.champ = async(req,res)=>{
    const championName = req.params.championName;
    var champ = await funciones.getChampionData(championName);
    var champ1 = champ.data
    console.log(champ1)
    res.json(champ1[championName]);
};


module.exports = campeones;