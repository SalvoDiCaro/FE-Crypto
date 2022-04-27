import { Badge, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { RespCrypto } from "../../models/RespCrypto";
import "./Card.scss";
import { IconButton } from "@chakra-ui/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { StarIcon } from "@chakra-ui/icons";
import { useFavourites } from "../../hooks/useFavourites";
import { useCallback } from "react";
import CardModal from "../CardModal/CardModal";
import EdoMeterCard from "../EdoMeterCard/EdoMeterCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ICard {
  data: RespCrypto;
}

const Card: FC<ICard> = ({
  data,
  data: {
    logo_url,
    id,
    status,
    price,
    symbol,
    name,
    rank,
    market_cap_dominance,
    price_change_pct,
  },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { favouritesId, addFavourite } = useFavourites();

  const isFavorite = useCallback(
    () => favouritesId.some((idCrypto) => idCrypto === id),
    [favouritesId]
  );

  return (
    <div style={{ position: "relative" }}>
      <div className={"favourite"} onClick={() => addFavourite(id)}>
        <IconButton
          colorScheme={isFavorite() ? "orange" : "blackAlpha"}
          aria-label="Add to favourites"
          icon={<StarIcon />}
          zIndex={10}
        />
      </div>
      <div
        onClick={onOpen}
        className={`cryptos-card crypto ${
          parseFloat(price_change_pct) > 0 ? "positive" : "negative"
        }`}
      >
        <div
          className={`cryptos-card__image ${
            parseFloat(price_change_pct) > 0 ? "positive" : "negative"
          }`}
        >
          <img className="img" src={logo_url} alt="crypto" />
        </div>

        <div className="cryptos-card__unit-name">{name}</div>
        <Badge
          className="cryptos-card__level cryptos-card__level--crypto"
          colorScheme={status === "active" ? "green" : "red"}
        >
          {status}
        </Badge>
        <div className="cryptos-card__unit-description">
          <EdoMeterCard price={price} id={id} />
          <p
            className={`${
              parseFloat(price_change_pct) > 0 ? "positive" : "negative"
            }`}
          >{`daily delta: ${(parseFloat(price_change_pct) * 100).toFixed(
            2
          )} %`}</p>
        </div>

        <div
          className={`cryptos-card__unit-stats cryptos-card__unit-stats--crypto clearfix ${
            parseFloat(price_change_pct) > 0 ? "positive" : "negative"
          }`}
        >
          <div className="one-third">
            <div className="stat">{symbol}</div>
            <div className="stat-value">Symbol</div>
          </div>

          <div className="one-third">
            <div className="stat">{rank}</div>
            <div className="stat-value">Rank</div>
          </div>

          <div className="one-third no-border">
            <div className="stat no-ellipsis">
              {(parseFloat(market_cap_dominance) * 100).toFixed(2)}
            </div>
            <div className="stat-value">Market %</div>
          </div>
        </div>

        <CardModal isOpen={isOpen} onClose={onClose} crypto={data}></CardModal>
      </div>
    </div>
  );
};

export default Card;
