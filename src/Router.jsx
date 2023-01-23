import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./Routes/Coin";
import Coins from "./Routes/Coins";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/details">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
