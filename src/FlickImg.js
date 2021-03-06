import React, { Component } from 'react';


class FlickImg extends Component {

  //Renders the Flickr Photo with its information asociated
  render() {
    const photo = this.props.photo;
    const photoThumb = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_q.jpg';
    const photoUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';

    return (
      <li>
        <a href={photoUrl}>
          <img src={photoThumb} alt={photo.title}/>
        </a>
      </li>
    );
  }
}

export default FlickImg;
