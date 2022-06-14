import { Center, Flex, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  ContextInterface,
  ParentContext,
} from "../../../context/ContextProvider";
import SingleAvailableBot from "./SingleAvailableBot";

function AvailableBots(props: any) {
  let allBots = props.allBots;
  return (
    <Flex flexDir={"column"} mt="5">
      {allBots.length ? (
        allBots.map((bot: any) => <SingleAvailableBot bot={bot} />)
      ) : (
        <Center pt="10">
          <Heading opacity={0.6}>Nothing to see here</Heading>
        </Center>
      )}
    </Flex>
  );
}

export default AvailableBots;
