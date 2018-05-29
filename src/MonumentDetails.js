import React, { Component } from 'react';

class MonumentDetails extends Component {

  findMonument(pathValue) {
    //let markerObj = this.props.markers.filter(marker => marker.path === pathValue)
    //console.log(markerObj[0]);
    console.log(pathValue);
  }

  render() {
    return (
      <div>
        {this.findMonument(this.props.match.params.id)}
      </div>
    );
  }
}

export default MonumentDetails;