import React from "react";
import LocationContextProvider from "../contexts/LocationContext";
import '../styles/Discover.css';
import { Globe } from "./Globe";
import { LocationInfo } from "./LocationInfo";

export class Discover extends React.Component {

  render() {
    return (
      <div className="destinations-container">
        <span className='title'>Discover</span>
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