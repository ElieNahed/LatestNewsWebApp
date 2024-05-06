import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherData, ForecastData } from './type';
import { fetchCurrentWeatherData, fetchForecastData } from './weatherApi';

interface WeatherState {
    currentWeatherData: WeatherData | null;
    forecastData: ForecastData[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: WeatherState = {
    currentWeatherData: null,
    forecastData: [],
    status: 'idle',
    error: null,
};

export const fetchWeatherData = createAsyncThunk('weather/fetchWeatherData', async () => {
    try {
        const currentWeatherResponse = await fetchCurrentWeatherData();
        const forecastResponse = await fetchForecastData();
        return { currentWeatherData: currentWeatherResponse, forecastData: forecastResponse };
    } catch (error) {
        throw new Error('Error fetching weather data:' + error);
    }
});

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.currentWeatherData = action.payload.currentWeatherData;
                state.forecastData = action.payload.forecastData;
                state.error = null; // Reset error on successful fetch
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default weatherSlice.reducer;
