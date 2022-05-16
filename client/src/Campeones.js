import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

function Campeones() {

    const [loading, setLoading] = useState(0);
    const [infor, setInfor] = useState([]);
    const {nCampeon} = useParams();
    const campeonId = {nCampeon}.nCampeon;
    console.log({nCampeon}.nCampeon);

    useEffect(() => {
        async function loadData() {
            setLoading(1);

        axios.get("http://localhost:4000/champ/"+campeonId)
        .then(function(response){
            console.log(response.data);
            setInfor(response.data);
            console.log(infor);
        })
        .catch(function(error){
            console.log(error);
       });
         setLoading(0);
        }
        loadData();
    }, [])

    return (
        <div className='Contenido'>
            <div>
                <h1>{infor.name} {infor.title}</h1>
                <img width="100" height="100" src={`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${infor.id}.png`} alt="img"></img>
            </div>
        </div>
    );
}
        export default Campeones;