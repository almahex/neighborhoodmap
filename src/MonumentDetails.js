import React, { Component } from 'react';
import MyMapComponent from './MyMapComponent';
import { Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';

class MonumentDetails extends Component {

  state = {
    markerImg: [],
    showNavBar: true,
  }

  handleClick() {
    this.setState(prevState => ({
      showNavBar: !prevState.showNavBar
    }));
  }

  getImages() {
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${this.props.marker.name} Barcelona`, {
        headers: {
            Authorization: 'Client-ID b20af5277329d66b5c02168c47eebd793ba62599ef311af507e8e3a4dd1a8ef4'
        }
    }).then(response => response.json())
    .then(this.addImage.bind(this))
    .catch(e => this.requestError(e, 'image'));
  }

  addImage (images) {
    let resultImg = []
    if (images && images.results && images.results[0]) {
      for (let i=0; i<4; i++){
        resultImg.push(images.results[i].urls.thumb)
      }
      this.setState((state) => ({
        markerImg: state.markerImg = resultImg
      }))
    }
  }

  requestError(e, part) {
    console.log(e);
    console.log("Oh no! There was an error making a request for this image.");
  }

  componentWillMount() {
    this.getImages()
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
            <Link className="Search-monument" to="/listview">
            </Link>
            <div className="Monument-details">
              <h3>{marker.name}</h3>
              <div className="Monument-images">
                <ul>
                  {this.state.markerImg.map((img, index) => (
                    <li key={index}>
                      <img src={img} alt={marker.name}/>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        )}
      </div>
    );
  }
}

export default MonumentDetails;