import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

function Campeones() {

    const [info, setInfo] = useState([]);
    const {nCampeon} = useParams();
    const campeonId = {nCampeon}.nCampeon;

    useEffect(() => {
        axios.get("http://localhost:4000/champ/"+campeonId)
        .then(function(response){
            setInfo(response.data);
        })
        .catch(function(error){
            console.log(error);
       });
    }, [])

    return (
        <div className='Contenido'>
            <div>
                <h1>{info.name} {info.title}</h1>
                <img width="100" height="100" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${info.id}.png`} alt="img"></img>
            </div>
        </div>
    );
}
        export default Campeones;