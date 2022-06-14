import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsPlay, BsPlayCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import SingleGroup from "./SingleGroup";

function Groups(props: any) {
  let propGroup = props.groups;
  let id = props.id;
  let checkBoxes = props.checkBoxes;
  const [groups, setGroups] = useState(propGroup);
  return (
    <Box pt="12">
      <Flex justify={"flex-end"} alignItems={"center"}>
        <Box flex="3" />
        {[
          "Download",
          "All",
          "Text",
          "Pictures",
          "Videos",
          "Audios",
          "Files",
          "Extentions",
        ].map((it) => (
          <Text textAlign={"center"} flex="1">
            {it}
          </Text>
        ))}
      </Flex>
      <Divider />
      <Box
        maxH="72"
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "red",
            borderRadius: "24px",
          },
        }}
      >
        {groups.length ? (
          groups.map((g: any) => (
            <SingleGroup group={g} id={id} checkBoxes={checkBoxes} />
          ))
        ) : (
          <Center>
            <Heading opacity={0.6} py="16">
              Nothing to see here
            </Heading>
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default Groups;
