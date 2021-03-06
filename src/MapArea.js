import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyMapComponent from './MyMapComponent';
import { Marker } from 'react-google-maps';

class MapArea extends Component {

  //If the user clicks on a marker, the page redirects to the page of that monument
  handleClick = (path, e) => {
    this.props.history.push(path)
  }

  //Renders a map with all the markers of the monuments
  render() {
    return (
      <div className="Map-area" aria-label="Main map with all the markers">
        <header className="App-header">
          <div className="Light-box">
            <Link className="List-view-link" to="/">
              <h1 className="App-title">Gaudi's Tour</h1>
            </Link>
            <Link className="List-view-link" to="/listview">
              <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              	<path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            	</svg>
            </Link>
          </div>
        </header>
      	<MyMapComponent role="Application"  
	        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
	        loadingElement={<div style={{ height: `100%` }} />}
	        containerElement={<div style={{ height: `86.5vh` }} />}
	        mapElement={<div style={{ height: `100%` }} />}
	        defaultZoom={12.7}
	        defaultCenter={{lat: 41.3968849, lng: 2.1587406}}>
					{this.props.markers.map(marker => (
						<Marker
							key={marker.id}
							position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}
              onClick={(e) => this.handleClick(`/listview/${marker.path}`, e)}
							/>
					))}
	      </MyMapComponent>
      </div>
    );
  }
}

export default MapArea;