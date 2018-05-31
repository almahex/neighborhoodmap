import React, { Component } from 'react';
import MyMapComponent from './MyMapComponent';
import { Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';
import Superagent from 'superagent';
import FlickImg from './FlickImg';


class MonumentDetails extends Component {

  state = {
    markerImg: [],
    markerData: [],
    showNavBar: true,
  }

  handleClick() {
    this.setState(prevState => ({
      showNavBar: !prevState.showNavBar
    }));
  }

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

  getFlickrPhotoUrl(image) {
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
  }

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
        allImages = res.body.photos.photo.slice(24,34)
        self.setState({markerImg: allImages});
      });
  }

  checkArray(a) {
    if (a instanceof Array && a.length > 1) {
      return a[0]
    } else {
      return a
    }
  }

  componentWillMount() {
    this.handleSearch()
    this.getWikipediaData()
  }

  render() {
    const marker = this.props.marker
    const [ , preWikiTitle, preWikiIntro, preWikiLink ] = this.state.markerData
    const wikiTitle = this.checkArray(preWikiTitle)
    const wikiIntro = this.checkArray(preWikiIntro)
    const wikiLink = this.checkArray(preWikiLink)

    return (
      <div className="List-view">
        <div className="List-view-header-map">
          <header className="App-header">
            <Link className="List-view-link" to="/">
              <h1 className="App-title">Gaudi's Tour</h1>
            </Link>
            {!this.state.showNavBar && (
              <a className="List-view-link" onClick={this.handleClick.bind(this)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
                </svg>
              </a>
            )}
          </header>
          <MyMapComponent   
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultZoom={17}
            defaultCenter={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}>
            <Marker key={marker.id} position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}/>
          </MyMapComponent>
        </div>
        {this.state.showNavBar && (
          <aside className="List-view-search">
            <a className="List-view-link-aside" onClick={this.handleClick.bind(this)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
              </svg>
            </a>
            <Link className="Search-monument" to="/listview">
            </Link>
            <div className="Monument-details">
              <div className="Wikipedia-data">
                <h3>{wikiTitle}</h3>
                <p>{wikiIntro}</p>
                <a href={wikiLink}>Read more</a>
              </div>
              <div className="Monument-images">
                <ul>
                  {this.state.markerImg.map((img, index) => (
                    <FlickImg photo={img} key={index}/>
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
