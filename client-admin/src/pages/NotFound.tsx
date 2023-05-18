import { FC, memo } from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";

const NotFound: FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <Box className={classes.content}>
            <Typography variant="h3">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(NotFound);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 150,
    textAlign: "center",
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));
