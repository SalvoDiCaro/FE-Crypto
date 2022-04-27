import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setFavourites } from "../redux/reducers/favourites";
import { useCrypto } from "./useCrypto";
import { useMemo } from "react";

export const useFavourites = () => {
  const { favourites: favouritesId } = useSelector(
    ({ favourites }: RootState) => favourites
  );
  const { cryptos } = useCrypto();
  const dispatch = useDispatch();

  const addFavourite = async (cryptoId: string) => {
    dispatch(setFavourites(cryptoId));
  };

  const favouritesFiltered = useMemo(
    () =>
      !favouritesId || !cryptos
        ? []
        : cryptos.filter(({ id }) =>
            favouritesId.some((idFavourite) => idFavourite === id)
          ),
    [favouritesId, cryptos]
  );
  return { favouritesId, favouritesFiltered, addFavourite };
};
