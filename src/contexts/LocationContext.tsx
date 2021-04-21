import React, { createContext } from "react";
import { Category, CityInfo, CitySearchResult, CitySearchResultElement, Datum, Location, LocationContextType, UrbanArea, UrbanAreaDetails, UrbanAreaImages, UrbanAreaScores } from '../types';

export const LocationContext = createContext<LocationContextType | undefined>(undefined)

interface LocationContextProps {
  rootApiUrl: string,
  locationsNameList: string[],
}

interface LocationContextState {
  selectedLocation: Location | null,
  locations: Location[]
}

type UrbanAreaData = {
  cityInfo: CityInfo,
  urbanArea: UrbanArea,
  urbanAreaDetails: UrbanAreaDetails,
  urbanAreaScores: UrbanAreaScores,
  urbanAreaImages: UrbanAreaImages
}

class LocationContextProvider extends React.Component<LocationContextProps, LocationContextState> {

  public componentDidMount() {
    this.setState({
      selectedLocation: null,
      locations: []
    })
  }

  public setSelectedLocation = (location: Location | null) => {
    this.setState({ ...this.state, selectedLocation: location })
  }

  /**
   * Fetches all locations according to the specified prop values and updates this component's state
   */
  public fetchLocations = async () => {
    const citySearchResults = await this.searchCitiesByName(this.props.locationsNameList)
    const urbanAreaFetchPromises: Promise<UrbanAreaData>[] = []

    citySearchResults.forEach((searchResult: CitySearchResultElement) => {
      urbanAreaFetchPromises.push(this.fetchUrbanAreaDataForCity(searchResult))
    })

    const urbanAreasData = await Promise.all(urbanAreaFetchPromises)

    const locations = this.buildLocationWithUrbanAreaData(urbanAreasData)
    this.setState({ ...this.state, locations: locations })
  }

  /**
   * Searches the city by name and maps the response to the most relevant search results.
   * @param locationNames An array of city names to be searched.
   * @returns An array of CitySearchResultElements.
   */
  private searchCitiesByName = async (cityNames: string[]) => {
    const citySearchPromises: Promise<CitySearchResult>[] = []

    cityNames.forEach((locationName: string) => {
      const searchCity = async (locationName: string) => {
        return await (await fetch(`${this.props.rootApiUrl}/cities/?search=${locationName}`)).json()
      }
      citySearchPromises.push(searchCity(locationName))
    })

    const searchResults = await Promise.all(citySearchPromises)
    const cityRefs = searchResults.map((searchResult: CitySearchResult) => searchResult._embedded["city:search-results"][0])
    return cityRefs
  }

  /**
   * Fetches all relevant city info and urban area data according to the cityRef passed as parameter.
   * @param cityRef City search result element containing all of it's relevant data hrefs.
   * @returns An UrbanAreaData object with cityInfo, urbanArea, urbanAreaDetails, urbanAreaScores and urbanAreaImages.
   */
  private fetchUrbanAreaDataForCity = async (cityRef: CitySearchResultElement) => {
    const cityInfo = await (await fetch(cityRef._links["city:item"].href)).json() as CityInfo
    const urbanArea = await (await fetch(cityInfo._links["city:urban_area"].href)).json() as UrbanArea
    const urbanAreaDetails = await (await fetch(urbanArea._links["ua:details"].href)).json() as UrbanAreaDetails
    const urbanAreaScores = await (await fetch(urbanArea._links["ua:scores"].href)).json() as UrbanAreaScores
    const urbanAreaImages = await (await fetch(urbanArea._links["ua:images"].href)).json() as UrbanAreaImages

    return {
      cityInfo: cityInfo,
      urbanArea: urbanArea,
      urbanAreaDetails: urbanAreaDetails,
      urbanAreaScores: urbanAreaScores,
      urbanAreaImages: urbanAreaImages
    }
  }

  /**
   * Builds consumer-ready Location objects according to all relevant data passed as parameter.
   * @param urbanAreasData Array of objects containing all relevant city and urban area data for the location.
   * @returns An array of consumer-ready Locations.
   */
  private buildLocationWithUrbanAreaData(urbanAreasData: UrbanAreaData[]) {

    const locations: Location[] = []

    urbanAreasData.forEach((urbanAreaData: UrbanAreaData) => {
      const { cityInfo, urbanArea, urbanAreaDetails, urbanAreaScores, urbanAreaImages } = urbanAreaData

      const [cityName, regionName, countryName] = cityInfo.full_name.split(/,/)

      const simplifiedScores = urbanAreaScores.categories.reduce<{[name: string]: number}>((scores, category) => {
        scores[category.name] = category.score_out_of_10;
        return scores
      }, {})

      const costs = urbanAreaDetails.categories.find((category: Category) => category.id === 'COST-OF-LIVING')
      const simplifiedCosts = costs?.data.reduce<{[id: string]: number}>((costs, data) => {
        costs[data.id] = data.currency_dollar_value!
        return costs
      }, {})

      const climate = urbanAreaDetails.categories.find((category: Category) => category.id === 'CLIMATE')
      const weatherType = climate?.data.find((weatherData: Datum) => weatherData.id === 'WEATHER-TYPE')?.string_value

      //summary: urbanAreaScores.summary.replace(/\n|\t|<.>|<..>/g, '').split(/ {4}/)[1],

      const location: Location = {
        id: urbanArea.ua_id,
        name: cityName,
        fullName: `${regionName}, ${countryName}`,
        summary: urbanAreaScores.summary,
        bannerImageURL: urbanAreaImages.photos[0].image.web,
        weatherType: weatherType || '',
        costs: {
          bread: (simplifiedCosts) ? simplifiedCosts['COST-BREAD'] : 0,
          cappuccino: (simplifiedCosts) ? simplifiedCosts['COST-CAPUCCINO'] : 0,
          cinema: (simplifiedCosts) ? simplifiedCosts['COST-CINEMA']: 0,
          beer: (simplifiedCosts) ? simplifiedCosts['COST-IMPORT-BEER'] : 0,
          monthlyPublicTransport: (simplifiedCosts) ? simplifiedCosts['COST-PUBLIC-TRANSPORT'] : 0,
          restaurantPrice: (simplifiedCosts) ? simplifiedCosts['COST-RESTAURANT-MEAL'] : 0,
          taxi: (simplifiedCosts) ? simplifiedCosts['COST-TAXI'] : 0,
        },
        scores: {
          cityScore: urbanAreaScores.teleport_city_score,
          travelConnectivity: (simplifiedScores) ? simplifiedScores['Travel Connectivity'] : 0,
          commute: (simplifiedScores) ? simplifiedScores['Commute'] : 0,
          safety: (simplifiedScores) ? simplifiedScores['Safety'] : 0,
          healthcare: (simplifiedScores) ? simplifiedScores['Healthcare'] : 0,
          environmentalQuality: (simplifiedScores) ? simplifiedScores['Environmental Quality'] : 0,
          internetAccess: (simplifiedScores) ? simplifiedScores['Internet Access'] : 0,
          leisureAndCulture: (simplifiedScores) ? simplifiedScores['Leisure & Culture'] : 0,
          tolerance: (simplifiedScores) ? simplifiedScores['Tolerance'] : 0,
        },
        coordinates: {
          latitude: cityInfo.location.latlon.latitude,
          longitude: cityInfo.location.latlon.longitude
        }
      }

      locations.push(location)
    })

    return locations
  }

  render() {
    return (
      <LocationContext.Provider value={{
        state: { ...this.state },
        setSelectedLocation: this.setSelectedLocation,
        fetchLocations: this.fetchLocations
      }}>
        {this.props.children}
      </LocationContext.Provider>
    )
  }
}

export default LocationContextProvider