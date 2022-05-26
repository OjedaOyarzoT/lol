const config = require('../config.js');
const API_KEY = config.API_KEY ;
const axios = require('axios');
const funciones = require("./funciones.js");
var cors = require('cors');
const cofres = {}


cofres.id = async(req,res)=>{
    const invid = req.params.invid;
    const regio = req.params.regio;
    var myId = await getPlayerID(invid,regio);
    res.send(myId)
};

cofres.cofre = async(req,res)=>{
    const ser = req.params.ser;
    const idinv = req.params.idinv;
    const champkey = req.params.champkey;
    var myCofre = await getCofre(ser,idinv,champkey)
    res.send(myCofre)
};

module.exports = cofres;