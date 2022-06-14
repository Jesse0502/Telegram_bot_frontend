import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import ScanCreatedGroups from "./ScanCreatedGroups";
import ScanForwardedMessages from "./ScanForwardedMessages";
import OutputDetection from "./OutputDetection";
import OutputOfCreatedGroups from "./OutputOfCreatedGroups";
import { useContext, useEffect } from "react";
import { ContextInterface, ParentContext } from "../../context/ContextProvider";
import { useLocation } from "react-router-dom";
import _ from "lodash";
function Scan() {
  const { bots, tabs } = useContext<ContextInterface>(ParentContext);
  let location = useLocation();
  useEffect(() => {
    tabs.setCurrTab(_.capitalize(location.pathname.slice(1)));
  }, []);
  return (
    <Box bg="#F7F8FC" w="100%" maxH="100vh" overflow={"auto"} px="5" pt="5">
      <Heading mb="10">Scan</Heading>
      {bots.allBots.map((bot) => (
        // {bot.status == "Paused" && }
        <Flex flexDir={"column"}>
          <Text fontSize={32}>
            {bot.name} ({bot.api_id})
          </Text>
          <Flex>
            <ScanForwardedMessages bot={bot} />
            <ScanCreatedGroups bot={bot} />
          </Flex>
          {/* <Flex>
              <Box flex="6">
                <OutputDetection groups={bot.groups} />
              </Box>
              <Box flex="6">
                <OutputOfCreatedGroups groups={bot.groups} />
              </Box>
            </Flex> */}
        </Flex>
      ))}
      {!bots.allBots.length && (
        <Box justifyItems={"center"}>
          <Heading opacity={0.6}>Nothing to see here...</Heading>
        </Box>
      )}
    </Box>
  );
}

export default Scan;
