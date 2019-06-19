import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { signin } from "../services/api";

class Login extends Component {
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
    signin(this.state.username, this.state.password)
      .then(userData => {
        console.log("signin then:", userData);

        if (userData.error) {
          alert(userData.error);
          this.props.history.push("/login");
        } else {
          this.props.signin(userData);
          this.props.history.push("/");
        }
      })
      .catch(err => {
        this.props.history.push("login");
        console.log("signin catch:", err);
      });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="Login">
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
              <Link to="/welcome">Login</Link>
              {/* Login */}
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
