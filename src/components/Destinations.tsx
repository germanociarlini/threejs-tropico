import React from "react";
import '../styles/Destinations.css';

export class Destinations extends React.Component {

  render() {
    return (
      <div className="destinations-container">
        <span className='title'>Destinations</span>
        <div className="destinations-content">
          <div className="globe-container">Globe</div>
          <div className="info-container">Info</div>
        </div>
      </div>
    )
  }
}