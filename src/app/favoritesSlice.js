import {createSlice} from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {favorites: []},
  reducers: {
    addFavorite: (state, action) => {
      console.log('Adding favorite:', action.payload);
      state.favorites.push(action.payload);
    },

    removeFavorite: (state, action) => {
      console.log('Removing favorite:', action.payload);
      state.favorites = state.favorites.filter(
        item => item._id !== action.payload._id,
      );
    },
  },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;

export default favoritesSlice.reducer;
