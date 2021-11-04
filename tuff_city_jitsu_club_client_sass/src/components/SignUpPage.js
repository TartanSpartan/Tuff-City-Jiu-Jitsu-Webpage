import React from "react";
import { User } from "../requests";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
// import styled from "styled-components"
import "../App.scss";

export function SignUpPage(props) {
  const { onSignUp } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    const signUpParams = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
      // New elements: check that these make sense
      belt_grade_id: formData.get("belt_grade_id"),
      owns_gi: formData.get("owns_gi")
    };

    User.create(signUpParams).then(res => {
      if (res.id) {
        onSignUp();
        props.history.push("/");
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Label id="top-label">Sign up here</Form.Label>
    <Form.Group controlId="formBasicName">
      <Form.Label>First name</Form.Label>
      <Form.Control name="first_name" type="name" placeholder="First name"  required={true}/>
    </Form.Group>
    <Form.Group controlId="formBasicName">
      <Form.Label>Last name</Form.Label>
      <Form.Control name="last_name" type="name" placeholder="Last name"  required={true}/>
    </Form.Group>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control name = "email" type="email" placeholder="Enter email e.g. yourname@usermail.com"  required={true}/>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control name = "password" type="password" placeholder="Enter password"  required={true}/>
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password Confirmation</Form.Label>
      <Form.Control name = "password" type="password" placeholder="Enter password again"  required={true}/>
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  
  );
}