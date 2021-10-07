import { Box, Card, CardContent, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";
import React from "react";

const ShimmerItemProject = () => {
  return (
    <Grid item>
      <Card variant="outlined">
        <CardContent>
          <Box mt={1} mb={2}>
            <Skeleton variant="rect" width={200} height={40} />
          </Box>
          <Box my={2}>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Skeleton variant="rect" width={100} height={30} />
              </Grid>
              <Grid item>
                <Skeleton variant="rect" width={200} height={30} />
              </Grid>
              <Grid item>
                <Skeleton variant="rect" width={100} height={30} />
              </Grid>
              <Grid item>
                <Skeleton variant="rect" width={100} height={30} />
              </Grid>
            </Grid>
          </Box>
          <Box my={2}>
            <Skeleton variant="rect" height={60} />
          </Box>
          <Box mt={2}>
            <Skeleton variant="rect" width={250} height={30} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ShimmerItemProject;
