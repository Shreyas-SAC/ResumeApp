import React, { Fragment } from "react";

import "./App.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//components
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Emplogin from "./components/Emplogin";
import FileUpload from "./components/FileUpload";
import Homepage from "./components/Homepage";
import Logout from "./components/Logout";
import "bootstrap/dist/css/bootstrap.min.css";

toast.configure();

function App() {
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" exact component={Homepage} />
            <Route
              exact
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path="/emplogin"
              render={(props) => <Emplogin {...props} />}
            />
            <Route
              exact
              path="/fileupload"
              render={(props) => <FileUpload {...props} />}
            />
            <Route
              exact
              path="/logout"
              render={(props) => <Logout {...props} />}
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
