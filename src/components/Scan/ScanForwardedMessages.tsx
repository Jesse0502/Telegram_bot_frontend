import {
  Box,
  Button,
  Center,
  Checkbox,
  CircularProgress,
  Divider,
  Flex,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { botGroupInterface, botInterface } from "../../context/Bots/getBots";
import { ContextInterface, ParentContext } from "../../context/ContextProvider";

function ScanForwardedMessages(props: any) {
  const { bots } = useContext<ContextInterface>(ParentContext);
  let bot = props.bot;

  const [selectedGroups, setSelectedGroups] = useState<botGroupInterface[]>(
    bot.scanGroups
  );
  const [loading, setLoading] = useState<boolean>(false);
  const handleAddGroup = (id: string, name: string) => {
    if (name === "All") {
      if (selectedGroups === bot.groups) {
        setSelectedGroups([]);
      } else {
        setSelectedGroups(bot.groups);
      }
    } else {
      setSelectedGroups(() => [...selectedGroups, { id, name }]);
      selectedGroups.forEach((i) => {
        if (i.id === id) {
          setSelectedGroups(() => selectedGroups.filter((g) => g.id !== id));
        }
      });
    }
  };

  const toast = useToast();

  const handleOnSave = async () => {
    setLoading(true);
    let uRes = await bots.updateBot({ scanGroups: selectedGroups }, bot._id);
    console.log("selectedGroups =>", selectedGroups);
    if (uRes.success) {
      let res = await bots.getBots();
      if (res.success) bots.setAllBots(res.data);
    } else {
      toast({
        title: "Error",
        description: uRes.data,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Flex
        opacity={loading ? 0.6 : 1}
        pointerEvents={loading ? "none" : "all"}
        flex="6"
        flexDir={"column"}
        bg="white"
        borderRadius={10}
        // p="5"
        m="3"
        shadow="sm"
        h="80"
        overflow={"auto"}
      >
        {loading && (
          <Box zIndex={999}>
            <Progress isIndeterminate h="1" />
          </Box>
        )}
        <Box p="5">
          <Flex justify={"space-between"}>
            <Text fontSize={24}>Scan Groups</Text>
            <Button
              _hover={{}}
              _active={{}}
              variant="ghost"
              color="blue.600"
              onClick={handleOnSave}
            >
              Save
            </Button>
          </Flex>
          <Divider />
          <Box pt="2">
            <Flex justify={"space-between"} py="2" alignItems={"center"}>
              <Text>Scan Data from all groups</Text>
              <Checkbox
                onChange={() => handleAddGroup("-1", "All")}
                value="All"
              ></Checkbox>
            </Flex>
            <Divider />
            <Flex flexDir={"column"}>
              {bot.groups.map((i: any) => (
                <Flex py="2" justify={"space-between"} alignItems={"center"}>
                  <Text>{i.name}</Text>
                  <Checkbox
                    isChecked={selectedGroups.some((g) => g.id === i.id)}
                    onChange={() => handleAddGroup(i.id, i.name)}
                    value="GroupName"
                  ></Checkbox>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default ScanForwardedMessages;
