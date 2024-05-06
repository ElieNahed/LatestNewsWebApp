import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsApi } from "./newsApi";
import { NewsItem, NewsState } from "./types";

// Define Pagination interface
interface Pagination {
  totalResults: number;
  totalPages: number;
  currentPage: number;
}

// Adjust the return type of getNews to include pagination
export const getNews = createAsyncThunk<
  { results: NewsItem[]; pagination: Pagination }, // Updated return type
  {
    page: number;
    pageSize: number;
  },
  { rejectValue: string }
>('news/getNews', async (params, thunkAPI) => {
  const { page, pageSize } = params;

  try {
    const data = await newsApi(
      page,
      pageSize
    );
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Update initialState to include pagination with default values
const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
  pagination: {
    totalResults: 0,
    totalPages: 0,
    currentPage: 0,
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.loading = false;
      state.pagination = action.payload.pagination;
      state.news = action.payload.results;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch news";
    });
  },
});

export default newsSlice.reducer;
