import {
  Box,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea
} from "@chakra-ui/react";
import React from "react";
import Layout from "../Layout";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillMessage,
  AiOutlineMessage
} from "react-icons/ai";
import { HiUsers, HiOutlineUsers } from "react-icons/hi";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";
import mobileWatchIcon from "../../assets/svg/mobile-watch-icon.svg";
import mobileWatchIconFilled from "../../assets/svg/mobile-watch-icon-filled.svg";
import { NewsFeedSM } from "../../components/NewsFeed";
import FriendRequests from "../FriendRequests/FriendRequests";

function SmallerScreen() {
  const [isSelected, setIsSelected] = React.useState(0);

  return (
    <>
      <Layout webName="UM Connect" bgColor="white" paddingY={5}>
        <Tabs isFitted onChange={(index) => setIsSelected(index)}>
          <TabList>
            <Tab>
              {isSelected === 0 ? (
                <AiFillHome color="#0C71f5" fontSize={24} />
              ) : (
                <AiOutlineHome color="#0C71f5" fontSize={24} />
              )}
            </Tab>
            <Tab>
              {isSelected === 1 ? (
                <HiUsers color="#0C71f5" fontSize={24} />
              ) : (
                <HiOutlineUsers color="#0C71f5" fontSize={24} />
              )}
            </Tab>
            <Tab>
              {isSelected === 2 ? (
                <AiFillMessage color="#0C71f5" fontSize={24} />
              ) : (
                <AiOutlineMessage color="#0C71f5" fontSize={24} />
              )}
            </Tab>
            <Tab>
              {isSelected === 3 ? (
                <Box w={10} h={10}>
                  <Image src={mobileWatchIconFilled} w={"100%"} h={"100%"} />
                </Box>
              ) : (
                <Box w={10} h={10}>
                  <Image src={mobileWatchIcon} w={"100%"} h={"100%"} />
                </Box>
              )}
            </Tab>
            <Tab>
              {isSelected === 4 ? (
                <IoNotifications color="#0C71f5" fontSize={24} />
              ) : (
                <IoNotificationsOutline color="#0C71f5" fontSize={24} />
              )}
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <NewsFeedSM />
            </TabPanel>
            <TabPanel>
              <Text m={0} fontSize={20} fontWeight={"bold"}>
                Friend Requests
              </Text>
              <FriendRequests />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
}

export default SmallerScreen;
