import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  Select,
  Text,
  InputRightElement,
  CircularProgress,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaWindowRestore } from "react-icons/fa";
import {
  ContextInterface,
  ParentContext,
} from "../../../context/ContextProvider";
import AvailableBots from "./AvailableBots";

function Settings() {
  const { bots } = useContext<ContextInterface>(ParentContext);

  const [allBots, setAllBots] = useState(bots.allBots);

  const [searchInput, setSearchInput] = useState<string>("");

  const handleOnSelect = (e: any) => {
    if (!e.target.value) {
      handleResetFilter();
    } else {
      let filter = bots.allBots.filter((bot) => bot.status === e.target.value);
      setAllBots(filter);
    }
  };

  const handleResetFilter = () => {
    setAllBots(bots.allBots);
    setSearchInput("");
  };

  useEffect(() => {
    let filterBots = bots.allBots.filter((bot) =>
      bot.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );
    setTimeout(() => {
      if (searchInput.length) {
        setAllBots(filterBots);
      } else {
        setAllBots(bots.allBots);
      }
    }, 100);
  }, [searchInput]);

  useEffect(() => {
    setAllBots(bots.allBots);
  }, [bots.allBots]);

  return (
    <Box pt="5">
      <Heading fontSize={"2xl"} py="2">
        Download
      </Heading>
      <Flex pt="5" justify="space-between">
        <Flex alignItems={"center"} justify="flex-start">
          <InputGroup>
            <Input
              placeholder="Search"
              w="md"
              bg="blackAlpha.200"
              onChange={(e: any) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </InputGroup>
          <Flex px="3" onClick={handleResetFilter} cursor="pointer">
            <AiOutlineReload size="24" />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} justify="flex-end">
          <Text pr="2" color="blackAlpha.800">
            Show Bots
          </Text>
          <Select
            onChange={handleOnSelect}
            placeholder="Select Status"
            name="name"
            id="name"
            isRequired
            w="36"
          >
            <option value="Active">Active</option>
            <option value="Paused">Not Active</option>
          </Select>
        </Flex>
      </Flex>
      <AvailableBots allBots={allBots} />
    </Box>
  );
}

export default Settings;
