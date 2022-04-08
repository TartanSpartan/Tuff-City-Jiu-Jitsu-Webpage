import React, { Component } from "react";
import { Session } from "../requests";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import { GoogleLogin } from "react-google-login";
// import styled from "styled-components"
import "../App.scss";
import { useHistory } from "react-router-dom";


class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    console.log("These are the props", this.props);
    this.state = {
      errors: []
    };


    this.handleSignIn = this.handleSignIn.bind(this);
    // this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
    this.createSession = this.createSession.bind(this);
  }

  handleSignIn(data){
    console.log("This is the login data", data);
    // let history = useHistory();


    console.log("This is this", this)
    Session.create({
      email: data.Du.tv,
      password: data.googleId
    }).then(data => {
          this.props.history.push("/");
        // history.push("/");
    });
 }
 
   handleFailure = (data) => {
     console.log("This is the failure data", data);
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
      <div>
      <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Sign in with Google"
      onSuccess={this.handleSignIn}
      onFailure={this.handleFailure}
      cookiePolicy={'single_host_origin'}
    />
    <br/>   
    
      <Form onSubmit={this.createSession}>
                  {errors.length > 0 ? (
            <div className="ui negative message FormErrors">
              <Alert variant="danger">
              <div className="header">Error Signing in...</div>
              <p>{errors.map(err => err.message).join(",")}</p>
              </Alert>
            </div>
          ) : null}
          <br/>   
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
      </div>
    );
  }
}

export default SignInPage;