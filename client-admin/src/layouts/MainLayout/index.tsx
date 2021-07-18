import React, { memo } from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect, Switch } from "react-router-dom";
import {} from "../../const";

const MainLayout = () => {
  const defaultClasses = useStyles();

  return <Box className={defaultClasses.root}></Box>;
};

MainLayout.propTypes = {
  classes: PropTypes.object,
};

MainLayout.defaultProps = {
  classes: {},
};

export default memo(MainLayout);

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "stretch",
  },
  main: {
    flexGrow: 1,
    minHeight: "calc(100vh - 60px)",
    backgroundColor: "#fafafb",
  },
});
