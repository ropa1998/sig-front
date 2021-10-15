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
import {Star} from "@mui/icons-material";
import {styled} from "@mui/material/styles";

const ExpandMore = styled((props) => {
    const {...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RackDetail({rack}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card variant="outlined">
            <ImageListItem style={{height: "100px", width: "400px"}}>
                <img
                    src="https://cdn.slidemodel.com/wp-content/uploads/13081-01-gradient-designs-powerpoint-backgrounds-16x9-5.jpg"
                    loading="lazy"
                />
            </ImageListItem>
            <CardHeader
                title={rack.name}
            />
            <CardContent>
                <Typography>Dimensions</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>{"X: " + rack.x}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{"Y: " + rack.y}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{"Z: " + rack.z}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
