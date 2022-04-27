import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ValueCrypto {
  crypto: { id: string; value: string }[];
  date: Date | number;
}
interface CryptoState {
  valuesCrypto: ValueCrypto[];
}

const initialState = { valuesCrypto: [] } as CryptoState;

const valuesCrypto = createSlice({
  name: "valuesCrypto",
  initialState,
  reducers: {
    setValueCrypto(state, action: PayloadAction<ValueCrypto[]>) {
      state.valuesCrypto = action.payload;
    },
    addValueCrypto(state, action: PayloadAction<ValueCrypto>) {
      state.valuesCrypto = [...state.valuesCrypto, action.payload];
    },
  },
});

export const { setValueCrypto, addValueCrypto } = valuesCrypto.actions;
export default valuesCrypto.reducer;
