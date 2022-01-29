import { Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { Cats } from "./views";

const App = () => {
  return (
    <>
      <Header />
      <main className="w-100">
        <Switch>
          <Route path="/" render={(props) => <Cats />} />
        </Switch>
      </main>
    </>
  );
};

export default App;
