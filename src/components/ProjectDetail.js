import React from "react";
import {
  Grid,
  Link,
  Chip,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Star } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProjectDetail({ project, feature = false }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined">
      <ImageListItem style={{ height: "100px", width: "400px" }}>
        <img
          src="https://cdn.slidemodel.com/wp-content/uploads/13081-01-gradient-designs-powerpoint-backgrounds-16x9-5.jpg"
          loading="lazy"
        />
        {feature && (
          <ImageListItemBar
            title="Featured"
            position="top"
            actionPosition="left"
            actionIcon={
              <IconButton sx={{ color: "white" }}>
                <Star />
              </IconButton>
            }
          />
        )}
      </ImageListItem>

      <CardHeader
        title={project.title}
        subheader={
          <Typography>
            Owner:{" "}
            <Link href={`/user/${project.owner.id}`}>
              {project.owner.nickname}
            </Link>
          </Typography>
        }
      />
      <CardContent>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Tag/s:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {project.tags.map((tag, index) => (
              <Chip
                key={index}
                variant="outlined"
                label={tag.name || tag}
                color="success"
                style={{ marginRight: "10px" }}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Language/s:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {project.languages.map((tag, index) => (
              <Chip
                key={index}
                variant="outlined"
                label={tag.name || tag}
                color="primary"
                style={{ marginRight: "10px" }}
              />
            ))}
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <Typography variant="subtitle2" color="textSecondary">
          Show more
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{project.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              {project.links.map((link, index) => (
                <Typography key={index}>
                  <Link href={link}>{link}</Link>
                </Typography>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}
