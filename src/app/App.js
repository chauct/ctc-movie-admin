import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfileAction } from "features/auth/action";
import { BrowserRouter, Router, Switch } from "react-router-dom";
import AdminTemplate from "common/components/AdminTemplate";
import Home from "features/dashboard/pages/Home";
import Signin from "features/auth/pages/Signin";
import MovieManagement from "features/movie/pages/MovieManagement";
import FormMovie from "features/movie/components/FormMovie";
import { UserTemplate } from "common/components/UserTemplate";
import EditMovie from "features/movie/components/EditMovie";

export const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAction);
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <AdminTemplate path="/admin" exact component={Home} />
        <UserTemplate path="/" exact component={Signin} />
        <AdminTemplate exact path="/admin/movie" component={MovieManagement} />
        <AdminTemplate exact path="/admin/movie/add" component={FormMovie} />
        <AdminTemplate
          exact
          path="/admin/movie/edit/:id"
          component={EditMovie}
        />
      </Switch>
    </Router>
  );
}

export default App;
