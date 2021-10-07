import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import ItemOptions from "./ItemOptions";
import DeleteDialog from "./DeleteDialog";

const ProjectItem = (props) => {
  const { item } = props;
  const [anchorEl, setAnchorEl] = useState(false);
  const [open, setOpen] = useState(false);

  const shrinkText = (text) => {
    let nText = text;
    if (nText.length > 340) {
      if (nText.substring(340) !== "") {
        nText = nText.substring(0, 340);
        return `${nText.substring(0, nText.lastIndexOf(" "))}...`;
      }
    }
    return nText;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                justifyContent="space-between"
                container
                direction="row"
              >
                <Box fontSize={22} fontWeight={500} color="textPrimary">
                  {item?.title}
                </Box>
                <Box>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <ItemOptions
                    id={item?.id}
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    setDelete={setOpen}
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                container
                spacing={1}
                direction="row"
                alignItems="center"
              >
                <Grid item>
                  <Typography>Tag/s:</Typography>
                </Grid>
                {item?.tags &&
                  item?.tags.map((item, index) => (
                    <Grid item key={index}>
                      <Chip label={item.name} color="primary" />
                    </Grid>
                  ))}
              </Grid>
              <Grid
                item
                xs={12}
                container
                spacing={1}
                direction="row"
                alignItems="center"
              >
                <Grid item>
                  <Typography>Language/s:</Typography>
                </Grid>
                {item?.languages &&
                  item?.languages.map((item, index) => (
                    <Grid item key={index}>
                      <Chip label={item.name} color="success" />
                    </Grid>
                  ))}
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary">
                  {shrinkText(item?.description)}
                </Typography>
              </Grid>
              <Grid item xs={12} container direction="column" alignItems="left">
                <Grid container direction="row">
                  <Grid item>
                    <Typography>Link/s: </Typography>
                  </Grid>
                  {item?.links &&
                    item.links.map((item, index) => (
                      <Grid item key={index}>
                        <Box ml={0.5}>
                          <Link>{item}</Link>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <DeleteDialog open={open} setOpen={setOpen} id={item?.id} />
    </>
  );
};
export default ProjectItem;
