import { FC, memo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { Login, NotFound } from "./pages";
import { PathConstant } from "./const";
import MainLayout from "./layouts/MainLayout";
import store from "./redux";
import "./theme/styles";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path={PathConstant.LOGIN} component={Login} />
          <Route exact path={PathConstant.NOT_FOUND} component={NotFound} />
          <Route path={PathConstant.ROOT} component={MainLayout} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default memo(App);
