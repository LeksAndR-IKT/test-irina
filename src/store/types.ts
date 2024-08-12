export interface RootState {
    main: MainWeatherInfo;
    errorSearch: string | null;
    name: string | null;
    coord: WeatherCoord;
    windSpeed: number | null;
    tempName: string | null;
    users: user[];
}

export interface MainWeatherInfo {
    temp: number | null;
    temp_min: number | null;
    temp_max: number | null;
    humidity: number | null;
    grnd_level: number | null;
}

export interface WeatherCoord {
    lon: number | null;
    lat: number | null;
}

export interface Coord {
    lon: number | null;
    lat: number | null;
}

export interface user {
  id: number
  login: string
  password: string
}

export interface Main {
    temp: number | null;
    humidity: number | null;
    temp_min: number | null;
    temp_max: number | null;
    grnd_level: number | null;
    temperatureTitle: string;
}

export interface WeatherState {
    name: string | null;
    coord: Coord;
    main: Main;
    windSpeed: number | null;
    errorSearch: string | null | undefined;
    tempName: string | null;
    users: user[]
}

export interface CityInfoResponse {
    lat: number;
    lon: number;
}

export interface WeatherDataResponse {
    name: string;
    main: {
        temp: number | null;
        humidity: number | null;
        temp_min: number | null;
        temp_max: number | null;
        grnd_level?: number;
    };
    wind: {
        speed: number;
    };
}