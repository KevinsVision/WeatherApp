import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.name.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="wrapper">
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="name" size="lg">
              <FormLabel>Name</FormLabel>
              <FormControl
                autoFocus
                type="name"
                value={this.state.name}
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
