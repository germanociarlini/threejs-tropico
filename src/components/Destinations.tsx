import React from "react";
import '../styles/Destinations.css';
import { Globe } from "./Globe";

export class Destinations extends React.Component {

  render() {
    return (
      <div className="destinations-container">
        <span className='title'>Destinations</span>
        <div className="destinations-content">
          <Globe />
          <div className="info-container">Info</div>
        </div>
      </div>
    )
  }
}