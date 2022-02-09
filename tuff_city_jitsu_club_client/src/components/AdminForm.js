import React from "react";
import { User } from "../requests";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Datetime from 'react-datetime';
import "../App.scss";


export default AdminForm;
function AdminForm(props) {
  console.log("These are the props for the admin form", props);

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

  console.log("This is what we're trying to use for the menu", props.createSelectItems)
  // console.log("These are the belt grades", this.state.belt_grades);
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
          <option type="select" onChange={props.onDropdownSelected} label="Please Select">
          </option>
          {props.createSelectItems}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicGrade">
        <Form.Label>What is their Jitsu grade?</Form.Label>
        <Form.Control
          className="color-belt"
          name="belt"
          type="belt"
          as="select"
          value={props.users}
          onChange={props.changeSelectColorHandler}
        >
                    <option
            className="gradecoloroption"
            style={{ backgroundColor: "white" }}
            value={8}
          >
            White{" "}
          </option>
          <option
            className="gradecoloroption"
            style={{ backgroundColor: "yellow" }}
            value={7}
          >
            Yellow{" "}
          </option>
          <option
            className="gradecoloroption"
            style={{ backgroundColor: "orange" }}
            value={6}
          >
            Orange
          </option>
          <option
            className="gradecoloroption"
            style={{ backgroundColor: "green" }}
            value={5}
          >
            Green
          </option>
          <option
            className="gradecoloroption"
            style={{ backgroundColor: "purple" }}
            value={4}
          >
            Purple
          </option>
          <option
            className="gradecoloroption"
            style={{ backgroundColor: "#add8e6", color: "black" }}
            value={3}
          >
            Light Blue
          </option>
          <option
            className="gradecoloroption"
            style={{ backgroundColor: "#00008b" }}
            value={2}
          >
            Dark Blue{" "}
          </option>
          <option
            className="gradecoloroption"
            style={{ backgroundColor: "#b5651d" }}
            value={1}
          >
            Brown
          </option>
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
                <option value={false}>Not yet </option>
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
      <Form.Group controlId="formBasicFirstAidDate">
        <Form.Label>If so, when did they achieve the first aid qualification?</Form.Label>
        {/* <Form.Control
          className="first-aid-date"
          type="first-aid-date"
          // as="select"
          // required={true}
        //   onChange={props.changeSelectColorHandler}
        > */}
          <Datetime
          required={true}
          className="qualification-date"
          />


        {/* </Form.Control> */}
      </Form.Group>
      <Form.Group controlId="formBasicInstructorQualification">
        <Form.Label>Do they have an instructor qualification?</Form.Label>
        <Form.Control
          className="instructor-qualification"
          type="instructor-qualification"
          as="select"
          required={true}
        //   onChange={props.changeSelectColorHandler}
        >
                <option>Please select </option>
                <option value={0}>No qualifications </option>
                <option value={1}>Assistant Instructor </option>
                <option value={2}>Instructor </option>
                <option value={2}>Club Instructor </option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicInstructorQualification">
        <Form.Label>If so, when did they achieve the most recent instructor qualification?</Form.Label>
        {/* <Form.Control
          className="first-aid-date"
          type="first-aid-date"
          // as="select"
          // required={true}
        //   onChange={props.changeSelectColorHandler}
        > */}
          <Datetime
          className="qualification-date"
          required={true}
          />
        {/* </Form.Control> */}
      </Form.Group> 
      <Button variant="primary" type="submit">
        Update
      </Button>     
    </Form>
  );
}