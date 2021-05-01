import { faCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LocationContext } from "../contexts/LocationContext";
import '../styles/LocationInfo.css';
import { Location } from '../types';

export class LocationInfo extends React.Component {
  public static contextType = LocationContext
  render() {
    let sortedScores: string[] = []
    const { cityName, regionName, bannerImageURL, summary, weatherType, costs, scores } = (this.context.state.selectedLocation as Location) || {}

    if (scores !== undefined) {
      sortedScores = Object.keys(scores).sort((a: string, b: string) => { return scores[b] - scores[a] })
    }

    return (
      <div className="grid-container">
        <div className="banner" style={{ backgroundImage: `url('${bannerImageURL}')` }}>
          <div className="text-scrim">
            <span className='banner-title'>{cityName}</span>
            <span className='banner-subtitle'>{regionName}</span>
          </div>
        </div>
        <div className="general-info">
          <span className='weather-span'>{weatherType}</span>
          <span className='weather-span'>{sortedScores[1] || ''} - {sortedScores[2] || ''} - {sortedScores[3] || ''}</span>
        </div>
        <div className="general-score"></div>
        <div className="info-container">
          <span className="summary" dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
      </div>
    )
  }
  /*return (
    <div className={`info-container`}>
      <div className="info-banner" style={{ backgroundImage: `url('${bannerImageURL}')` }}>
        <span className='location-name'>{cityName}</span>
        <span className='location-title'>{regionName}</span>
      </div>
      <div className="location-subtitle">
        <span>{weatherType}</span>
        <FontAwesomeIcon icon={faCity} />
        <span>{scores?.cityScore.toFixed(2)}</span>
      </div>
      <div className="info-content">
        <span className='location-summary' dangerouslySetInnerHTML={{ __html: summary }}></span>
        <div className="location-overview">
          <span>Climate: {weatherType}</span>
          <span>Taxi cost: {costs?.taxi}</span>
          <span>A sample of what {cityName} has to offer:</span>
        </div>
      </div>
    </div>
  )
}*/
}