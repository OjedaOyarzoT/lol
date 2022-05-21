import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

function Cofres() {

    const {inv} = useParams();
    const {region} = useParams();
    const {search} = useParams();
    const NombreInv = {inv}.inv;
    const SubRegion = {region}.region;
    const NombreCamp = {search}.search;

    const Cofresito = () =>{

        const [disp, setDisp] = useState("");
        const [yid, setYid] = useState("");
        const [cid, setCid] = useState("");

        useEffect(() => {
            axios.get("http://localhost:4000/id/"+NombreInv+"/"+SubRegion)
            .then(function(response){
                setYid(response.data)
            });
            
            axios.get("http://localhost:4000/champ/"+NombreCamp)
            .then(function(response2){
                setCid(response2.data.key)
            });
                
            axios.get("http://localhost:4000/cofre/"+SubRegion+"/"+yid+"/"+cid)
            .then(function(response3){
                console.log(response3.data)
                if (response3.data.chestGranted == true){
                    setDisp("Cofre No Disponible...")
                } else {
                    setDisp("Cofre Disponible!!")
                }
            });
            
        })

        return (
                <h1>{disp}</h1>
        );


    }
    

    return(
        <div class="container">
            <Cofresito />
        </div>
    );
}   
        export default Cofres;