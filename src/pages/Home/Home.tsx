import { FC } from "react";
import Card from "../../components/Card/Card";
import SideBar from "../../components/SideBar/SideBar";
import { useCrypto } from "../../hooks/useCrypto";
import "./Home.scss";

interface IHome {}

const Home: FC<IHome> = () => {
  const { cryptos } = useCrypto();
  return (
    <>
      <SideBar>
        <div className="container__cards">
          {cryptos &&
            cryptos.map((item, index) => (
              <div className="card" key={index}>
                <Card data={item} />
              </div>
            ))}
        </div>
      </SideBar>
    </>
  );
};

export default Home;
