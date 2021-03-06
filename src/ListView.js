import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyMapComponent from './MyMapComponent';
import { Marker } from 'react-google-maps';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class ListView extends Component {

  //Stores the query that the user writes
  state = {
    query: '',
  }

  //Updates the query
  updateQuery = (query) => {
    this.setState({ query: query })
  }

  //If the user clicks on a marker, the page redirects to the page of that monument
  handleClick = (path, e) => {
    this.props.history.push(path)
  }

  //Renders the view of the map with a navigation menu at the right side where the user
  //can choose to click on listed monument or search for a monument to be listed 
  render() {
    //If there is a query, only matched monuments are listed
    let showingMonuments
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingMonuments = this.props.markers.filter((monument) => match.test(monument.name))
    } else {
      showingMonuments = this.props.markers
    }

    //Before rendering the list of monuments, they are sorted by name
    showingMonuments.sort(sortBy('name'))

    return (
      <div className="List-view" aria-label="Map with all the markers and a list of these monuments">
        <div className="List-view-header-map">
          <header className="App-header">
            <div className="Light-box">
              <Link className="List-view-link" to="/" tabIndex="0">
                <h1 className="App-title">Gaudi's Tour</h1>
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
            {showingMonuments.map(marker => (
              <Marker
                key={marker.id}
                position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}
                onClick={(e) => this.handleClick(`/listview/${marker.path}`, e)}
                />
            ))}
          </MyMapComponent>
        </div>
        <aside className="List-view-search" aria-label="List of all the monuments marked in the map">
          <Link className="List-view-link-aside" to="/">
            <span role="img" aria-label="close">❌</span>
          </Link>
          <br/>
          <input type='text' placeholder='Search monuments' value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
              <ul className="Markers-list" aria-label="List of monuments marked in the map">
                {showingMonuments.map((marker, index) => (
                  <li key={marker.id}>
                    <Link className="List-view-link" to={`/listview/${marker.path}`}>
                      {marker.name}
                    </Link>
                  </li>
                ))}
              </ul>
        </aside>
      </div>
    );
  }
}

export default ListView;