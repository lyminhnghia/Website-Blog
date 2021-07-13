import { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { Login, NotFound } from "./pages";
import { PathConstant } from "./const";
import store from "./redux";
import "./theme/styles";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path={PathConstant.LOGIN} component={Login} />
          <Route exact path={PathConstant.NOT_FOUND} component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
