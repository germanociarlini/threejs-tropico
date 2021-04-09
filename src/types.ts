export interface Location {
  name: string,
  title: string,
  overview: string,
  climate: string,
  "average-cost": "low" | "medium" | "high",
  "main-attractions": string[],
  coordinates: {
    latitude: number,
    longitude: number
  }
}