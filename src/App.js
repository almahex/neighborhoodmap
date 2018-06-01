import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import MapArea from './MapArea';
import ListView from './ListView';
import MonumentDetails from './MonumentDetails';
import NoMatch from './NoMatch';

class App extends Component {

  //Information about the monuments that the app shows
  state = {
    markers: [
      {
        path: 'la-sagrada-familia',
        name: 'La Sagrada Familia',
        id: '00001',
        lat: 41.403941,
        lng: 2.174353
      },
      {
        path: 'park-guell',
        name: 'Park Güell',
        id: '00002',
        lat: 41.414746,
        lng: 2.15288
      },
      {
        path: 'casa-batllo',
        name: 'Casa Batlló',
        id: '00003',
        lat: 41.391609,
        lng: 2.162548
      },
      {
        path: 'la-pedrera',
        name: 'La Pedrera',
        id: '00004',
        lat: 41.395103,
        lng: 2.161596
      },
      {
        path: 'casa-vicens',
        name: 'Casa Vicens',
        id: '00005',
        lat: 41.403445,
        lng: 2.150629
      }
    ]
  }

  //Rendering of all the pages based on routes
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={({history}) => (
            <MapArea markers={this.state.markers} history={history}/>)}/>
          <Route exact path="/listview" render={({history}) => (
            <ListView markers={this.state.markers} history={history}/>)}/>
          {this.state.markers.map(marker => (
            <Route path={"/listview/"+marker.path} key={marker.id} render={({history}) => (
              <MonumentDetails marker={marker} history={history}/>)}/>
          ))}
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
