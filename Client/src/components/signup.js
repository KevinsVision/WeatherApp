import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { signup } from "../services/api";

class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    signup(this.state.username, this.state.password)
      .then(userData => {
        console.log("signup then:", userData);

        if (userData.error) {
          alert(userData.error);
          this.props.history.push("/newUser");
        } else {
          this.props.signup(userData);
          this.props.history.push("/");
        }
      })
      .catch(err => {
        this.props.history.push("newUser");
        console.log("signup catch:", err);
      });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="Login">
          <h1 className="logSignText">Please Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="username" size="lg">
              <FormLabel>Name</FormLabel>
              <FormControl
                autoFocus
                type="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" size="lg">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              onClick={this.handleSubmit}
              variant="outline-warning"
              block
              size="lg"
              disabled={!this.validateForm()}
              type="submit"
            >
              <Link to="/welcome">NewUser</Link>
              {/* newUser */}
            </Button>
            <br />
            <br />
            <br />
            <h3 className="logSignText">Login for Existing Users</h3>
            <Button
              onClick={this.handleSubmit}
              variant="outline-warning"
              block
              size="lg"
              disabled={!this.validateForm()}
              type="submit"
            >
              <Link to="/login">Login</Link>
              {/* newUser */}
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(NewUser);
