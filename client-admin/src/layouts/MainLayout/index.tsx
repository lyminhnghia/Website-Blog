import React, { FC, memo } from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import { Redirect, Switch, Route, RouterProps } from "react-router-dom";
import { hasLogin } from "../../utils";
import { PathConstant } from "../../const";
import Sidebar from "./components/Sidebar";

const MainLayout = () => {
  const defaultClasses = useStyles();
  const isChecked = hasLogin();

  return (
    <Box className={defaultClasses.root}>
      <Sidebar />
      <main className={defaultClasses.main}>
        <Switch>
          {/* <AuthenticationRoute exact path={PathConstant.BLOGS_ADD} component={PostBlog} /> */}
        </Switch>
      </main>
    </Box>
  );
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
    minHeight: "100vh",
    backgroundColor: "#fafafb",
  },
});

interface PropsAuth extends Omit<RouterProps, "component"> {
  component: any;
  path: any;
}

const AuthenticationRoute: FC<PropsAuth> = (props) => {
  const { component: Component, path, ...rest } = props;
  // Check authentication with the page need to be protected
  const isChecked = hasLogin();

  return isChecked ? (
    <Route {...rest} render={(matchProps) => <Component {...matchProps} />} />
  ) : (
    <Redirect
      to={{
        pathname: PathConstant.LOGIN,
        state: {
          from: path,
        },
      }}
    />
  );
};
