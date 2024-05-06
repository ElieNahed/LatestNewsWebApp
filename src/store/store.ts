import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import newsSlice from "./news/newsSlice";
import weatherSlice from "./weather/weatherSlice"; 

export const store = configureStore({
    reducer: {
      user: userSlice,
      news: newsSlice,
      weather: weatherSlice, 
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
