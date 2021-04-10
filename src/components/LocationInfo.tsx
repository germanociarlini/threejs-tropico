import React from "react";
import { LocationContext } from "../contexts/LocationContext";

export class LocationInfo extends React.Component {
  public static contextType = LocationContext
  render() {
    return (
      <div className="info-container">
        <span>Current Location: {this.context.selectedLocation.name}</span>
      </div>
    )
  }
}