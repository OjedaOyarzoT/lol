import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

function Campeones() {

    const Dato = () =>{
        const [loading, setLoading] = useState(0);
        const [infor, setInfor] = useState([]);
        const [pasiva, setPasiva] = useState([]);
        const {nCampeon} = useParams();
        const campeonId = {nCampeon}.nCampeon;
        console.log({nCampeon}.nCampeon);

        useEffect(() => {
            async function loadData() {
                setLoading(1);
    
            axios.get("http://localhost:4000/champ/"+campeonId)
            .then(function(response){
                console.log(response.data.passive.name);
                setInfor(response.data)
                setPasiva(response.data.passive)
            })
            .catch(function(error){
                console.log(error);
           });
             setLoading(0);
            }
            loadData();
        }, [])

        return (
            <div>
                <h1>{infor.name}: {infor.title}</h1>
                <img width="100" height="100" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${infor.id}.png`} alt="img"></img>
                <h3>Habilidades</h3>
                <p>Pasiva: {pasiva.name}</p>
                <h3>Historia</h3>
                <p>{infor.lore}</p>
                <h3></h3>
            </div>
        );

    }

    return (
        <div className='Contenido'>
            <Dato />
        </div>
    );
}
        export default Campeones;