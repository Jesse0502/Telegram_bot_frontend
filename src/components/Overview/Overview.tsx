import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ContextInterface,
  LoggedInUser,
  ParentContext,
} from "../../context/ContextProvider";
import AddBot from "./AddBot";
import _ from "lodash";
function Overview() {
  // const { auth, bots, notification } =
  //   useContext<ContextInterface>(ParentContext);

  // const toast = useToast();
  let { tabs } = useContext<ContextInterface>(ParentContext);
  let location = useLocation();
  useEffect(() => {
    tabs.setCurrTab(_.capitalize(location.pathname.slice(1)));
  }, []);
  return (
    <Box bg="#F7F8FC" w="100%" maxH="100vh" overflow={"auto"} px="5" pt="5">
      <Heading>Overview</Heading>

      <Flex flexDir={"column"} pt="12">
        <AddBot />
      </Flex>
    </Box>
  );
}

export default Overview;
