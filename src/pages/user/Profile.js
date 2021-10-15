import React, { useEffect, useState } from "react";

import { Grid, LinearProgress, Typography } from "@mui/material";
import { withSnackbar } from "../../components/SnackBarHOC";
import RackDetail from "../../components/RackDetail";
import { getOtherUsersInfoById } from "../../utils/Server";
import { useParams } from "react-router-dom";
import ChipGroup from "../../components/ChipGroup";

const Profile = (props) => {
  const { showMessage } = props;
  const [userInfo, setUserinfo] = useState();
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  console.log(id);
  async function fetchUserInfo() {
    try {
      const response = await getOtherUsersInfoById(id);
      setUserinfo(response.data);
    } catch (e) {
      showMessage("error", "Opss... Something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) return <LinearProgress />;
  return (
    <Grid container item xs={12} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">{userInfo?.nickname}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">{userInfo?.biography}</Typography>
      </Grid>

      <Grid item container xs={12} spacing={2} alignItems={"center"}>
        <Grid item>
          <Typography>{"Tags: "}</Typography>
        </Grid>
        <Grid item>
          <ChipGroup array={userInfo?.preferredTags} color={"success"} />
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={2} alignItems={"center"}>
        <Grid item>
          <Typography>{"Languages: "}</Typography>
        </Grid>
        <Grid item>
          <ChipGroup array={userInfo?.preferredLanguages} color={"primary"} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h6">{"Owned Projects"}</Typography>
        </Grid>
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {userInfo?.ownedProjects?.length &&
            userInfo?.ownedProjects?.map((item, index) => {
              return (
                <Grid key={index} item xs={4}>
                  <RackDetail project={item} feature={item.featured} />
                </Grid>
              );
            })}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {"Projects that the user has collaborated in"}
          </Typography>
        </Grid>
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {userInfo?.collaboratedProjects?.length &&
            userInfo?.collaboratedProjects?.map((item, index) => {
              return (
                <Grid key={index} item xs={4}>
                  <RackDetail project={item} feature={item.featured} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withSnackbar(Profile);
