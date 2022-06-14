import { Box, Divider, Flex, Text } from "@chakra-ui/react";

function OutputOfCreatedGroups(props: any) {
  let groups = props.groups;
  return (
    <Flex
      flex="6"
      flexDir={"column"}
      bg="white"
      borderRadius={10}
      p="5"
      m="3"
      shadow="sm"
      h="80"
      overflow={"auto"}
    >
      <Box>
        <Flex justify={"space-between"}>
          <Text fontSize={24}>Output Of Unique Forwarded Messages</Text>
        </Flex>
        <Divider />
        <Flex flexDir={"column"}>
          {Array.from({ length: 4 }).map(() => (
            <>
              <Flex py="2" alignItems={"center"}>
                <Flex flex="6">
                  <Text>From: </Text>
                  <Text pl="2" fontWeight={"bold"}>
                    Group Name
                  </Text>
                </Flex>
                <Flex flex="6">
                  <Text>To: </Text>
                  <Text pl="2" fontWeight={"bold"}>
                    Group Name
                  </Text>
                </Flex>
              </Flex>
              <Divider />
            </>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default OutputOfCreatedGroups;
