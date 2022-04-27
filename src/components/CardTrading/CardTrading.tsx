import React, { FC } from "react";
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@chakra-ui/icons";
import "./CardTrading.scss";
import { Trading } from "../../models/RespTrading";
import dayjs from "dayjs";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

interface ICardTrading {
  trading: Trading;
}

const CardTrading: FC<ICardTrading> = ({
  trading: {
    price: investPrice,
    price_timestamp: last_update_timestamp,
    amount,
    idTrading,
    id,
    trading__crypto_price,
    trading_timestamp,
  },
}) => {
  const calcProfit = () =>
    Number(
      (
        ((Number(investPrice) - Number(trading__crypto_price)) /
          Number(trading__crypto_price)) *
        100
      ).toFixed(4)
    );

  return (
    <Center py={6}>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={useColorModeValue("green.50", "green.900")}
            p={2}
            px={3}
            color={"green.500"}
            rounded={"full"}
          >
            {id}
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"}>€</Text>
            <Text fontSize={"2xl"} fontWeight={800}>
              {(
                (Number(investPrice) / Number(trading__crypto_price)) *
                amount
              ).toFixed(2)}
            </Text>
          </Stack>
          <Stack
            direction={"row"}
            align={"center"}
            justify={"center"}
            color={calcProfit() >= 0 ? "green.400" : "red"}
          >
            <Text fontSize={"2xl"}>€</Text>
            <Text fontSize={"1xl"} fontWeight={800}>
              {(
                (Number(investPrice) / Number(trading__crypto_price)) * amount -
                Number(amount)
              ).toFixed(2)}
            </Text>
          </Stack>
          <Text color={"gray.500"}>
            Purchase date: {dayjs(trading_timestamp).format("YYYY-MM-DD hh:mm")}
          </Text>
          <Text color={"gray.500"}>
            Last update:{" "}
            {dayjs(last_update_timestamp).format("YYYY-MM-DD hh:mm")}
          </Text>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              <ListIcon
                as={calcProfit() >= 0 ? FiTrendingUp : FiTrendingDown}
                color={calcProfit() >= 0 ? "green.400" : "red"}
              />
              {`${calcProfit()}%`}
            </ListItem>
            <ListItem>
              <ListIcon
                as={ArrowLeftIcon}
                color={calcProfit() <= 0 ? "green.400" : "red"}
              />
              {`Purchase price: € ${Number(trading__crypto_price).toFixed(6)}`}
            </ListItem>
            <ListItem>
              <ListIcon
                as={ArrowRightIcon}
                color={calcProfit() < 0 ? "red.400" : "green"}
              />
              {`Current price: € ${investPrice}`}
            </ListItem>
          </List>
        </Box>
      </Box>
    </Center>
  );
};

export default CardTrading;
