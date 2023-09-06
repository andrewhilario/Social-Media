import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import React from "react";

function SearchBar() {
  return (
    <Flex>
      <InputGroup w={"400px"}>
        <InputLeftElement pointerEvents={"none"}>
          <SearchIcon color={"#B2B2B2"} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search"
          bg={"#EDEDEE"}
          border={"none"}
          borderRadius={"25px"}
        />
      </InputGroup>
    </Flex>
  );
}

export default SearchBar;
