import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RespCrypto } from "../models/RespCrypto";
import { addValueCrypto, ValueCrypto } from "../redux/reducers/valuesCrypto";
import { RootState } from "../redux/store";

export const useValuesCrypto = () => {
  const dispatch = useDispatch();
  const { valuesCrypto } = useSelector(
    ({ valuesCrypto }: RootState) => valuesCrypto
  );
  const addCryptoValues = (crypto: RespCrypto[]) => {
    const newValuesCrypto: ValueCrypto = {
      date: Date.now(),
      crypto: crypto.map(({ id, price }) => ({ id, value: price })),
    };
    dispatch(addValueCrypto(newValuesCrypto));
  };
  const valuesCryptoMapped = useMemo(
    () =>
      valuesCrypto.map(({ date, crypto }) => ({
        date: dayjs(date).format("HH:mm:ss"),
        crypto,
      })),
    [valuesCrypto]
  );
  const valuesSingleCrypto = (id: string) =>
    valuesCryptoMapped.filter(({ crypto }) =>
      crypto.some(({ id: idCrypto }) => id === idCrypto)
    );

  const valuesForGrapich = useCallback(
    (id: string) => {
      const output = valuesSingleCrypto(id).map(
        ({ date, crypto: [crypto] }) => ({ date, crypto: crypto })
      );
      return output.length < 10
        ? output
        : output.slice(output.length - 10, output.length);
    },
    [valuesCryptoMapped]
  );

  return {
    valuesCryptoMapped,
    addCryptoValues,
    valuesSingleCrypto,
    valuesForGrapich,
  };
};
