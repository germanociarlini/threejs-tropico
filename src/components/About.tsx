import React from "react";
import '../styles/flickity.css';
import '../styles/About.css';
import Flickity from 'react-flickity-component';

export class About extends React.Component {

  render() {
    const flickityOptions = {
      initialIndex: 0,
      wrapAround: true,
      draggable: false,
      setGallerySize: false
    }

    

    return (
      <div className="about-container">
        <span className="title">About Tropico</span>
        <Flickity options={flickityOptions} className={"carousel"}>
            <div className="carousel-cell">About Background</div>
            <div className="carousel-cell">About Globe</div>
            <div className="carousel-cell">About TeleportAPI</div>
            <div className="carousel-cell">About Flickity</div>
            <div className="carousel-cell">About Contact</div>
          </Flickity>
      </div>
    )
  }
}