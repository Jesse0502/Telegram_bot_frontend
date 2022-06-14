import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ContextInterface, ParentContext } from "../../context/ContextProvider";
import { useToast } from "@chakra-ui/react";

function Signup(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const { auth } = useContext<ContextInterface>(ParentContext);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      setLoading(true);
      let res = await auth.Signup(values);
      if (res.success) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        auth.setSignupData(values);
        handleRedirect();
      } else {
        toast({
          title: "Error",
          description: res.msg,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      }
      setLoading(false);
    },
  });
  const handleRedirect = () => {
    props.setLogin("login");
  };
  return (
    <Center
      w="100%"
      h="100vh"
      justifyContent="center"
      maxH="100vh"
      bg="#363740"
    >
      <Flex
        justify={"center"}
        w="96"
        h="md"
        bg="white"
        shadow={"lg"}
        rounded="5"
        p="5"
        flexDir={"column"}
      >
        <Text
          color="#363740"
          fontWeight={"bold"}
          textAlign="center"
          fontSize="3xl"
        >
          Dashboard
        </Text>
        <Box pt="5">
          <form onSubmit={formik.handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                onChange={formik.handleChange}
                isRequired
                type="text"
                name="name"
                id="name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>

              <Input
                onChange={formik.handleChange}
                isRequired
                type="email"
                name="email"
                id="email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={formik.handleChange}
                isRequired
                type="password"
                name="password"
                id="password"
              />
            </FormControl>
            <Button
              isLoading={loading}
              _hover={{}}
              _active={{}}
              mt="7"
              w="100%"
              type="submit"
              bg="blue.400"
              color="white"
            >
              Signup
            </Button>
          </form>
          <Text textAlign={"center"} pt="2">
            Have an account already?{" "}
            <Link color="blue.600" as={"span"} onClick={handleRedirect}>
              Login
            </Link>
          </Text>
        </Box>
      </Flex>
    </Center>
  );
}

export default Signup;
