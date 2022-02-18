import React, { useEffect, useState } from "react";
import { User } from "../requests";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Datetime from 'react-datetime';
import moment from "moment";
import "../App.scss";

export default AdminForm;

function howRecentlyAchieved(achievementDate, expiryDate){
  let results = [];
  let maxYears = 3;
  let recentAchievement = true;
  let achievementDay = new Date(achievementDate);
  let expiryDay = new Date(expiryDate);
  let difference = (expiryDay.getTime() - achievementDay.getTime())/(24 * 60 * 60 * 365 * 1000); // Convert to years by dividing by 24 hours, 3600 seconds in an hour, 1000ms in a 
  if (difference < maxYears) {
    console.log("No need to refresh yet!");
    results = [recentAchievement, difference]
    return results;
  } else if (achievementDate === null ) {
    console.log("They haven't achieved it yet!")
    recentAchievement = false;
    results = [recentAchievement, 0] // In all likelihood this condition won't be met by the render due to other checks but if it does, this is "forced" code which can be debugged if necessary
  } else {
    console.log("Time to refresh!");
    recentAchievement = false;
    results = [recentAchievement, difference]
    return results;
  }
}

// console.log("Test of howRecentlyAchieved", howRecentlyAchieved("2020-11-22T00:00:00.000Z", "2023-12-22T00:00:00.000Z"));

function AdminForm(props) {
  console.log("These are the props for the admin form", props);

  const [isUserSelected, setUserSelection] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  console.log("This is userInformation", userInformation && userInformation.instructor_qualification);

  function twoCalls(event) {
    
    // console.log(event);

    // console.log("user informations", userInformation);


    // let userValue = Number(props.onDropdownSelected(event, users)) + 1;
    // console.log(userValue);
    // console.log(event.target[userValue].getAttribute('data-set'));

    setUserInformation(props.onDropdownSelected(event, props.users));
    setUserSelection(true);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    // props.onSubmit({
    //   dues_paid: formData.get("dues_paid"),
    //   owns_gi: formData.get("owns_gi"),
    //   has_first_aid_qualification: formData.get("has_first_aid_qualification"),
    //   first_aid_achievement_date: formData.get("first_aid_achievement_date"),
    //   first_aid_expiry_date: formData.get("first_aid_expiry_date"),
    //   belt: formData.get("belt"),
    //   instructor_qualification: formData.get("instructor_qualification"),
    //   instructor_qualification_achievement_date: formData.get(
    //     "instructor_qualification_achievement_date"
    //   ),
    // });

    const data = {
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
    }
    console.log("This is handleSubmit", data)
    currentTarget.reset();
  }
  const { errors } = props;

  console.log("This is what we're trying to use for the menu", props.createSelectItems)
  // console.log("These are the belt grades", this.state.belt_grades);
  
  // console.log("This is the achievement date", userInformation != null ? (userInformation.instructor_qualification.achieved_at != null ? userInformation.instructor_qualification.achieved_at : 0) : 0)

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
          name="user"
          type="user-name"
          as="select"
          defaultValue="Please select"
          onChange={twoCalls}
        >
          <option type="select" label="Please Select">
          </option>
          {props.createSelectItems}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicGrade">
        <Form.Label>What is their Jitsu grade?</Form.Label>
        <Form.Control
          className="color-belt"
          name="belt"
          type="select"
          as="select"
          disabled={!isUserSelected}
          value={userInformation != null ? Number(userInformation.belt_grades[0].belt_id) : 0}
          // defaultValue={props.users[i].belt_grades[0].belt_id}
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
          disabled={!isUserSelected}
          className="gi"
          type="gi"
          name="owns_gi"
          as="select"
          required={true}
          value={userInformation != null ? userInformation.owns_gi : 0}

          // defaultValue={props.selectedUser.owns_gi}
          // // defaultValue={props.users[i].owns_gi}
          // onChange={props.changeSelectColorHandler}
        >
                <option value={false}>Please select </option>
                <option value={false}>Not yet </option>
                <option value={true}>Yes </option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicFirstAid">
        <Form.Label>Are they first aid qualified?</Form.Label>
        {/* {console.log("Is this today?", new Date().toLocaleString("en-US").replace(',', '').replace(':00 ', ' '))}
        {console.log("What we'll feed in as the expiry date", (userInformation && userInformation.first_aid_achievement_date))}
        {console.log("What we'll feed into the value check", userInformation && (howRecentlyAchieved(userInformation.first_aid_achievement_date, new Date().toLocaleString("en-US").replace(',', '').replace(':00 ', ' '))))} */}
        <Form.Control
          disabled={!isUserSelected}
          className="first-aid"
          name="has_first_aid_qualification"
          type="first-aid"
          as="select"
          required={true}
          // value={userInformation != null ? (userInformation.has_first_aid_qualification != null ? (howRecentlyAchieved(userInformation.first_aid_achievement_date, new Date().toLocaleString("en-US").replace(',', '').replace(':00 ', ' '))[0] != true ? "Yes, but they need to renew it" : "Yes, it's recent and active" ) : "No") : 0}
          value={isUserSelected ? userInformation.first_aid_achievement_date != null ? true : false : false }
        //(userInformation.first_aid_achievement_date != null ? (howRecentlyAchieved(userInformation.first_aid_achievement_date, new Date().toLocaleString("en-US").replace(',', '').replace(':00 ', ' '))[0]) : 0) : 0 
        //   onChange={props.changeSelectColorHandler}
        >
                <option>Please select </option>
                <option value={false}>No, or they do but they need to renew it</option>
                <option value={true}>Yes, it's recent and active</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicFirstAidDate">
        <Form.Label >If so, when did they achieve the first aid qualification?</Form.Label>
        {/* <Form.Control
          className="first-aid-date"
          type="first-aid-date"
          // as="select"
          // required={true}
        //   onChange={props.changeSelectColorHandler}
        > */}
        {console.log("Testing values for the first aid achievement date", userInformation != null ? (userInformation.first_aid_achievement_date != null ? new Date(userInformation.first_aid_achievement_date).toLocaleString("en-US").replace(',', '').replace(':00 ', ' ') : 0) : 0)}
          {isUserSelected ? 
          <Datetime
            inputProps={{disabled: !isUserSelected}}
            required={true}
            className="qualification-date"
            name="first_aid_achievement_date"
            value={isUserSelected ? userInformation.first_aid_achievement_date != null ? new Date(userInformation.first_aid_achievement_date) : 'Please select a date' : ''}
            // initialValue={isUserSelected ? moment(userInformation.first_aid_achievement_date).utc().format("MM/DD/YYYY") : 'Please select a date'}
            dateFormat="MM/DD/YYYY"
            // initialValue={isUserSelected ? new Date(userInformation.first_aid_achievement_date) : 'Please select a date'}
            // value="11/22/2020 4:00 PM"
            // value={userInformation != null ? userInformation.first_aid_achievement_date != null ? moment(userInformation.first_aid_achievement_date).utc().format('DD MM, YYYY') : 0 : 0}
            // userInformation != null ? (userInformation.first_aid_achievement_date != null ? new Date(userInformation.first_aid_achievement_date) : 0) : 0
            // value={userInformation != null ? (userInformation.first_aid_achievement_date != null ? new Date(userInformation.first_aid_achievement_date).toLocaleString("en-US").replace(',', '').replace(':00 ', ' ') : 0) : 0}
            
            // value={new Date('2020-11-22T00:00:00.000Z').toLocaleDateString()}
            // value={userInformation != null ? moment().toDate(userInformation.first_aid_achievement_date) : 0}
            // For some reason that's returning today's date instead of the one we intend!
            
          // defaultValue={props.users[i].first_aid_achievement_date}

          /> : ""}

        {/* </Form.Control> */}
      </Form.Group>
      <Form.Group controlId="formBasicInstructorQualification">
        <Form.Label>Do they have an instructor qualification?</Form.Label>
        <Form.Control
          disabled={!isUserSelected}
          className="instructor-qualification"
          name="instructor_qualification"
          type="instructor-qualification"
          as="select"
          required={true}
          value={isUserSelected ? userInformation.instructor_qualification != null ? userInformation.instructor_qualification.qualification_id : 1 : 0}
          //(userInformation.instructor_qualification != null ? userInformation.instructor_qualification.qualification_id : 0) : 0
        // defaultValue={props.users[i].instructor_qualifications[0].qualification_id}
        //   onChange={props.changeSelectColorHandler}
        >
                <option>Please select </option>
                <option value={1}>No qualifications </option>
                <option value={2}>Assistant Instructor </option>
                <option value={3}>Instructor </option>
                <option value={4}>Club Instructor </option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicInstructorQualification">
        {/* {isUserSelected != null ? userInformation.instructor_qualification : 0} */}
        <Form.Label>If so, when did they achieve the most recent instructor qualification?</Form.Label>
        {console.log("Testing values for the instructor qualification achievement date", userInformation != null ? (userInformation.instructor_qualification != null ? (userInformation.instructor_qualification.qualification_id !== 1 ? new Date(userInformation && userInformation.instructor_qualification.achieved_at).toLocaleString("en-US").replace(',', '').replace(':00 ', ' ') : "") : 0) : 0)}
          {isUserSelected ? <Datetime
          inputProps={{disabled: !isUserSelected}}
          className="qualification-date"
          required={true}
          name="instructor_qualification_achievement_date"
          dateFormat="MM/DD/YYYY"
          value={isUserSelected ? userInformation.instructor_qualification != null ? userInformation.instructor_qualification.qualification_id != 1 ? new Date(userInformation.instructor_qualification.achieved_at) : 'Please select a date' : 'Please select a date' : 'Please select a date'}
          // initialValue={isUserSelected ? moment(userInformation.instructor_qualification.achieved_at).format("MM/DD/YYYY HH:mm A") : 'Please select a date'}
          // value={userInformation != null ? moment().toDate(userInformation.instructor_qualifications[0].achieved_at) : 0}
          // value={userInformation != null ? new Date(userInformation.first_aid_achievement_date).toLocaleString("en-US").replace(',', '').replace(':00 ', ' ') : 0}

          // Intentionally do not render the "achievement date" if a user has not, in fact, achieved a qualification!
          
          // value={userInformation != null ? (userInformation.instructor_qualification != null ? (userInformation.instructor_qualification.qualification_id !== 1 ? new Date(userInformation && userInformation.instructor_qualification.achieved_at).toLocaleString("en-US").replace(',', '').replace(':00 ', ' ') : "") : 0) : 0}
          // This one is a struggle to populate!

          // defaultValue={props.users[i].instructor_qualifications[0].achieved_at}
          >
            {/* {console.log("Probing userInformation", userInformation && userInformation.instructor_qualifications.achieved_at)} */}
            </Datetime> 
            : ""}
          
        {/* </Form.Control> */}
      </Form.Group> 
      <Button disabled={!isUserSelected} variant="primary" type="submit">
        Update
      </Button>     
    </Form>
  );
}