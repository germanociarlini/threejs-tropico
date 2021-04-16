export interface Location {
  id: string,
  name: string,
  fullName: string,
  summary: string,
  bannerImageURL: string,
  weatherType: string,
  costs: {
    bread: number,
    cappuccino: number,
    cinema: number,
    beer: number,
    monthlyPublicTransport: number,
    restaurantPrice: number,
    taxi: number,
  },
  scores: {
    travelConnectivity: number,
    commute: number,
    safety: number,
    healthcare: number,
    environmentalQuality: number,
    internetAccess: number,
    leisureAndCulture: number,
    tolerance: number,
  },
  mainAttractions: string[], // leisureAndCulture score > 0.7 || seaside-access > 0.8
  coordinates: {
    latitude: number,
    longitude: number
  }
}

export interface LocationContextType {
  selectedLocation: Location,
  setSelectedLocation: (location: Location | null) => void,
  fetchLocations: () => Promise<Location[]>
}