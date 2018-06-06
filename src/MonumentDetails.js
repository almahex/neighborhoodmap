import React, { Component } from 'react';
import MyMapComponent from './MyMapComponent';
import { Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';
import Superagent from 'superagent';
import FlickImg from './FlickImg';
import specialMarker from './icons/mapMarker.png'


class MonumentDetails extends Component {

  //Stores the images from Flickr, the data from the Wikipedia and a boolean for showing
  //or hiding the navigation menu
  state = {
    markerImg: [],
    markerData: [],
    showNavBar: true,
  }

  //Handles the navigation menu whether the user wants to see the information about
  //the monument or just its location 
  handleClick() {
    this.setState(prevState => ({
      showNavBar: !prevState.showNavBar
    }));
  }

  //Handles the API query of Wikipedia by using fetch
  getWikipediaData() {
    var self = this;
    let searchText = this.props.marker.name;
    let url =`https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchText}&format=json&origin=*`
    fetch(url)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
      throw new Error( 'Network response was not ok: ' + res.statusText );
    }).then(function(data){
      self.setState({markerData: data});
    });
  }

  //Handles the API query of Flickr by using the Superagent component
  handleSearch() {
    let searchText = this.props.marker.name;
    let allImages = []
    var self = this;
    Superagent
      .get('https://api.flickr.com/services/rest')
      .query({
        method: 'flickr.photos.search',
        text: searchText,
        api_key: 'ecb1146edd349b08e951f8bd6b22703c',
        format: 'json',
        nojsoncallback: 1,
        privacy_filter: 1
      })
      .end(function(error, res){
        if (error) {
          console.log(error);
          self.setState({markerImg: []});
        } else if (res) {
          allImages = res.body.photos.photo.slice(24,34)
          self.setState({markerImg: allImages});
        }
      });
  }

  //After using array destructuring from the Wikipedia response
  //check if there is any other array inside of it and get the 
  //data from the first one
  checkArray(a) {
    if (a instanceof Array && a.length > 1) {
      return a[0]
    } else {
      return a
    }
  }

  //Hook used in order to retrive the data from Flickr and Wikipedia
  //before the page is rendered
  componentWillMount() {
    this.handleSearch()
    this.getWikipediaData()
  }

  //Renders the map with the monuments marker and a navigation menu at the right side
  //that displays Wikipedia information about that monument and some photos from Flickr
  render() {
    const marker = this.props.marker
    const [ , , preWikiIntro, preWikiLink ] = this.state.markerData
    const wikiIntro = this.checkArray(preWikiIntro)
    const wikiLink = this.checkArray(preWikiLink)

    return (
      <div className={!this.state.showNavBar ? "List-view Monument-map" : "List-view"}
           aria-label="Map of the monument with its corresponding marker">
        <div className="List-view-header-map">
          <header className="App-header">
            <div className="Light-box">
              <Link className="List-view-link" to="/" tabIndex="1">
                <h1 className="App-title">Gaudi's Tour</h1>
              </Link>
              {!this.state.showNavBar && (
                <a className="List-view-link" onClick={this.handleClick.bind(this)} tabIndex="2">
                  <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
                  </svg>
                </a>
              )}
            </div>
          </header>
          <MyMapComponent tabIndex="9999" role="Application"  
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `86.5vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultZoom={17}
            defaultCenter={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}>
            <Marker key={marker.id} position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}} icon={specialMarker}/>
          </MyMapComponent>
        </div>
        {this.state.showNavBar && (
          <aside className="List-view-search" aria-label="Information and some photos of the monument">
            <a className="List-view-link-aside" tabIndex="2" onClick={this.handleClick.bind(this)}>
              <span role="img" aria-label="close">❌</span>
            </a>
            <Link className="Search-monument" to="/listview" tabIndex="3">
            </Link>
            <div className="Monument-details">
              <div className="Wikipedia-data" aria-label="Monument's information from Wikipedia">
                <h3>{marker.name}</h3>
                <p>{wikiIntro}</p>
                <a href={wikiLink} tabIndex="4">Read more</a>
              </div>
              <div className="Monument-images" aria-label="Monument's photos from Flickr">
                {this.state.markerImg === [] && (
                  <p>Cannot load images.</p>
                )}
                {this.state.markerImg.length > 0 && (
                  <ul>
                    {this.state.markerImg.map((img, index) => (
                      <FlickImg photo={img} key={index}/>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>
    );
  }
}

export default MonumentDetails;
