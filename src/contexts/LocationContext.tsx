import React, {createContext} from "react";
import { Location, LocationContextType } from '../types';

export const LocationContext = createContext({} as LocationContextType)

class LocationContextProvider extends React.Component {

  public state: Location = {
    id: -1,
    name: '',
    title: '',
    overview: '',
    "average-cost": 'low',
    "main-attractions": [],
    climate: '',
    coordinates: {
      latitude: 0,
      longitude: 0
    }
  }

  public setSelectedLocation = (location: Location) => {
    this.setState({...location})
  }

  render() {
    return (
      <LocationContext.Provider value={{selectedLocation: {...this.state}, setSelectedLocation: this.setSelectedLocation}}>
        {this.props.children}
      </LocationContext.Provider>
    )
  }
}

export default LocationContextProvider