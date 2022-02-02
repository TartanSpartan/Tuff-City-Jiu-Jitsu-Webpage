import React from 'react';
import { User } from "../requests";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import "../App.scss";

export default AdminForm;
function AdminForm(props){
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
      });
      currentTarget.reset();
    }
}