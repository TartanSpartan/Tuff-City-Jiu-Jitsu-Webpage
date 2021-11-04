import React, { Component } from "react";
import { Session } from "../requests";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"

// import styled from "styled-components"
import "../App.scss";

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.createSession = this.createSession.bind(this);
  }

  createSession(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    Session.create({
      email: formData.get("email"),
      password: formData.get("password")
    }).then(data => {
      if (data.status === 404) {
        this.setState({
          errors: [{ message: "Wrong email or password" }]
        });
      } else {
        this.setState({
          errors: []
        });
        this.props.history.push("/");

        if (typeof this.props.onSignIn === "function") {
          this.props.onSignIn();
        }
      }
    });
  }
  render() {
    const { errors } = this.state;
    return (      
      <Form onSubmit={this.createSession}>
                  {errors.length > 0 ? (
            <div className="ui negative message FormErrors">
              <Alert variant="danger">
              <div className="header">Error Signing in...</div>
              <p>{errors.map(err => err.message).join(",")}</p>
              </Alert>
            </div>
          ) : null}
        <Form.Label id="top-label">Sign in here</Form.Label>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email e.g. yourname@usermail.com"  required={true}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Enter password"  required={true}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default SignInPage;