import { FC, memo, useState } from "react";
import { makeStyles, useTheme, useMediaQuery, Box } from "@material-ui/core";
import { Redirect, Switch, Route, RouterProps } from "react-router-dom";
import { hasLogin } from "../../utils";
import { PathConstant } from "../../const";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const MainLayout = () => {
  const defaultClasses = useStyles();
  const isChecked = hasLogin();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const onChangeSidebar = (): void => setOpenSidebar(!openSidebar);

  return (
    <>
      <Header
        isDisplayMenuIcon={!isDesktop}
        onChangeSidebar={onChangeSidebar}
      />
      <Box className={defaultClasses.root}>
        {(isDesktop || openSidebar) && <Sidebar />}
        <main className={defaultClasses.main}>
          <Switch>
            {/* <AuthenticationRoute exact path={PathConstant.BLOGS_ADD} component={PostBlog} /> */}
          </Switch>
        </main>
      </Box>
    </>
  );
};

export default memo(MainLayout);

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "stretch",
  },
  main: {
    flexGrow: 1,
    minHeight: "calc(100vh - 56px)",
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
