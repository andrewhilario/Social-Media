import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import React from "react";
import DashboardCard from "./DashboardComponents/DashboardCard";
import {
  faArrowTrendUp,
  faFlag,
  faHandHoldingDollar,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";
import {
  commonFirstNames,
  commonLastNames
} from "./DashboardComponents/constant";

function Dashboard() {
  const startDate = new Date().toLocaleDateString();
  const endDate = new Date(
    new Date().getTime() - Math.random() * 10000000000
  ).toLocaleDateString();

  const xAxis = [];
  const yAxis = [];

  for (let i = 0; i < 20; i++) {
    xAxis.push(new Date(startDate).getTime() + i * 86400000);
    yAxis.push(Math.floor(Math.random() * 6000));
  }

  const series = [
    {
      name: "series-1",
      data: xAxis.map((x, i) => {
        return [x, yAxis[i]];
      })
    }
  ];

  function recentUsers() {
    const recentUsers = [];

    const generateRandomName = (i) => {
      return (
        commonFirstNames[Math.floor(Math.random() * commonFirstNames.length)] +
        " " +
        commonLastNames[Math.floor(Math.random() * commonLastNames.length)]
      );
    };

    for (let i = 0; i < 7; i++) {
      recentUsers.push(
        <Flex
          flexDirection={"row"}
          gap={"1rem"}
          width={"100%"}
          align={"center"}
        >
          <Avatar color="blue" />
          <Text fontSize={"1rem"} fontWeight={"bold"} color={"#3182ce"}>
            {generateRandomName(i)}
          </Text>
        </Flex>
      );
    }

    return recentUsers;
  }

  function randomDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).toLocaleDateString();
  }
  function randomEarnings() {
    return "$ " + Math.floor(Math.random() * 100) + ".00";
  }

  function randomName() {
    return (
      commonFirstNames[Math.floor(Math.random() * commonFirstNames.length)] +
      " " +
      commonLastNames[Math.floor(Math.random() * commonLastNames.length)]
    );
  }

  const tableData = [
    {
      name: randomName(),
      createdDate: randomDate(),
      status: "Active",
      earnings: randomEarnings()
    },
    {
      name: randomName(),
      createdDate: randomDate(),
      status: "Active",
      earnings: randomEarnings()
    },
    {
      name: randomName(),
      createdDate: randomDate(),
      status: "Active",
      earnings: randomEarnings()
    },
    {
      name: randomName(),
      createdDate: randomDate(),
      status: "Active",
      earnings: randomEarnings()
    }
  ];

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)"
        }}
        gap={6}
        padding={"2rem"}
        margin={"0 auto"}
      >
        <GridItem
          colSpan={{
            base: 1,
            md: 1,
            lg: 1,
            xl: 1
          }}
        >
          <DashboardCard
            text="Total Sales"
            icon={faArrowTrendUp}
            value="$ 2,203.12"
          />
        </GridItem>
        <GridItem>
          <DashboardCard text="Total Users" icon={faUsers} value="1,203" />
        </GridItem>
        <GridItem>
          <DashboardCard
            text="Total Earnings"
            icon={faHandHoldingDollar}
            value="$ 20,203.12"
          />
        </GridItem>
        <GridItem>
          <DashboardCard text="Total Reports" icon={faFlag} value="10" />
        </GridItem>
      </Grid>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)"
        }}
        gap={6}
        padding={"2rem"}
        margin={"0 auto"}
      >
        <GridItem
          colSpan={{
            base: 1,
            md: 2,
            lg: 2,
            xl: 3
          }}
        >
          <Box
            width={"100%"}
            padding={"2rem"}
            backgroundColor="white"
            borderRadius={"10px"}
            boxShadow={"0 0 10px rgba(0, 0, 0, 0.1)"}
          >
            <Text
              fontSize={"2rem"}
              fontWeight={"bold"}
              color={"#3182ce"}
              marginBottom={"2rem"}
            >
              Analytics
            </Text>
            <ReactApexChart
              options={{
                chart: {
                  id: "basic-line-chart",
                  fontFamily: "inherit",
                  zoom: {
                    enabled: true
                  }
                },
                xaxis: {
                  type: "datetime"
                },

                stroke: {
                  curve: "smooth"
                }
              }}
              series={series}
              type="line"
              height={400}
              responsive={[
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 300
                    }
                  }
                }
              ]}
            />
          </Box>
        </GridItem>
        <GridItem>
          <Card
            padding={"2rem"}
            borderRadius={"10px"}
            boxShadow={"0 0 10px rgba(0, 0, 0, 0.1)"}
          >
            <Text fontSize={"1rem"} fontWeight={"bold"} color={"#3182ce"}>
              Recent Users
            </Text>
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"start"}
              gap={"1rem"}
              mt={"1rem"}
            >
              {/* <Flex
                flexDirection={"row"}
                gap={"1rem"}
                width={"100%"}
                align={"center"}
              >
                <Avatar
                  src={
                    "https://images.pexels.com/photos/8350401/pexels-photo-8350401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                />
                <Text fontSize={"1rem"} fontWeight={"bold"} color={"#3182ce"}>
                  Jamaal Salsalani
                </Text>
              </Flex> */}
              {recentUsers()}
            </Flex>
          </Card>
        </GridItem>
      </Grid>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)"
        }}
        gap={6}
        padding={"2rem"}
        margin={"0 auto"}
      >
        <GridItem colSpan={4}>
          <Card padding={"2rem"} boxShadow={"0 0 10px rgba(0, 0, 0, 0.1)"}>
            <Flex
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
            >
              <Text fontSize={"2rem"} fontWeight={"bold"} color={"#3182ce"}>
                Recent Users
              </Text>
              <Button
                marginLeft={"auto"}
                colorScheme={"blue"}
                onClick={() => {
                  window.location.href = "/admin/users";
                }}
              >
                View All
              </Button>
            </Flex>
            <Table variant="simple" marginTop={"1rem"}>
              <Thead>
                <Tr>
                  <Th>
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"semibold"}
                      color={"#3182ce"}
                    >
                      Name
                    </Text>
                  </Th>
                  <Th>
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"semibold"}
                      color={"#3182ce"}
                    >
                      Created At
                    </Text>
                  </Th>
                  <Th>
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"semibold"}
                      color={"#3182ce"}
                    >
                      Status
                    </Text>
                  </Th>
                  <Th>
                    <Text
                      fontSize={"1rem"}
                      fontWeight={"semibold"}
                      color={"#3182ce"}
                    >
                      Earnings
                    </Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {tableData.map((data) => {
                  return (
                    <Tr>
                      <Td>{data.name}</Td>
                      <Td>{data.createdDate}</Td>
                      <Td>{data.status}</Td>
                      <Td>{data.earnings}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
}

export default Dashboard;
