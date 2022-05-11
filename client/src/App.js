import {useState} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PagPrincipal from './PagPrincipal';
import Jugadores from './Jugadores';

function App() {

    
  return (
    <Router>
    <div className="App">
      <div className="contenido">
        <Switch>
         <Route path={'/'} component={PagPrincipal} />
         <Route path={'/Jugadores'} component={Jugadores}/>
        </Switch>
      </div>   
      </div>
      </Router>
  );
}
export default App;



