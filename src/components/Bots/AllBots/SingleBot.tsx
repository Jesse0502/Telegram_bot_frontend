import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsPause, BsPlay, BsThreeDotsVertical } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import { botInterface } from "../../../context/Bots/getBots";
import { formatDistance, formatDistanceToNow } from "date-fns";
import {
  ContextInterface,
  ParentContext,
} from "../../../context/ContextProvider";

function SingleBot(props: any) {
  const { bots } = useContext<ContextInterface>(ParentContext);
  let bot = props.bot;
  let splitDate = bot.updatedAt.split(" ")[0].split("/");
  let splitTime = bot.updatedAt.split(" ")[1].split(":");
  let createdTime = bot.createdAt.split(" ")[1].split(":");
  let distance = formatDistanceToNow(
    new Date(
      splitDate[2].split(" ")[0],
      splitDate[1] - 1,
      splitDate[0],
      splitTime[0],
      splitTime[1],
      splitTime[2]
    ),
    { addSuffix: true }
  );

  const toast = useToast();

  const getAllBots = async () => {
    let res = await bots.getBots();
    if (res.success) bots.setAllBots(res.data);
  };

  const handleDeleteBot = async () => {
    let res = await bots.deleteBot(bot._id);
    if (res.success) await getAllBots();
    else
      toast({
        title: "Error",
        description: res.data,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
  };

  const handleUpdateBot = async () => {
    let res;
    if (bot.status === "Paused") {
      res = await bots.updateBot({ status: "Active" }, bot._id);
    } else {
      res = await bots.updateBot({ status: "Paused" }, bot._id);
    }
    if (res.success) await getAllBots();
    else
      toast({
        title: "Error",
        description: res.data,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
  };

  return (
    <Box py="4">
      <HStack>
        <HStack flex="6">
          <Box mr="4" p="2" rounded={100} bg="blackAlpha.200">
            <FaRobot size={35} />
          </Box>
          <Flex flexDir={"column"}>
            <Text fontWeight={"bold"}>{bot.name}</Text>
            <Text opacity="0.4" fontSize={12}>
              Updated {distance}
            </Text>
          </Flex>
        </HStack>
        <Flex flex="1" flexDir={"column"}>
          <Text flex="1" fontSize={15}>
            {bot.createdAt.split(" ")[0]}
          </Text>
          <Text opacity={0.4} fontSize={13}>
            {createdTime[0] + ":" + createdTime[1] + ":" + createdTime[2]}
          </Text>
        </Flex>
        <Text
          flex="1"
          textAlign={"center"}
          p="1"
          rounded={30}
          color={bot.status === "Active" ? "white" : "blackAlpha.700"}
          bg={bot.status === "Active" ? "blue.400" : "yellow"}
        >
          {bot.status}
        </Text>

        <Box px="4">
          <Menu>
            <MenuButton
              transition="all 0.2s"
              _hover={{}}
              _expanded={{}}
              _focus={{ boxShadow: "outline" }}
            >
              <BsThreeDotsVertical size={18} />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  handleUpdateBot();
                }}
              >
                {" "}
                <Flex alignItems={"center"}>
                  {bot.status === "Active" ? (
                    <BsPause size="24" />
                  ) : (
                    <BsPlay size="24" />
                  )}
                  <Text pl="1">
                    {bot.status === "Active" ? "Pause" : "Activate"}
                  </Text>
                </Flex>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDeleteBot();
                }}
              >
                <Flex alignItems={"center"}>
                  <AiFillDelete size="24" />
                  <Text pl="1">Delete</Text>
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
      <Divider mt="4" />
    </Box>
  );
}

export default SingleBot;
