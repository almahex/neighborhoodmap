import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import MapArea from './MapArea';
import ListView from './ListView';
import MonumentDetails from './MonumentDetails';
import NoMatch from './NoMatch';

class App extends Component {

  state = {
    markers: [
      {
        path: 'la-sagrada-familia',
        name: 'La Sagrada Familia',
        id: '00001',
        lat: 41.4051156,
        lng: 2.1696112
      },
      {
        path: 'park-guell',
        name: 'Park Güell',
        id: '00002',
        lat: 41.4144988,
        lng: 2.1505005
      },
      {
        path: 'casa-batllo',
        name: 'Casa Batlló',
        id: '00003',
        lat: 41.3916088,
        lng: 2.1625483
      },
      {
        path: 'la-pedrera',
        name: 'La Pedrera',
        id: '00004',
        lat: 41.394684,
        lng: 2.159456
      },
      {
        path: 'casa-vicenç',
        name: 'Casa Vicenç',
        id: '00005',
        lat: 41.4035018,
        lng: 2.1484515
      }
    ]
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <MapArea markers={this.state.markers}/>)}/>
          <Route exact path="/listview" render={() => (
            <ListView markers={this.state.markers}/>)}/>
          <Route path="/listview/:id" component={MonumentDetails} markers={this.state.markers}/>
          <Route component={NoMatch}/>
        </Switch>
        <footer className="App-footer">
          <p>© Copyright 2018 by Sara Garci. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;
