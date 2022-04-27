import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  SliderMark,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, useState } from "react";
import { RespCrypto } from "../../models/RespCrypto";
import "./CardModalInvest.scss";

interface ICardModalInvest {
  isOpen: boolean;
  onClose: () => void;
  crypto: RespCrypto;
}

const CardModalInvest: FC<ICardModalInvest> = ({
  isOpen,
  onClose,
  crypto: { id },
}) => {
  const [sliderValue, setSliderValue] = useState(50);
  const toast = useToast();

  const addInvest = async () => {
    try {
      const { data: resp } = await axios.post(
        "http://localhost:3001/trading/",
        {
          amount: sliderValue,
          idCrypto: id,
          userId: 1,
        }
      );

      toast({
        title: "Investment Successfully!",
        description: "See details on trading panel",
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      onClose();
    } catch (e) {
      console.log("e", e);
    }
  };
  return (
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
          <Slider
            aria-label="slider-ex-6"
            onChange={(val) => setSliderValue(val)}
          >
            <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
              25€
            </SliderMark>
            <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
              50€
            </SliderMark>
            <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
              75€
            </SliderMark>
            <SliderMark
              value={sliderValue}
              textAlign="center"
              bg="orange.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
            >
              {sliderValue}€
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </ModalBody>
        <ModalFooter justifyContent={"center"}>
          <Button onClick={addInvest} variant="solid" className="invest">
            Invest
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardModalInvest;
