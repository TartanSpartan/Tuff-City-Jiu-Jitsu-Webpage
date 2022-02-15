// Need admin/authentication working to have this functional
// Page of forms to modify user attributes e.g. belt grades
// Work in progress so currently commented out

import React from "react";
import { User, BeltGrade } from "../requests";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../App.scss";
import AdminForm from "./AdminForm";

// We use this function to create a dynamic drop down list based on, for example, the users!
function createSelectItems(users) {
  console.log("These are the users", users);
  let items = [];
  for (let i = 0; i < users.length; i++) {
    items.push(
      <option key={i} data-set={`${users[i]}`} value={i}>
        {users[i].id + " " + users[i].first_name + " " + users[i].last_name}
      </option>
    );
  }
  console.log("Testing createSelectItems", items);
  console.log("This is the length of items", items.length);
  return items;
}

// Change instructor_qualifications from an array into an object, on the Rails side

// function AdminPage(props) {
export class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      dues_paid: false,
      owns_gi: false,
      has_first_aid_qualification: false,
      first_aid_achievement_date: "",
      first_aid_expiry_date: "",
      belts: [],
    //   belt_grades: [],
      instructor_qualifications: [],
      instructor_qualification_achievement_date: "",
      currentUser: null,
      isAdmin: false,
      createSelectItems: [],
      onDropdownSelected: "",
    };
  }

  componentDidMount() {
    User.all().then((users) => {
      this.setState({
        users: users,
        dues_paid: users.dues_paid,
        owns_gi: users.owns_gi,
        has_first_aid_qualification: users.has_first_aid_qualification,
        first_aid_achievement_date: users.first_aid_achievement_date,
        first_aid_expiry_date: users.first_aid_expiry_date,
        createSelectItems: createSelectItems(users),
        onDropdownSelected: this.onDropdownSelected,
      });
    });
  }

  onDropdownSelected(e, users) {
    console.log("This is the selected user", users[e.target.value]);
    return users[e.target.value];
  }

  deleteUser(id) {
    User.destroy(id).then(() => {
      this.setState({
        users: this.state.users.filter((q) => q.id !== id),
      });
    });
  }

  updatePostRequest = (data) => {
    User.update(this.state.user.id, data).then((user) => {
      console.log(user);
      this.props.history.push(`/admin#/`); // Expect this to refresh the page, test that
      if (user.errors) {
        this.setState({ errors: user.errors });
      } else {
        // console.log("This is the history", this.props.history)
        this.props.history.push(`/admin`);
      }
    });
  };

  render() {
    console.log("state user ", this.state.users);
    return (
      <main>
        <div className="central">
          <h1>USER ADMIN PAGE</h1>
        </div>
        <br />
        {
          <AdminForm
            users={this.state.users}
            errors={this.state.errors}
            key={this.state.id}
            onDropdownSelected={this.onDropdownSelected}
            createSelectItems={this.state.createSelectItems}
          />
        }
      </main>
    );
  }
}