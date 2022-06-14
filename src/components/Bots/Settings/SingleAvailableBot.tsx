import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { botInterface } from "../../../context/Bots/getBots";
import Groups from "./Groups";

function SingleAvailableBot(props: any) {
  const bot: any = props.bot;
  return (
    <Box my="5" bg="white" rounded="lg" shadow={"md"} px="4" py="6">
      <Flex justify={"space-between"} alignItems="center">
        <Flex flexDir={"column"}>
          <Heading>{bot.name}</Heading>
          <Text opacity={"0.6"}>In {bot.scanGroups?.length} group(s)</Text>
        </Flex>
        <Text
          w="24"
          textAlign={"center"}
          p="1"
          rounded={30}
          color={bot.status === "Active" ? "white" : "blackAlpha.700"}
          bg={bot.status === "Active" ? "blue.400" : "yellow"}
        >
          {bot.status}
        </Text>
      </Flex>
      <Groups
        groups={bot.scanGroups}
        id={bot._id}
        checkBoxes={bot.checkBoxes}
      />
    </Box>
  );
}

export default SingleAvailableBot;
