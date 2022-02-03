import React from "react";
import { User } from "../requests";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import "../App.scss";

export default AdminForm;
function AdminForm(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    props.onSubmit({
      dues_paid: formData.get("dues_paid"),
      owns_gi: formData.get("owns_gi"),
      has_first_aid_qualification: formData.get("has_first_aid_qualification"),
      first_aid_achievement_date: formData.get("first_aid_achievement_date"),
      first_aid_expiry_date: formData.get("first_aid_expiry_date"),
      belt: formData.get("belt"),
      instructor_qualification: formData.get("instructor_qualification"),
      instructor_qualification_achievement_date: formData.get(
        "instructor_qualification_achievement_date"
      ),
    });
    currentTarget.reset();
  }
  const { errors } = props;

  return (
    <Form onSubmit={handleSubmit}>
      {/* {errors.length > 0 ? (
        <div className="ui negative message FormErrors">
          <Alert variant="danger">
            <div className="header">Access Denied</div>
            <p>{errors.map((err) => err.message).join(",")}</p>
          </Alert>
        </div>
      ) : null} */}

      <Form.Group controlId="formBasicAdmin">
        <Form.Label id="top-label">Update user information regarding grade, qualifications etc</Form.Label>
        <br />
        <br />
        <Form.Label name="user-choice">
          Which user do you wish to update?
        </Form.Label>
        <Form.Control
          name="user-name"
          type="user-name"
          as="select"
          defaultValue="Please select"
        >
          {/* <option id={1}>David </option> */}
          {/* <option type="select" onChange={this.onDropdownSelected} label="Please Select">
              {this.createSelectItems()}
          </option> */}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicGi">
        <Form.Label>Do they have a gi?</Form.Label>
        <Form.Control
          className="gi"
          type="gi"
          as="select"
          required={true}
        //   onChange={props.changeSelectColorHandler}
        >
                <option value={false}>Please select </option>
                <option value={false}>No </option>
                <option value={false}>No (but we've ordered one for them) </option>
                <option value={true}>Yes </option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicFirstAid">
        <Form.Label>Are they first aid qualified?</Form.Label>
        <Form.Control
          className="first-aid"
          type="first-aid"
          as="select"
          required={true}
        //   onChange={props.changeSelectColorHandler}
        >
                <option value={false}>Please select </option>
                <option value={false}>No </option>
                <option value={false}>Yes, but they need to renew it </option>
                <option value={true}>Yes, it's recent and active </option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}