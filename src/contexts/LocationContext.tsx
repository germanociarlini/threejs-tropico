import React, {createContext} from "react";
import { Location, LocationContextType } from '../types';

export const LocationContext = createContext({} as LocationContextType)

class LocationContextProvider extends React.Component {

  public state: Location = {
    id: -1,
    name: '',
    title: '',
    overview: '',
    budget: 'low',
    mainAttractions: [],
    climate: '',
    coordinates: {
      latitude: 0,
      longitude: 0
    }
  }

  public setSelectedLocation = (location?: Location) => {
    if (location) {
      this.setState({...location})
    } else {
      this.setState({id: -1})
    }
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