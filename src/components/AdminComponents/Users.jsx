import React, { useMemo, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Checkbox,
  Button,
  Flex
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  commonFirstNames,
  commonLastNames
} from "./DashboardComponents/constant";
import Pagination from "./UsersComponents/Pagination";

function Users() {
  const [currentPage, setCurrentPage] = useState(1);

  function randomNames() {
    const firstName =
      commonFirstNames[Math.floor(Math.random() * commonFirstNames.length)];
    const lastName =
      commonLastNames[Math.floor(Math.random() * commonLastNames.length)];

    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`
    };
  }

  function randomDate() {
    return new Date(
      new Date().getTime() - Math.random() * 10000000000
    ).toLocaleDateString();
  }

  function randomStatus() {
    const status = ["Active", "Inactive"];
    return status[Math.floor(Math.random() * status.length)];
  }

  function randomEarnings() {
    return Math.floor(Math.random() * 1000.0);
  }

  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      name: randomNames().fullName,
      email: `${randomNames().firstName.toLowerCase()}@gmail.com`,
      createdAt: randomDate(),
      status: randomStatus(),
      earnings: randomEarnings()
    });
  }

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (columnName) => {
    if (columnName === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    const sortableData = [...users];

    if (sortColumn) {
      sortableData.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [users, sortColumn, sortDirection]);

  return (
    <>
      <Box padding={"2rem"}>
        <Text fontSize={"2rem"} fontWeight={"semibold"} color={"#3182ce"}>
          Users List
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox colorScheme="blue" size="lg" />
              </Th>
              <Th
                onClick={() => handleSort("name")}
                cursor="pointer"
                textAlign={"center"}
              >
                <Text
                  fontSize={"1rem"}
                  fontWeight={"semibold"}
                  color={"#3182ce"}
                  textAlign={"center"}
                >
                  Name
                </Text>
                {sortColumn === "name" &&
                  (sortDirection === "asc" ? (
                    <TriangleUpIcon />
                  ) : (
                    <TriangleDownIcon />
                  ))}
              </Th>
              <Th
                onClick={() => handleSort("email")}
                cursor="pointer"
                textAlign={"center"}
              >
                <Text
                  fontSize={"1rem"}
                  fontWeight={"semibold"}
                  color={"#3182ce"}
                  textAlign={"center"}
                >
                  Email
                </Text>
                {sortColumn === "email" &&
                  (sortDirection === "asc" ? (
                    <TriangleUpIcon />
                  ) : (
                    <TriangleDownIcon />
                  ))}
              </Th>
              <Th
                onClick={() => handleSort("createdAt")}
                cursor="pointer"
                textAlign={"center"}
              >
                <Text
                  fontSize={"1rem"}
                  fontWeight={"semibold"}
                  color={"#3182ce"}
                >
                  Created At
                </Text>
                {sortColumn === "createdAt" &&
                  (sortDirection === "asc" ? (
                    <TriangleUpIcon />
                  ) : (
                    <TriangleDownIcon />
                  ))}
              </Th>
              <Th>
                <Text
                  fontSize={"1rem"}
                  fontWeight={"semibold"}
                  color={"#3182ce"}
                  textAlign={"center"}
                >
                  Status
                </Text>
              </Th>
              <Th>
                <Text
                  fontSize={"1rem"}
                  fontWeight={"semibold"}
                  color={"#3182ce"}
                  textAlign={"center"}
                >
                  Earnings
                </Text>
              </Th>
              <Th>
                <Text
                  fontSize={"1rem"}
                  fontWeight={"semibold"}
                  color={"#3182ce"}
                  textAlign={"center"}
                >
                  Actions
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((user, index) => {
              return (
                <Tr key={index} _hover={{ backgroundColor: "blue.50" }}>
                  <Td>
                    <Checkbox colorScheme="blue" size="lg" />
                  </Td>
                  <Td textAlign={"center"}>{user.name}</Td>
                  <Td textAlign={"center"}>{user.email}</Td>
                  <Td textAlign={"center"}>{user.createdAt}</Td>
                  <Td
                    textAlign={"center"}
                    color={user.status === "Active" ? "green.500" : "red.500"}
                  >
                    {user.status}
                  </Td>
                  <Td
                    textAlign={"center"}
                    color={user.earnings > 500 ? "green.500" : "red.500"}
                  >
                    {user.earnings > 50 ? (
                      <Flex
                        flexDirection={"row"}
                        justifyContent={"center"}
                        align={"center"}
                        gap={"1rem"}
                      >
                        <Text>${user.earnings}</Text>
                        <TriangleUpIcon color={"green.500"} />
                      </Flex>
                    ) : (
                      <Flex
                        flexDirection={"row"}
                        justifyContent={"center"}
                        align={"center"}
                        gap={"1rem"}
                      >
                        <Text>${user.earnings}</Text>
                        <TriangleDownIcon color={"red.500"} />
                      </Flex>
                    )}
                  </Td>
                  <Td
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-evenly"}
                  >
                    <Button colorScheme="blue">Edit</Button>
                    <Button colorScheme="red">Delete</Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>

        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPageCount={10}
        />
      </Box>
    </>
  );
}

export default Users;
