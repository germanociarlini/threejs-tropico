import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LocationContext } from "../contexts/LocationContext";
import '../styles/LocationInfo.css';
import { Location, ScoreCategory } from '../types';
import LocationInfoDashboard from "./LocationInfoDashboard";

export class LocationInfo extends React.Component {
  public static contextType = LocationContext

  public closeLocationInfoCard = () => {
    this.context.setSelectedLocation(null)
  }

  public renderLocationInfoCard = (selectedLocation: Location) => {
    if (selectedLocation.id) {
      const { cityName, regionName, bannerImageURL, summary, weatherType, costs, cityScore, categoryScores } = selectedLocation
      const sortedScores = categoryScores.sort((a: ScoreCategory, b: ScoreCategory) => { return b.score_out_of_10 - a.score_out_of_10 })

      return (
        <div className="grid-container">
          <div className="banner" style={{ backgroundImage: `url('${bannerImageURL}')` }}>
            <div className='banner-text scrim'>
              <span className='banner-title'>{cityName}</span>
              <span className='banner-subtitle'>{regionName}</span>
            </div>
          </div>
          <div className="general-info">
            <span>{weatherType}</span>
            <span>{sortedScores[1].name || ''} - {sortedScores[2].name || ''} - {sortedScores[3].name || ''}</span>
          </div>
          <div className="city-score-container scrim" style={{ backgroundColor: `${cityScore < 50 ? 'var(--tropican-sunset)' : 'var(--tropican-lime)'}` }}>
            <span className="city-score-label">City Score</span>
            <span className="city-score-value">{cityScore.toFixed(0)}</span>
          </div>
          <div className="summary-container">
            <span className="summary" dangerouslySetInnerHTML={{ __html: summary }} />
          </div>
          <div className="dashboard-container">
            <LocationInfoDashboard scores={sortedScores} costs={costs} />
          </div>
          <FontAwesomeIcon icon={faChevronRight} onClick={this.closeLocationInfoCard} className={'close-button'} />
        </div>
      )
    } else {
      return (
        <></>
      )
    }
  }

  render() {
    const selectedLocation = this.context.state.selectedLocation as Location || {}
    return (
      <div className="location-card" style={{ width: `${selectedLocation.id ? '100%' : '0%'}` }}>
        <div className="card-scroll-container">
          {this.renderLocationInfoCard(selectedLocation)}
        </div>
      </div>
    )
  }
}