import { FC, useRef } from "react";
import { useInViewport } from "react-in-viewport";

import "./EdoMeterCard.scss";
// @ts-ignore
import Odometer from "react-odometerjs";

interface IEdoMeterCard {
  price: any;
  id: string;
}

const EdoMeterCard: FC<IEdoMeterCard> = ({ price }) => {
  const odometerRef = useRef<any>(null);
  const {
    inViewport,
  } = useInViewport(odometerRef, undefined, { disconnectOnLeave: false });
  return (
    <div ref={odometerRef}>
      {inViewport ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            width: "100%",
          }}
        >
          €&nbsp;
          <Odometer value={Number(price)} format="(.ddd),dddddddddddd" />
        </p>
      ) : (
        <div style={{ height: 24, width: "100%" }} />
      )}
    </div>
  );
};

export default EdoMeterCard;
