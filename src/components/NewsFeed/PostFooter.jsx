import { Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import {
  BiLike,
  BiSolidLike,
  BiCommentDetail,
  BiSolidCommentDetail
} from "react-icons/bi";
import { FaShare } from "react-icons/fa";

function PostFooter() {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [isScreenSmall] = useMediaQuery("(max-width: 320px)");

  const handleToggle = () => {
    setIsLiked(!isLiked);

    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
  };
  return (
    <>
      <Flex
        mt={4}
        gap={{
          base: 2,
          md: 4
        }}
      >
        <Flex alignItems={"center"}>
          <Button
            bg={"none"}
            borderRadius="100%"
            _active={{ borderRadius: "100%" }}
            _focus={{ borderRadius: "100%" }}
            p={0}
            w={10}
            h={10}
            onClick={handleToggle}
          >
            {isLiked ? <BiSolidLike /> : <BiLike />}
          </Button>
          <Text
            ml={{
              base: 0,
              md: 1
            }}
            fontSize={14}
          >
            {likes} {isScreenSmall ? "" : "likes"}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Button
            bg={"none"}
            borderRadius="100%"
            _active={{ borderRadius: "100%" }}
            _focus={{ borderRadius: "100%" }}
            p={0}
            w={10}
            h={10}
          >
            <BiCommentDetail />
          </Button>
          <Text ml={1} fontSize={14}>
            {isScreenSmall ? "" : "likes"}
          </Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Button
            bg={"none"}
            borderRadius="100%"
            _active={{ borderRadius: "100%" }}
            _focus={{ borderRadius: "100%" }}
            p={0}
            w={10}
            h={10}
          >
            <FaShare />
          </Button>
          <Text ml={1} fontSize={14}>
            {isScreenSmall ? "" : "likes"}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default PostFooter;
