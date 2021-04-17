import React, { createContext } from "react";
import { Location, LocationContextType } from '../types';

export const LocationContext = createContext<LocationContextType | undefined>(undefined)

class LocationContextProvider extends React.Component<{}, { selectedLocation: Location | null, locations: Location[] }> {

  public componentDidMount() {
    this.setState({
      selectedLocation: null,
      locations: []
    })
  }

  public setSelectedLocation = (location: Location | null) => {
    this.setState({ ...this.state, selectedLocation: location })
  }

  public fetchLocations = async () => {
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
    this.setState({...this.state, locations: locations})
  }

  render() {
    return (
      <LocationContext.Provider value={{
        state: {...this.state},
        setSelectedLocation: this.setSelectedLocation,
        fetchLocations: this.fetchLocations
      }}>
        {this.props.children}
      </LocationContext.Provider>
    )
  }
}

export default LocationContextProvider