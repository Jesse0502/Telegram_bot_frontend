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
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ContextInterface, ParentContext } from "../../context/ContextProvider";

function Login(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const { auth } = useContext<ContextInterface>(ParentContext);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: auth.signupData.email,
      password: auth.signupData.password,
    },

    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      let res = await auth.Login(values);
      if (res.success) {
        localStorage.setItem("token", res.data);
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: res.data,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      }
      setLoading(false);
    },
  });

  const handleOnClick = () => {
    props.setLogin("signup");
  };
  return (
    <Center
      w="100%"
      h="100vh"
      // justify={"center"}
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
              <FormLabel>Email</FormLabel>
              <Input
                defaultValue={formik.initialValues.email}
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
                defaultValue={formik.initialValues.password}
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
              Login
            </Button>
          </form>
          <Text textAlign={"center"} pt="2">
            Don't have an account?{" "}
            <Link color="blue.600" as={"span"} onClick={handleOnClick}>
              Signup
            </Link>
          </Text>
        </Box>
      </Flex>
    </Center>
  );
}

export default Login;
