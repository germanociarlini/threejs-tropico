import React, { createContext } from "react";
import { Location, LocationContextType } from '../types';

export const LocationContext = createContext({} as LocationContextType)

class LocationContextProvider extends React.Component {

  public blankLocation: Location = {
    id: 'slug:blank',
    name: '',
    fullName: '',
    summary: '',
    bannerImageURL: '/',
    weatherType: '',
    costs: {
      bread: 0,
      cappuccino: 0,
      cinema: 0,
      beer: 0,
      monthlyPublicTransport: 0,
      restaurantPrice: 0,
      taxi: 0,
    },
    scores: {
      travelConnectivity: 0,
      commute: 0,
      safety: 0,
      healthcare: 0,
      environmentalQuality: 0,
      internetAccess: 0,
      leisureAndCulture: 0,
      tolerance: 0,
    },
    mainAttractions: [],
    coordinates: {
      latitude: 0,
      longitude: 0
    }
  }
  public state = { ...this.blankLocation }

  public setSelectedLocation = (location: Location | null) => {
    if (location) {
      this.setState({ ...location })
    } else {
      this.setState({ id: -1 })
    }
  }

  public async fetchLocations() {

    const rootApiUrl = 'https://api.teleport.org/api'
    const locationsNameList = ['Rio de Janeiro', 'London', 'San Francisco', 'New York', 'Hong Kong', 'Tokyo', 'Sydney', 'Buenos Aires', 'Berlin', 'Miami']
    const citySearchPromises: Promise<any>[] = []
    const cityInfoPromises: Promise<any>[] = []

    locationsNameList.forEach((locationName: string) => {
      const searchCity = async (locationName: string) => {
        return await (await fetch(`${rootApiUrl}/cities/?search=${locationName}`)).json()
      }
      citySearchPromises.push(searchCity(locationName))
    })

    const searchResults = await Promise.all(citySearchPromises)
    const validSearchResults = searchResults.filter((searchResult: any) => searchResult._embedded["city:search-results"][0] !== undefined)
    const validCities = validSearchResults.map(searchResult => searchResult._embedded["city:search-results"][0])

    const fetchLocationData = async (city: any): Promise<any> => {
      const cityId = city._links["city:item"]
      const cityInfo = await (await fetch(cityId.href)).json()
      const urbanArea = await (await fetch(cityInfo._links["city:urban_area"].href)).json()
      const cityImagesResponse = await (await fetch(urbanArea._links["ua:images"].href)).json()
      const cityImages = cityImagesResponse.photos[0].image.web
      const location = {

      }
      return this.blankLocation
    }

    validCities.forEach((locationName: string) => {
      cityInfoPromises.push(fetchLocationData(locationName))
    })

    const locations = await Promise.all(cityInfoPromises)
    console.log(locations)
    return []
  }

  render() {
    return (
      <LocationContext.Provider value={{
        selectedLocation: { ...this.state },
        setSelectedLocation: this.setSelectedLocation,
        fetchLocations: this.fetchLocations
      }}>
        {this.props.children}
      </LocationContext.Provider>
    )
  }
}

export default LocationContextProvider