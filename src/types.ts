export interface Location {
  id: string,
  cityName: string,
  regionName: string,
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
    cityScore: number,
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
  state: { selectedLocation: Location | null, locations: Location[] }
  setSelectedLocation: (location: Location | null) => void,
  fetchLocations: () => Promise<void>
}

// Teleport API
// Auto-generated with https://app.quicktype.io/

// City Search Results

export interface CitySearchResult {
    _embedded: Embedded;
    _links:    CitySearchResultLinksClass;
    count:     number;
}

export interface Embedded {
    "city:search-results": CitySearchResultElement[];
}

export interface CitySearchResultElement {
    _links:                   CitySearchResultLinks;
    matching_alternate_names: MatchingAlternateName[];
    matching_full_name:       string;
}

export interface CitySearchResultLinks {
    "city:item": Self;
}

export interface Self {
    href: string;
}

export interface MatchingAlternateName {
    name: string;
}

export interface CitySearchResultLinksClass {
    curies: Cury[];
    self:   Self;
}

export interface Cury {
    href:      string;
    name:      string;
    templated: boolean;
}

// City Info

export interface CityInfo {
  _links:     Links;
  full_name:  string;
  geoname_id: number;
  location:   GeoLocation;
  name:       string;
  population: number;
}

export interface Links {
  "city:admin1_division": City;
  "city:alternate-names": CityAlternateNames;
  "city:country":         City;
  "city:timezone":        City;
  "city:urban_area":      City;
  curies:                 Cury[];
  self:                   CityAlternateNames;
}

export interface City {
  href: string;
  name: string;
}

export interface CityAlternateNames {
  href: string;
}

export interface Cury {
  href:      string;
  name:      string;
  templated: boolean;
}

export interface GeoLocation {
  geohash: string;
  latlon:  Latlon;
}

export interface Latlon {
  latitude:  number;
  longitude: number;
}

// Urban Area

export interface UrbanArea {
  _links:                Links;
  bounding_box:          BoundingBox;
  continent:             string;
  full_name:             string;
  is_government_partner: boolean;
  mayor:                 string;
  name:                  string;
  slug:                  string;
  teleport_city_url:     string;
  ua_id:                 string;
}

export interface Links {
  curies:                Cury[];
  self:                  Self;
  "ua:admin1-divisions": Ua[];
  "ua:cities":           Self;
  "ua:continent":        Ua;
  "ua:countries":        Ua[];
  "ua:details":          Self;
  "ua:identifying-city": Ua;
  "ua:images":           Self;
  "ua:primary-cities":   Ua[];
  "ua:salaries":         Self;
  "ua:scores":           Self;
}

export interface Cury {
  href:      string;
  name:      string;
  templated: boolean;
}

export interface Self {
  href: string;
}

export interface Ua {
  href: string;
  name: string;
}

export interface BoundingBox {
  latlon: Latlon;
}

export interface Latlon {
  east:  number;
  north: number;
  south: number;
  west:  number;
}


// Urban Area Details

export interface UrbanAreaDetails {
  _links:     Links;
  categories: Category[];
}

export interface Links {
  curies: Cury[];
  self:   Self;
}

export interface Cury {
  href:      string;
  name:      string;
  templated: boolean;
}

export interface Self {
  href: string;
}

export interface Category {
  data:  Datum[];
  id:    string;
  label: string;
}

export interface Datum {
  float_value?:           number | string;
  id:                     string;
  label:                  string;
  type:                   Type;
  percent_value?:         number;
  string_value?:          string;
  currency_dollar_value?: number;
  int_value?:             number;
  url_value?:             string;
}

export enum Type {
  CurrencyDollar = "currency_dollar",
  Float = "float",
  Int = "int",
  Percent = "percent",
  String = "string",
  URL = "url",
}

// Urban Area Scores

export interface UrbanAreaScores {
  _links:              Links;
  categories:          Category[];
  summary:             string;
  teleport_city_score: number;
}

export interface Links {
  curies: Cury[];
  self:   Self;
}

export interface Cury {
  href:      string;
  name:      string;
  templated: boolean;
}

export interface Self {
  href: string;
}

export interface Category {
  color:           string;
  name:            string;
  score_out_of_10: number;
}

// Urban Area Images

export interface UrbanAreaImages {
  _links: Links;
  photos: Photo[];
}

export interface Links {
  curies: Cury[];
  self:   Self;
}

export interface Cury {
  href:      string;
  name:      string;
  templated: boolean;
}

export interface Self {
  href: string;
}

export interface Photo {
  attribution: Attribution;
  image:       Image;
}

export interface Attribution {
  license:      string;
  photographer: string;
  site:         string;
  source:       string;
}

export interface Image {
  mobile: string;
  web:    string;
}

//

/*export interface CityInfo {
  name: string,
  full_name: string,
  location: {
    latlon: {
      latitude: number,
      longitude: number
    }
  },
  _links: Links
}

export interface UrbanArea {
  ua_id: string,
  _links: Links
}

export interface UrbanAreaDetails {
  categories: {
    id: string,
    label: string,
    data: {
      id: string,
      float_value: number,
      label: string
    }[]
  }[]
}

export interface UrbanAreaDetailCategory {
  id: string,
  label: string,
  data: {
    id: string,
    label: string,
    float_value: number,
  }[]
}

export interface UrbanAreaScores {
  summary: string
  categories: UrbanAreaScoreCategory[],
}

export interface UrbanAreaScoreCategory {
  name: string,
  color: string,
  score_out_of_10: number
}

export interface UrbanAreaImages {
  photos: {
    image: {
      mobile: string,
      web: string
    }
  }[]
}*/