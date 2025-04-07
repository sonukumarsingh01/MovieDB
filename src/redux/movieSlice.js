import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ type, page = 1, query = '' }) => {
    let url;
    if (type === 'search') {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`;
    } else {
      url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;