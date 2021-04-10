export interface Location {
  id: number,
  name: string,
  title: string,
  overview: string,
  climate: string,
  budget: "low" | "medium" | "high",
  mainAttractions: string[],
  coordinates: {
    latitude: number,
    longitude: number
  }
}

export interface LocationContextType {
  selectedLocation: Location,
  setSelectedLocation: (location: Location) => void
}