import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { botInterface } from "../../context/Bots/getBots";
import { ParentContext, ContextInterface } from "../../context/ContextProvider";

function ScanCreatedGroups(props: any) {
  const { bots } = useContext<ContextInterface>(ParentContext);
  let bot = props.bot;
  const [keywords, setKeywords] = useState<string[]>(bot.keywords);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (!keywords.includes(text)) {
      setKeywords(() => [...keywords, text]);
    }
    setText("");
  };

  const handleRemoveKeyword = (key: string) => {
    setKeywords(() => keywords.filter((k) => k !== key));
  };

  const toast = useToast();

  const handleOnSave = async () => {
    setLoading(true);
    console.log(keywords);
    let uRes = await bots.updateBot({ keywords }, bot._id);
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
    <Flex
      opacity={loading ? 0.6 : 1}
      pointerEvents={loading ? "none" : "all"}
      // flex="6"
      flexDir={"column"}
      bg="white"
      borderRadius={10}
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
          <Text fontSize={24}>Scan Keywords</Text>
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
        <form onSubmit={handleOnSubmit}>
          <Flex pt="3">
            <Input
              onChange={(e: any) => setText(e.target.value)}
              value={text}
              variant="flushed"
              placeholder="Add Keyword"
            />
            <Button type="submit" variant={"ghost"}>
              <BsPlus size="32" />{" "}
            </Button>
          </Flex>
        </form>
        <Flex flexDir="column" pt="5">
          {keywords.map((k) => (
            <Flex
              py="2"
              borderBottom="1px"
              alignItems={"center"}
              justify="space-between"
              px="2"
              borderColor={"blackAlpha.500"}
            >
              <Text>{k}</Text>
              <Box
                _hover={{ cursor: "pointer" }}
                onClick={() => handleRemoveKeyword(k)}
              >
                <FaMinus />
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default ScanCreatedGroups;
