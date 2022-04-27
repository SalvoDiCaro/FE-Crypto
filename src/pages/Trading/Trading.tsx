import axios from "axios";
import { FC, useEffect, useState } from "react";
import CardTrading from "../../components/CardTrading/CardTrading";
import SideBar from "../../components/SideBar/SideBar";
import { RespTrading } from "../../models/RespTrading";
import "./Trading.scss";

interface ITrading {}

const Trading: FC<ITrading> = () => {
  const [trading, setTrading] = useState<RespTrading>();

  const callTrading = () => {
    try {
      (async () => {
        const { data: resp } = await axios.get<RespTrading>(
          "http://localhost:3001/trading/"
        );
        setTrading(resp);
      })();
    } catch (e) {
      console.log("e", e);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      callTrading();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SideBar>
      <div className="container__cards__favourites">
        {trading &&
          trading.map((item) => (
            <div className="card">
              <CardTrading trading={item} />
            </div>
          ))}
      </div>
    </SideBar>
  );
};

export default Trading;
