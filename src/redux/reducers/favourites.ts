import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CryptoState {
  favourites: string[];
}

const initialState = { favourites: [] } as CryptoState;

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourites(state, { payload }: PayloadAction<string>) {
      const findCrypto = state.favourites.find(( id ) => id === payload);
      state.favourites = findCrypto
        ? state.favourites.filter(( id ) => id !== payload )
        : [...state.favourites, payload];
    },
  },
});

export const { setFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
