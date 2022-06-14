import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { timeStamp } from "console";
import { useFormik } from "formik";
import { ContextType, useContext, useState } from "react";
import { ContextInterface, ParentContext } from "../../context/ContextProvider";
import { addBotInterface, addBotResponse } from "../../context/Overview/addBot";

function AddBot() {
  const { overview, bots } = useContext<ContextInterface>(ParentContext);
  const [responseMsg, setResponseMsg] = useState<addBotResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      api_id: "",
      api_hash: "",
      password: "",
    },

    onSubmit: async (values: addBotInterface, { resetForm }) => {
      setLoading(true);
      setResponseMsg(null);
      const res = await overview.addBot(values);
      // if (res.success) resetForm();
      setResponseMsg(res);
      setLoading(false);
      let Bots = await bots.getBots();
      if (Bots.success) bots.setAllBots(Bots.data);
    },
  });

  return (
    <Box>
      <Text
        py="2"
        color="#363740"
        textAlign={"left"}
        fontWeight={"bold"}
        fontSize={24}
      >
        AddBot
      </Text>
      <Flex flexDir={"column"} bg="white" borderRadius={10} p="5" shadow="sm">
        <form onSubmit={formik.handleSubmit}>
          <FormControl isRequired>
            <FormLabel mt="3">Name</FormLabel>
            <Input
              name="name"
              value={formik.values.name}
              id="name"
              onChange={formik.handleChange}
              placeholder="Enter a name for your bot"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel mt="3">API ID</FormLabel>
            <Input
              value={formik.values.api_id}
              id="api_id"
              name="api_id"
              onChange={formik.handleChange}
              placeholder="Enter a unique api id for your bot"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel mt="3">API Hash</FormLabel>
            <Input
              value={formik.values.api_hash}
              placeholder="Enter a unique api hash for your bot"
              id="api_hash"
              name="api_hash"
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel mt="3">Password</FormLabel>
            <Input
              value={formik.values.password}
              placeholder="Enter a unique api hash for your bot"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
            />
          </FormControl>
          <Button
            isLoading={loading}
            type="submit"
            mt="5"
            w="24"
            bg="#41C7FE"
            color="white"
            _hover={{}}
            onClick={() => formik.handleReset}
          >
            Add Bot
          </Button>
        </form>
        {responseMsg && (
          <Text color={responseMsg.success ? "green" : "red"}>
            {responseMsg.msg}
          </Text>
        )}
      </Flex>
    </Box>
  );
}

export default AddBot;
