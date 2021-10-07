import React, { useEffect, useState } from "react";
import ProjectDetail from "../../components/ProjectDetail";
import { Grid } from "@mui/material";
import { withSnackbar } from "../../components/SnackBarHOC";
import Search from "../../components/Search";

function HomePage(props) {
  const [projects, setProjects] = useState([]);
  const { showMessage } = props;
  const filterList = [
    { label: "Title", value: "name" },
    { label: "Tag", value: "tag" },
    { label: "Language", value: "language" },
  ];

  useEffect(() => {
    //fetchProjects(); //Delete the comments to get all projects when mount the page
  }, [projects]);

  return (
    <Grid container item xs={12} spacing={3}>
      <Grid item xs={12}>
        <Search
          state={projects}
          setState={setProjects}
          showMessage={showMessage}
          filters={filterList}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          {projects.length > 0 &&
            projects.map((item, index) => {
              return (
                <Grid key={index} item xs={4}>
                  <ProjectDetail project={item} feature={item.featured} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
}
export default withSnackbar(HomePage);
