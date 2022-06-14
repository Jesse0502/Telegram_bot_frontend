import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ContextInterface, ParentContext } from "../../context/ContextProvider";
import SingleAlert from "./SingleAlert";
import _ from "lodash";

function Alerts() {
  const { notification, tabs } = useContext<ContextInterface>(ParentContext);

  let location = useLocation();
  useEffect(() => {
    tabs.setCurrTab(_.capitalize(location.pathname.slice(1)));
  }, []);
  return (
    <Box bg="#F7F8FC" w="100%" maxH="100vh" overflow={"auto"} px="5" pt="5">
      <Heading>Alerts</Heading>
      <Flex flexDir="column" pt="5">
        {notification.notifications.map((notification) => (
          <SingleAlert notification={notification} />
        ))}
      </Flex>
    </Box>
  );
}

export default Alerts;
