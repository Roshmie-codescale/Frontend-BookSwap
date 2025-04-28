import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
});
