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
  coordinates: {
    latitude: number,
    longitude: number
  }
}

export interface LocationContextType {
  selectedLocation: Location | null,
  setSelectedLocation: (location: Location | null) => void,
  fetchLocations: () => Promise<Location[]>
}

export interface UrbanAreaScore {
  [category: string]: number
}