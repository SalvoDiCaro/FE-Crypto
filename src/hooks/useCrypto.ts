import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RespCrypto } from "../models/RespCrypto";
import { setCrypto } from "../redux/reducers/crypto";
import { RootState } from "../redux/store";
import { useValuesCrypto } from "./useValuesCrypto";

export const useCrypto = () => {
  const dispatch = useDispatch();
  const { cryptos } = useSelector(({ cryptos }: RootState) => cryptos);
  const { addCryptoValues } = useValuesCrypto();

  const fetchCryptos = useCallback(async () => {
    try {
      const { data: resp } = await axios.get<RespCrypto[]>(
        `http://localhost:3001/cryptos/`
      );
      addCryptoValues(resp);
      dispatch(setCrypto(resp));
      return resp;
    } catch (e) {
      console.log("e", e);
    }
  }, []);

  return { cryptos, fetchCryptos };
};
