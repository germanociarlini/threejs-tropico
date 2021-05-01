import React from "react";
import LocationContextProvider, { LocationContext } from "../contexts/LocationContext";
import '../styles/Discover.css';
import { Globe } from "./Globe";
import { LocationInfo } from "./LocationInfo";

export class Discover extends React.Component {
  public static contextType = LocationContext
  public static LocationsNameList =
    ['Paris',
      'Rome',
      'Lisbon',
      'Manila',
      'Rio de Janeiro',
      'London',
      'San Francisco',
      'New York',
      'Hong Kong',
      'Tokyo',
      'Sydney',
      'Buenos Aires',
      'Berlin',
      'Miami',
      'Cape Town',
      'Cairo',
      'Vancouver',
      'Mexico City',
      'Dubai',
      'La Paz',
      'Moscow',
      'Seoul']

  render() {
    return (
      <div className="destinations-container">
        <span className='title'>Discover</span>
        <LocationContextProvider
          rootApiUrl='https://api.teleport.org/api'
          locationsNameList={Discover.LocationsNameList}>
          <div className="destinations-content">
            <Globe />
            <LocationInfo />
          </div>
        </LocationContextProvider>
      </div>
    )
  }
}