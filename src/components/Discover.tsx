import React from "react";
import { LocationContext } from "../contexts/LocationContext";
import '../styles/Discover.css';
import { Location } from "../types";
import { Globe } from "./Globe";
import { LocationInfo } from "./LocationInfo";

export class Discover extends React.Component {
  public static contextType = LocationContext
  render() {
    const { id } = (this.context.state.selectedLocation as Location) || {}
    return (
      <div className="destinations-container">
        <span className='title'>Discover</span>
        <div className={`destinations-content ${id ? 'show' : ''}`}>
          <Globe />
          <LocationInfo />
        </div>
      </div>
    )
  }
}