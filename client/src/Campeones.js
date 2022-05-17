import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

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
        console.log({nCampeon}.nCampeon);

        useEffect(() => {
    
            axios.get("http://localhost:4000/champ/"+campeonId)
            .then(function(response){
                console.log(response.data);
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
                <div class="row">
                    <div class="col-1">
                        <img width="100" height="100" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${infor.id}.png`} alt="img"></img>
                    </div>
                    <div class="col-6">
                        <h1>{infor.name}: {infor.title}</h1>
                    </div>
                </div>
                <h3>Historia</h3>
                <div class="row">
                    <div class="col-7">
                        <p>{infor.lore}</p>
                    </div>
                </div>
                <h3>Habilidades</h3>
                <div class="row">
                    <div class="col-1" align="center">
                        <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/passive/${pimg.full}`} alt ="img"></img>
                    </div>
                    <div class="col-6">
                        <p>Pasiva: {pasiva.name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1" align="center">
                        <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/spell/${qimg.full}`} alt ="img"></img>
                    </div>
                    <div class="col-6">
                        <p>Q: {qname.name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1" align="center">
                        <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/spell/${wimg.full}`} alt ="img"></img>
                    </div>
                    <div class="col-6">
                        <p>W: {wname.name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1" align="center">
                        <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/spell/${eimg.full}`} alt ="img"></img>
                    </div>
                    <div class="col-6">
                        <p>E: {ename.name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1" align="center">
                        <img width="30" height="30" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/spell/${rimg.full}`} alt ="img"></img>
                    </div>
                    <div class="col-6">
                        <p>R: {rname.name}</p>
                    </div>
                </div>
            </div>
        );

    }

    return (
        <div class='container' >
            <Dato />
        </div>
    );
}
        export default Campeones;