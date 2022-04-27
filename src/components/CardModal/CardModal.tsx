import {
  CheckIcon,
  InfoIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useValuesCrypto } from "../../hooks/useValuesCrypto";
import { RespCrypto } from "../../models/RespCrypto";
import CardModalInvest from "../CardModalInvest/CardModalInvest";
import "./CardModal.scss";

const options = {
  responsive: true,
};

interface ICardModal {
  isOpen: boolean;
  onClose: () => void;
  crypto: RespCrypto;
}

const CardModal: FC<ICardModal> = ({ isOpen, onClose, crypto }) => {
  const {
    logo_url,
    name,
    symbol,
    price,
    price_timestamp,
    market_cap,
    high,
    high_timestamp,
    id,
  } = crypto;
  const {
    isOpen: isOpenInvest,
    onOpen,
    onClose: onCloseInvest,
  } = useDisclosure();

  const { valuesCryptoMapped, valuesForGrapich } = useValuesCrypto();

  const dateGrapich = useMemo(() => valuesForGrapich(id), [valuesCryptoMapped]);
  const labels = dateGrapich.map(({ date }) => date);
  const datas = dateGrapich.map(({ crypto: { value } }) => value);

  const dataset = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          label: "Crypto value on time",
          backgroundColor: "orange",
          data: datas,
        },
      ],
    }),
    [labels, datas]
  );
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>Crypto Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img className="modal-img" src={logo_url} alt="crypto" />
            <div className="modal-title">{name}</div>
            <div className="modal-subtitle">{symbol}</div>
            <Line options={options} data={dataset} />

            <List spacing={3} className="details-list">
              <ListItem>
                <ListIcon as={InfoIcon} color="blue.400" />
                {`Current price: € ${price}`}
              </ListItem>
              <ListItem>
                <ListIcon as={TimeIcon} color="blue.400" />
                {`Last update: € ${dayjs(price_timestamp).format(
                  "DD/MM/YYYY - HH:mm:ss"
                )}`}
              </ListItem>
              <ListItem>
                <ListIcon as={InfoIcon} color="blue.400" />
                {`Capital Market: € ${market_cap}`}
              </ListItem>
              <ListItem>
                <ListIcon as={TriangleUpIcon} color="blue.400" />
                {`Historical max: € ${high}`}
              </ListItem>
              <ListItem>
                <ListIcon as={TimeIcon} color="blue.400" />
                {`Max datetime: € ${dayjs(high_timestamp).format(
                  "DD/MM/YYYY - HH:mm:ss"
                )}`}
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              variant="solid"
              className="invest"
              onClick={() => {
                onClose();
                onOpen();
              }}
            >
              Invest
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CardModalInvest
        crypto={crypto}
        isOpen={isOpenInvest}
        onClose={onCloseInvest}
      ></CardModalInvest>
    </>
  );
};

export default CardModal;
