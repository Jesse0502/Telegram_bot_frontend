import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import { ContextInterface, ParentContext } from "../../context/ContextProvider";
import { notificationInterface } from "../../context/Notifications/getNotifications";

function SingleAlert(props: any) {
  const { bots, notification: nfs } =
    useContext<ContextInterface>(ParentContext);
  let notification: notificationInterface = props.notification;
  let [groupName, setGroupName] = useState("");
  useEffect(() => {
    bots.allBots.forEach((bot) => {
      bot.groups.forEach((group) => {
        if (group.id === notification.source.split("#")[1]) {
          setGroupName(group.name);
        }
      });
    });
  });

  const handleDeleteNotification = async () => {
    let uRes = await bots.updateBot(
      {
        notifications: nfs.notifications.filter(
          (n) => n.id !== notification.id
        ),
      },
      notification.botId
    );
    if (uRes.success) {
      let res = await nfs.getNotifications();
      if (res.success) nfs.setNotifications(res.data);
    }
  };
  return (
    <>
      <HStack gap="3" p="5" justify={"space-between"} alignItems="">
        <Flex>
          <Box mr="4" pt="2">
            <Flex p="2" rounded={100} bg="blackAlpha.200">
              <FaRobot size={35} />
            </Flex>
          </Box>
          <Flex flexDir="column">
            <Text fontWeight={"bold"} fontSize={32}>
              {groupName ? groupName : "New Group Created"}
            </Text>
            <Text as={"span"}>
              Alert ID:{" "}
              <Text as={"span"} opacity={0.6}>
                {notification.id}
              </Text>
            </Text>
            <Text py="2">
              Sender:{" "}
              <Text opacity={0.6} as={"span"}>
                {notification?.who_posted?.first_name}{" "}
                {notification?.who_posted?.last_name}
              </Text>
            </Text>
            <HStack gap={5}>
              <Text>
                Last Updated:{" "}
                <Text as={"span"} opacity={0.6}>
                  {notification.lastUpdated}
                </Text>
              </Text>
            </HStack>
            {notification.media && (
              <Text py="3">
                Media:{" "}
                <Text opacity={0.6} as={"span"}>
                  {notification.media}
                </Text>
              </Text>
            )}
            <Text opacity={"0.5"}>{notification.description}</Text>
          </Flex>
        </Flex>
        <Box>
          {/* <Menu>
            <MenuButton
              transition="all 0.2s"
              _hover={{}}
              _expanded={{}}
              _focus={{ boxShadow: "outline" }}
            >
              <BsThreeDotsVertical size={18} />
            </MenuButton>
            <MenuList> */}
          <Button onClick={handleDeleteNotification}>
            {" "}
            <Flex alignItems={"center"}>
              <AiFillDelete size="24" />
            </Flex>
          </Button>
          {/* <MenuDivider />
              <MenuItem>Open...</MenuItem>
              <MenuItem>Save File</MenuItem> */}
          {/* </MenuList>
          </Menu> */}
        </Box>
      </HStack>
      <Divider />
    </>
  );
}

export default SingleAlert;
