import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { ImSpinner } from "react-icons/im";
import {
  ContextInterface,
  ParentContext,
} from "../../../context/ContextProvider";
import SingleBot from "./SingleBot";

function AllBots() {
  const { bots } = useContext<ContextInterface>(ParentContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const toast = useToast();

  const handleRefresh = async () => {
    setRefreshing(true);
    let res = await bots.getBots();
    if (res.success) bots.setAllBots(res.data);
    else
      toast({
        title: "Error",
        description: `${res.data}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });

    setRefreshing(false);
  };
  return (
    <Box>
      <Flex alignItems="center" justify={"space-between"}>
        <Heading fontSize={"2xl"} pb="2">
          All Bots
        </Heading>
        <Button
          gap="1"
          bg="#363740"
          color="white"
          m="2"
          rounded={5}
          cursor="pointer"
          _hover={{}}
          _active={{}}
          isLoading={refreshing}
          onClick={() => {
            handleRefresh();
          }}
        >
          <Text px="2" opacity={0.9}>
            Refresh
          </Text>
          <ImSpinner />{" "}
        </Button>
      </Flex>

      <Flex flexDir={"column"} bg="white" borderRadius={10} p="5" shadow="sm">
        <Flex>
          <Text flex="6" fontWeight={"medium"} opacity="0.6">
            Bot details
          </Text>
          <Text flex="1" pr="10" fontWeight={"medium"} opacity="0.6">
            Date
          </Text>
          <Text flex="1" pr="6" fontWeight={"medium"} opacity="0.6">
            Status
          </Text>
        </Flex>
        <Divider py="2" />
        {bots.allBots.length >= 1 ? (
          bots.allBots.map((bot) => <SingleBot bot={bot} />)
        ) : (
          <Center py="5">
            <Heading opacity={0.5}>Noting to show here</Heading>
          </Center>
        )}
      </Flex>
    </Box>
  );
}

export default AllBots;
