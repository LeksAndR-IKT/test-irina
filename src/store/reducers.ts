import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState, CityInfoResponse, WeatherDataResponse,  } from './types';

const Permanent = 32;
const TRANSFER_CONVERSION_TO_mmHg = 0.750062;
const API_KEY = 'c51ddf8fb51d348be1802d5a7a1c8edb'

const initialState: WeatherState = {
    name: null,
    coord: { 
        lon: null,
        lat: null,
    },
    main: {
        temp: null,
        humidity: null,
        temp_min: null,
        temp_max: null,
        grnd_level: null,
        temperatureTitle: 'Цельсия'
    },
    windSpeed: null,
    errorSearch: null,
    tempName: null,
    users: [
      {id:0, login: 'user', password: 'user'},
    ]
};

export const fetchWeather = createAsyncThunk<WeatherState, string>(
    'weather/fetchWeather',
    async (city) => {
      try {
        const cityInfoResponse = await axios.get<CityInfoResponse[]>(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        console.log(cityInfoResponse)
        if (!cityInfoResponse.data.length) {
          throw new Error('Город не найден');
        }

        const {data} = await axios.get<WeatherDataResponse>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityInfoResponse.data[0].lat}&lon=${cityInfoResponse.data[0].lon}&appid=${API_KEY}`
        );
        console.log(data)
        const {temp, humidity, temp_min, temp_max, grnd_level} = data.main
        return {
            name: data.name,
            coord: {
                lon: cityInfoResponse.data[0].lon,
                lat: cityInfoResponse.data[0].lat,
            },
            main: {
                temp,
                humidity,
                temp_min,
                temp_max,
                grnd_level: grnd_level ? (Math.round(Number(grnd_level) * TRANSFER_CONVERSION_TO_mmHg)) : null,
                temperatureTitle: 'Цельсия',
            },
            windSpeed: data.wind.speed,
            errorSearch: null,
            tempName: 'Цельсия',
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
);
  
const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
      setCelsius(state) {
        if (state.main.temp !== null) state.main.temp += Permanent;
        if (state.main.temp_min !== null) state.main.temp_min += Permanent;
        if (state.main.temp_max !== null) state.main.temp_max += Permanent;
        state.errorSearch = null;
        state.tempName = 'Цельсия';
      },
      setFahrenheit(state) {
        if (state.main.temp !== null) state.main.temp -= Permanent;
        if (state.main.temp_min !== null) state.main.temp_min -= Permanent;
        if (state.main.temp_max !== null) state.main.temp_max -= Permanent;
        state.errorSearch = null;
        state.tempName = 'Фаренгейт';
      },
      setTempName(state, action: PayloadAction<string>) {
        state.main.temperatureTitle = action.payload;
      },
      setUser(state, action) {
        state.users.push({id: state.users.length, login: action.payload.username, password: action.payload.password})
      }
    },
    extraReducers: (builder) => {
     
      builder
        .addCase(fetchWeather.fulfilled, (state, action) => {
          state.name = action.payload.name;
          state.coord = action.payload.coord;
          state.main = {
            ...action.payload.main,
            temp: (state.main.temperatureTitle !== 'Фаренгейт' ) ? Math.round((action.payload.main.temp ?? 273.15) - 273.15) : Math.round((action.payload.main.temp ?? 457.87) - 457.87),
            temp_min: (state.main.temperatureTitle !== 'Фаренгейт') ? Math.round((action.payload.main.temp_min ?? 273.15) - 273.15) : Math.round((action.payload.main.temp_min  ?? 457.87) - 457.87),
            temp_max: (state.main.temperatureTitle !== 'Фаренгейт') ? Math.round((action.payload.main.temp_max ?? 273.15) - 273.15) : Math.round((action.payload.main.temp_max  ?? 457.87) - 457.87),
        };
        state.windSpeed = action.payload.windSpeed;
        state.errorSearch = null;
        state.tempName = action.payload.tempName;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.errorSearch = action.error.message;
      });
  },
});

export const { setCelsius, setFahrenheit, setTempName, setUser } = weatherSlice.actions;
export default weatherSlice.reducer;