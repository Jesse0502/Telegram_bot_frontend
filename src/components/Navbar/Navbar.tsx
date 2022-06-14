import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { ReactElement, useContext, useEffect, useState } from "react";
import {
  ParentContext,
  ContextInterface,
  LoggedInUser,
} from "../../context/ContextProvider";
import { BsPieChartFill } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import { AiFillBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ImExit, ImLoop2 } from "react-icons/im";

import jwt_decode from "jwt-decode";
import { addBotInterface, addBotResponse } from "../../context/Overview/addBot";
interface TabsTypes {
  txt: string;
  Icon: ReactElement;
}

function Navbar() {
  let navigate = useNavigate();
  const [logoutHover, setLogoutHover] = useState(false);
  const {
    tabs: tb,
    auth,
    notification,
    bots,
  } = useContext<ContextInterface>(ParentContext);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const getNotification = async () => {
      let res = await notification.getNotifications();
      if (res.success)
        notification.setNotifications(
          res.data.sort(
            (a: any, b: any) =>
              //@ts-ignore
              new Date(`${b.lastUpdated}`) - new Date(`${a.lastUpdated}`)
          )
        );
    };
    getNotification();
    setTimeout(() => {
      setTimer(timer + 1);
    }, 5000);
  }, [timer]);

  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      let user: LoggedInUser = jwt_decode(token);
      if (user) {
        auth.setIsLoggedIn(user);
      }
    }
    const getBots = async () => {
      let Bots: addBotResponse = await bots.getBots();
      if (Bots.success) bots.setAllBots(Bots.data);
    };

    getBots();
  }, []);

  const tabs: TabsTypes[] = [
    { txt: "Overview", Icon: <BsPieChartFill size={22} /> },
    { txt: "Bots", Icon: <FaRobot size={22} /> },
    { txt: "Alerts", Icon: <AiFillBell size={22} /> },
    { txt: "Scan", Icon: <ImLoop2 size={22} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleChangeTab = (txt: string) => {
    tb.setCurrTab(txt);
    navigate(`/${txt.toLocaleLowerCase()}`);
  };

  return (
    <Box color="white" width="20%" bg="#363740" height="100vh" pos="relative">
      <Text
        textAlign={"center"}
        pb="6"
        opacity={0.3}
        fontWeight="bold"
        mt="6"
        fontSize={20}
      >
        Dashboard
      </Text>
      <Flex flexDir={"column"}>
        {tabs.map((it, idx) => (
          <HStack
            key={idx}
            bg={tb.currTab === it.txt ? "whiteAlpha.200" : ""}
            justifyItems="center"
            alignItems={"center"}
            p={4}
            gap={2}
            onClick={() => handleChangeTab(it.txt)}
            _hover={{ cursor: "pointer" }}
          >
            <Box opacity={tb.currTab === it.txt ? 1 : 0.4}>{it.Icon}</Box>
            <Text fontSize={20} opacity={tb.currTab === it.txt ? 1 : 0.5}>
              {it.txt}
            </Text>
          </HStack>
        ))}
      </Flex>
      <Center
        gap={4}
        h="10"
        pos="absolute"
        bottom="5"
        w="100%"
        _hover={{ bg: "blackAlpha.300" }}
        cursor="pointer"
        onMouseEnter={() => {
          setLogoutHover(true);
        }}
        onMouseLeave={() => {
          setLogoutHover(false);
        }}
        onClick={handleLogout}
        opacity={0.5}
      >
        {!logoutHover ? (
          <Text>
            Logged in as: <b> {auth.isLoggedIn?.name.toLocaleUpperCase()}</b>
          </Text>
        ) : (
          <ImExit />
        )}
      </Center>
    </Box>
  );
}

export default Navbar;
