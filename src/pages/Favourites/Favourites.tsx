import { FC } from "react";
import Card from "../../components/Card/Card";
import SideBar from "../../components/SideBar/SideBar";
import "./Favourites.scss";
import { useFavourites } from "../../hooks/useFavourites";

interface IFavourites {}

const Favourites: FC<IFavourites> = () => {
  const { favouritesFiltered } = useFavourites();

  return (
    <SideBar>
      <div className="container__cards__favourites">
        {favouritesFiltered &&
          favouritesFiltered.map((item, index) => (
            <div className="card" key={index}>
              <Card data={item} />
            </div>
          ))}
      </div>
    </SideBar>
  );
};

export default Favourites;
