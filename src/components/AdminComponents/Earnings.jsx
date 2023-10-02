import { Grid } from "@chakra-ui/react";
import React from "react";

function Earnings() {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem colSpan={1}></GridItem>
        <GridItem colSpan={1}></GridItem>
      </Grid>
    </>
  );
}

export default Earnings;
