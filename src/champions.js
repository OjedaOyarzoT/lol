var express = require('express');
var cors = require('cors');
const axios = require('axios');
const { response } = require('express');

var app = express();


app.use(cors());
app.listen(4000)

const API_KEY = "RGAPI-949fe819-d828-4226-af2b-779aa6f590e2";

const ChampionID = "Aatrox";

function getChampionData(ChampionID){
    return axios.get("http://ddragon.leagueoflegends.com/cdn/12.8.1/data/es_MX/champion/"+ ChampionID +".json")
    .then(response => {
        console.log(response.data.data)
        return response.data.data
    }).catch(err => err);
}

app.get("/champ", async(req,res)=>{
    var champ = await getChampionData(ChampionID);
    champ = champ[ChampionID];
    res.send(JSON.stringify(champ['spells'], null, "\t"))
})