import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import ProjectItem from "../../components/ProjectItem";
import ShimmerItemProject from "../../components/ShimmerItemProject";
import { withSnackbar } from "../../components/SnackBarHOC";
import { useHistory } from "react-router-dom";
import { getMyProjects } from "../../utils/Projects";

function ProjectPage(props) {
  const { showMessage } = props;
  const [project, setProject] = useState();
  const history = useHistory();

  async function fetchProjects() {
    try {
      const response = await getMyProjects();
      setProject(response.data);
    } catch (e) {
      showMessage("error", "Opss... Something went wrong");
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const goToAdd = () => {
    history.push("/my-projects/add");
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Grid justifyContent="space-between" container direction="row">
          <Box fontWeight={500} fontSize={30}>
            My projects
          </Box>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={goToAdd}
            startIcon={<AddCircle />}
          >
            Add project
          </Button>
        </Grid>
      </Grid>
      {project ? (
        project.length > 0 ? (
          <Grid item>
            <Box mt={3}>
              <Grid container spacing={2} direction="column">
                {}
                {project?.map((item, index) => (
                  <ProjectItem
                    key={index}
                    item={item}
                    showMessage={showMessage}
                  />
                ))}
              </Grid>
            </Box>
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <Grid item alignItems="stretch">
              <Grid alignItems="center">
                <Box minHeight="100vh">
                  Oops... You forgot to add a project!
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )
      ) : (
        [...Array(5).keys()].map((item, index) => (
          <Box mt={3} key={index}>
            <ShimmerItemProject />
          </Box>
        ))
      )}
    </Grid>
  );
}

export default withSnackbar(ProjectPage);
