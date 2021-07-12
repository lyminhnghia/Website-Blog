import React, { memo } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

const Login = () => {
  const defaultClasses = useStyles();

  return (
    <Container className={defaultClasses.root}>
      <Box className={defaultClasses.paper}>
        <Avatar>H</Avatar>
        <Typography>Login</Typography>
        <Typography>Login</Typography>
      </Box>
    </Container>
  );
};

export default memo(Login);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  paper: {
    width: 396,
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
  },
}));
