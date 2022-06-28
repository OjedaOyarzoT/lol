import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import Plot from "react-plotly.js";

function Campeones() {

    const Dato = () =>{
        const [infor, setInfor] = useState([]);
        const [pasiva, setPasiva] = useState([]);
        const [pimg, setPimg] = useState([]);
        const [qname, setQname] = useState([])
        const [qimg, setQimg] = useState([])
        const [wname, setWname] = useState([])
        const [wimg, setWimg] = useState([])
        const [ename, setEname] = useState([])
        const [eimg, setEimg] = useState([])
        const [rname, setRname] = useState([])
        const [rimg, setRimg] = useState([])
        const {nCampeon} = useParams();
        const campeonId = {nCampeon}.nCampeon;
        //console.log({nCampeon}.nCampeon);

        useEffect(() => {
    
            axios.get("http://localhost:4000/champ/"+campeonId)
            .then(function(response){
                console.log(response.data.info);
                setInfor(response.data)
                setPasiva(response.data.passive)
                setPimg(response.data.passive.image)
                setQname(response.data.spells[0]) //name
                setQimg(response.data.spells[0].image) //full
                setWname(response.data.spells[1]) //name
                setWimg(response.data.spells[1].image) //full
                setEname(response.data.spells[2]) //name
                setEimg(response.data.spells[2].image) //full
                setRname(response.data.spells[3]) //name
                setRimg(response.data.spells[3].image) //full
            })
            .catch(function(error){
                console.log(error);
           });
        }, [])

        return (
            <div>
            <div class="masthead" style={{backgroundImage: `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${infor.id}_0.jpg")`}}></div>
                <div class="camp">
                    <div class="row">
                        <div class="col-1">
                            <img width="100" height="100" src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/champion/${infor.id}.png`} alt="img"></img>
                        </div>
                        <div class="col-6">
                            <h1 class="text-white">{infor.name}: {infor.title}</h1>
                        </div>
                    </div>
                    <h3 class="text-white">Historia</h3>
                    <div class="row">
                        <div class="col-7">
                            <p class="text-white">{infor.lore}</p>
                        </div>
                    </div>
                    <h3 class="text-white">Habilidades</h3>
                    <div class="row">
                        <div class="col-1" align="center">
                            <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/passive/${pimg.full}`} alt ="img"></img>
                        </div>
                        <div class="col-6">
                            <p class="text-white">Pasiva: {pasiva.name}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1" align="center">
                            <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/spell/${qimg.full}`} alt ="img"></img>
                        </div>
                        <div class="col-6">
                            <p class="text-white">Q: {qname.name}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1" align="center">
                            <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/spell/${wimg.full}`} alt ="img"></img>
                        </div>
                        <div class="col-6">
                            <p class="text-white">W: {wname.name}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1" align="center">
                            <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/spell/${eimg.full}`} alt ="img"></img>
                        </div>
                        <div class="col-6">
                            <p class="text-white">E: {ename.name}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1" align="center">
                            <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/spell/${rimg.full}`} alt ="img"></img>
                        </div>
                        <div class="col-6">
                            <p class="text-white">R: {rname.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
    const Graf = () =>{
        
        const [stats, setStats] = useState([]);
        const [infor, setInfor] = useState([]);
        const [maxhp, setMaxhp] = useState([]);
        const [maxhpname, setMaxhpname] = useState([]);
        const [minhp, setMinhp] = useState([]);
        const [minhpname, setMinhpname] = useState([]);
        const [maxmana, setMaxmana] = useState([]);
        const [maxmananame, setMaxmananame] = useState([]);
        const {nCampeon} = useParams();
        const [minmana, setMinmana] = useState([]);
        const [minmananame, setMinmananame] = useState([]);
        const [maxdmg, setMaxdmg] = useState([]);
        const [maxdmgname, setMaxdmgname] = useState([]);
        const [mindmg, setMindmg] = useState([]);
        const [mindmgname, setMindmgname] = useState([]);
        const campeonId = {nCampeon}.nCampeon;

        useEffect(() => {
    
            axios.get("http://localhost:4000/champ/"+campeonId)
            .then(function(response){
                console.log(response.data.info);
                setInfor(response.data)
                setStats(response.data.info)
            })
            .catch(function(error){
                console.log(error);
           });
           axios.get("http://localhost:4000/stats")
            .then(function(response){
                setMaxhp(response.data[0])
                setMaxhpname(response.data[1])
                setMinhp(response.data[2])
                setMinhpname(response.data[3])
                setMaxmana(response.data[4])
                setMaxmananame(response.data[5])
                setMinmana(response.data[6])
                setMinmananame(response.data[7])
                setMaxdmg(response.data[8])
                setMaxdmgname(response.data[9])
                setMindmg(response.data[10])
                setMindmgname(response.data[11])
            })
            .catch(function(error){
                console.log(error);
           });
        }, [])

        return(
            <div clas="row">
                    <Plot
                        data={[
                            { type: "bar", 
                              x: ["ataque","defensa","magia","dificultad"], 
                              y: [stats.attack, stats.defense, stats.magic, stats.difficulty],
                              marker: { color: 'rgb(225,100,0)'}
                            },
                            ]}
                        layout={{ width: 400, height: 400, title: "Jugabilidad de " + infor.name}}
                    />
                <div class="col-8 float-end">
                    <h2 class="text-white">Comparación de stats de todos los campeónes</h2>
                    <h5 class="text-white">{maxhpname} tiene la mayor cantidad de vida base: {maxhp} y {minhpname} la menor cantidad: {minhp}</h5>
                    <h5 class="text-white">{maxmananame} tiene la mayor cantidad de mana base: {maxmana} y {minmananame} la menor cantidad: {minmana}</h5>
                    <h5 class="text-white">{maxdmgname} tiene la mayor cantidad de daño base: {maxdmg} y {mindmgname} la menor cantidad: {mindmg}</h5>
                </div>
            </div>   
        );

    }

    return (
    <div class="lul">
        <a href="../"><button>Volver</button></a>
        <div class="container">
            <Dato />
            <Graf />
        </div>
    </div>
    );
}
        export default Campeones;