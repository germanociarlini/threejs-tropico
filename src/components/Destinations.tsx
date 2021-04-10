import React from "react";
import LocationContextProvider from "../contexts/LocationContext";
import '../styles/Destinations.css';
import { Globe } from "./Globe";
import { LocationInfo } from "./LocationInfo";

export class Destinations extends React.Component {

  render() {
    return (
      <div className="destinations-container">
        <span className='title'>Destinations</span>
        <div className="destinations-content">
          <LocationContextProvider>
            <Globe />
            <LocationInfo />
          </LocationContextProvider>
        </div>
      </div>
    )
  }
}