import React from "react";
import { LocationContext } from "../contexts/LocationContext";
import { Location } from '../types'
import '../styles/LocationInfo.css'

export class LocationInfo extends React.Component {
  public static contextType = LocationContext
  render() {
    const { id, name, fullName, summary, weatherType, costs, scores } = this.context.selectedLocation as Location
    return (
      <div className={`info-container ${id !== 'slug:blank' ? 'show' : ''}`}>
        <div className="info-banner">
          <span className='location-name'>{name}</span>
          <span className='location-title'>{fullName}</span>
        </div>
        <div className="info-content">
          <span>{summary}</span>
          <br/>
          <span>Climate: {weatherType}</span>
          <span>Taxi cost: {costs.taxi}</span>
          <span>A sample of what {name} has to offer:</span>
        </div>
      </div>
    )
  }
}