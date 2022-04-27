import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RespCrypto } from "../../models/RespCrypto";

interface CryptoState {
  cryptos: RespCrypto[] | undefined;
}

const initialState = { cryptos: undefined } as CryptoState;

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
      setCrypto(state, action: PayloadAction<RespCrypto[]>) {
      state.cryptos = action.payload;
    },
  },
});

export const { setCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer;
