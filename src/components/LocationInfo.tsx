import React from "react";
import { LocationContext } from "../contexts/LocationContext";
import { Location } from '../types'
import '../styles/LocationInfo.css'

export class LocationInfo extends React.Component {
  public static contextType = LocationContext
  render() {
    const { name, title, overview, climate, mainAttractions, budget } = this.context.selectedLocation as Location
    return (
      <div className="info-container">
        <div className="info-banner">
          <span className='location-name'>{name}</span>
          <span className='location-title'>{title}</span>
        </div>
        <div className="info-content">
          <span>{overview}</span>
          <br/>
          <span>Climate: {climate}</span>
          <span>Budget: {budget}</span>
          <span>A sample of what {name} has to offer:</span>
          {mainAttractions.map((attraction: string) => (
            <React.Fragment key={attraction}>
              <li>{attraction}</li>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }
}