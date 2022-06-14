import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useNavigate, Location, useLocation } from "react-router-dom";
import { ContextInterface, ParentContext } from "../../context/ContextProvider";
import AllBots from "./AllBots/AllBots";
import Settings from "./Settings/Settings";
import _ from "lodash";
function Bots() {
  let { tabs } = useContext<ContextInterface>(ParentContext);
  let location = useLocation();
  useEffect(() => {
    tabs.setCurrTab(_.capitalize(location.pathname.slice(1)));
  }, []);
  // const { bots } = useContext<ContextInterface>(ParentContext);

  // useEffect(() => {
  //   async function getBots() {
  //     let res = await bots.getBots();
  //     if (res.success) bots.setAllBots(res.data);
  //   }

  //   getBots();
  // }, []);

  return (
    <Box bg="#F7F8FC" w="100%" maxH="100vh" overflow={"auto"} px="5" pt="5">
      <Heading>Bots</Heading>
      <Flex flexDir={"column"} pt="12">
        <AllBots />
        <Settings />
      </Flex>
    </Box>
  );
}

export default Bots;
