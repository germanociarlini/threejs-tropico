import React from "react";
import { LocationContext } from "../contexts/LocationContext";
import '../styles/LocationInfo.css';
import { Location } from '../types';

export class LocationInfo extends React.Component {
  public static contextType = LocationContext
  render() {
    const { id, name, fullName, bannerImageURL, summary, weatherType, costs, scores } = (this.context.state.selectedLocation as Location) || {}
    return (
      <div className={`info-container ${id ? 'show' : ''}`}>
        <div className="info-banner" style={{ backgroundImage: `url('${bannerImageURL}')` }}>
          <span className='location-name'>{name}</span>
          <span className='location-title'>{fullName}</span>
        </div>
        <div className="location-subtitle">
          <span>{weatherType}</span>
          <span>{scores?.cityScore.toFixed(2)}</span>
        </div>
        <div className="info-content">
          <span className='location-summary' dangerouslySetInnerHTML={{ __html: summary }}></span>
          <div className="location-overview">
            <span>Climate: {weatherType}</span>
            <span>Taxi cost: {costs?.taxi}</span>
            <span>A sample of what {name} has to offer:</span>
          </div>
        </div>
      </div>
    )
  }
}