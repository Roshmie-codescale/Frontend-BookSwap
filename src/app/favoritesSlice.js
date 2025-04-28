import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        addFavorite: (state, action) => {
            console.log('Adding favorite:', action.payload);
            state.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            console.log('Removing favorite:', action.payload);
            return state.filter((item) => item.id !== action.payload.id);
        },
    }
);

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;