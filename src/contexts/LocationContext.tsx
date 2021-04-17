import React, { createContext } from "react";
import { Location, LocationContextType } from '../types';

export const LocationContext = createContext<LocationContextType | undefined>(undefined)

class LocationContextProvider extends React.Component {

  public state: Location = {
    id: 'slug:blank',
    name: '',
    fullName: '',
    summary: '',
    bannerImageURL: '',
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
    coordinates: {
      latitude: 0,
      longitude: 0
    }
  }

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
    const validCities = validSearchResults.map((searchResult: any) => searchResult._embedded["city:search-results"][0])

    const fetchLocationData = async (city: any): Promise<Location> => {
      const cityId = city._links["city:item"]
      const cityInfo = await (await fetch(cityId.href)).json()
      const urbanArea = await (await fetch(cityInfo._links["city:urban_area"].href)).json()
      const urbanAreaDetailsResult = await (await fetch(urbanArea._links["ua:details"].href)).json()
      const urbanAreaScoresResult = await (await fetch(urbanArea._links["ua:scores"].href)).json()
      const urbanAreaImages = await (await fetch(urbanArea._links["ua:images"].href)).json()

      const urbanAreaScores = urbanAreaScoresResult.categories.reduce((scores: any, { name, score_out_of_10 }: any) => {
        return (scores[name] = score_out_of_10, scores)
      }, {})

      const urbanAreaCosts = urbanAreaDetailsResult.categories.find((category: any) => category.id === 'COST-OF-LIVING').data.reduce((costs: any, { id, currency_dollar_value }: any) => {
        return (costs[id] = currency_dollar_value, costs)
      }, {})

      const urbanAreaClimate = urbanAreaDetailsResult.categories.find((category: any) => category.id === 'CLIMATE')

      const location: Location = {
        id: urbanArea.ua_id,
        name: cityInfo.name,
        fullName: cityInfo.full_name,
        summary: urbanAreaScoresResult.summary,
        bannerImageURL: urbanAreaImages.photos[0].image.web,
        weatherType: urbanAreaClimate.data.find((weatherData: any) => weatherData.id === 'WEATHER-TYPE').string_value,
        costs: {
          bread: urbanAreaCosts['COST-BREAD'],
          cappuccino: urbanAreaCosts['COST-CAPUCCINO'],
          cinema: urbanAreaCosts['COST-CINEMA'],
          beer: urbanAreaCosts['COST-IMPORT-BEER'],
          monthlyPublicTransport: urbanAreaCosts['COST-PUBLIC-TRANSPORT'],
          restaurantPrice: urbanAreaCosts['COST-RESTAURANT-MEAL'],
          taxi: urbanAreaCosts['COST-TAXI'],
        },
        scores: {
          travelConnectivity: urbanAreaScores['Travel Connectivity'],
          commute: urbanAreaScores['Commute'],
          safety: urbanAreaScores['Safety'],
          healthcare: urbanAreaScores['Healthcare'],
          environmentalQuality: urbanAreaScores['Environmental Quality'],
          internetAccess: urbanAreaScores['Internet Access'],
          leisureAndCulture: urbanAreaScores['Leisure & Culture'],
          tolerance: urbanAreaScores['Tolerance'],
        },
        coordinates: {
          latitude: cityInfo.location.latlon.latitude,
          longitude: cityInfo.location.latlon.longitude
        }
      }
      return location
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