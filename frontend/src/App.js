import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/login";
import NewUser from "./components/signup";

class App extends React.Component {
  state = {
    user: null
  };

  signin = user => this.setState({ user });

  signout = () => this.setState({ user: null });

  render() {
    const { user } = this.state;
    const { signout, signin } = this;
    return (
      <div className="app">
        <Switch>
          {/* created new component */}
          <Route
            exact
            path="/signup"
            component={props => <NewUser {...props} signin={signin} />}
          />
          <Route
            exact
            path="/login"
            component={props => <Login {...props} signin={signin} />}
          />
          <Route
            exact
            path="/"
            component={props => (
              <HomePage {...props} user={user} signout={signout} />
            )}
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}

export default App;
