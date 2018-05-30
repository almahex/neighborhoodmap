import React, { Component } from 'react';
import MyMapComponent from './MyMapComponent';
import { Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';

class MonumentDetails extends Component {

  state = {
    query: '',
    showNavBar: true,
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  handleClick() {
    this.setState(prevState => ({
      showNavBar: !prevState.showNavBar
    }));
  }

  render() {
    const marker = this.props.marker

    return (
      <div className="List-view">
        <div className="List-view-header-map">
          <header className="App-header">
            <Link className="List-view-link" to="/">
              <h1 className="App-title">Gaudi's Tour</h1>
            </Link>
            <a className="List-view-link" onClick={this.handleClick.bind(this)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
              </svg>
            </a>
          </header>
          <MyMapComponent   
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `500px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultZoom={17}
            defaultCenter={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}>
            <Marker key={marker.id} position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}/>
          </MyMapComponent>
        </div>
        {this.state.showNavBar && (
          <aside className="List-view-search">
            <input type='text' placeholder='Search by monument' value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}/>
            <div className="Monument-details">
              <h3>{marker.name}</h3>
            </div>
          </aside>
        )}
      </div>
    );
  }
}

export default MonumentDetails;