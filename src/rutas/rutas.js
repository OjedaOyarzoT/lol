const express = require('express');
const jugadores = require('../controlador/jugadores.controlador.js');
const campeones = require('../controlador/campeones.controlador.js');
const cofres = require('../controlador/cofres.controlador.js');
const cien = require('../controlador/cien.controlador.js');
const router = express.Router()

router.get("/match/:summonerName/:region",jugadores.match);
router.get("/partida/:summonerName/:region",jugadores.partidaActual);
router.get("/rank/:summonerName/:region", jugadores.rank);
router.get("/campeonkey/", jugadores.campeonKey);
router.get("/mastery/:summonerName/:region", jugadores.mastery);

router.get("/cienPartidas/:summonerName/:region",cien.cienPartidas);

router.get("/champ/:championName", campeones.champ);

router.get("/id/:invid/:regio", cofres.id);
router.get("/cofre/:ser/:idinv/:champkey", cofres.cofre);

module.exports = router;