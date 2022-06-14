import { Box, Divider, Flex, Link, Text } from "@chakra-ui/react";

function OutputDetection(props: any) {
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
          <Text fontSize={24}>Output Detection</Text>
        </Flex>
        <Divider />
        <Flex flexDir={"column"}>
          {Array.from({ length: 4 }).map(() => (
            <>
              <Flex py="2" justify={"space-between"} alignItems={"center"}>
                <Text>Test Name</Text>
                <Link href="" noOfLines={1} w="48" color="blue.700">
                  https:\\www.googlaloremlorelslskjeflkdsjklfjlkdsjfklsjkljfdse.com
                </Link>
                <Text>20/5/2022</Text>
              </Flex>
              <Divider />
            </>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default OutputDetection;
