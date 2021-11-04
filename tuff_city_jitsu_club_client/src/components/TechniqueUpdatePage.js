import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Technique, Syllabus, Belt, TechniqueType } from "../requests";
import UpdateTechniqueForm from "./UpdateTechniqueForm";

export default class TechniqueUpdatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technique: {
        summary: "",
        videos: {
          canadianUrl: "",
          britishUrl: "",
        },
        technique_type_id: 0,
      },
      technique_type: [],
      belt: [],
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const {
      videos,
      setVideos,
      syllabus,
      belt,
      summary,
      category,
      sub_category,
      is_different,
      difference_content,
    } = this.state;
    Technique.details(this.props.match.params.id)
      .then((technique) => {
        this.setState({
          technique: technique,
          isLoading: false,
        });
        return technique;
      })
      .then((technique) => TechniqueType.find(technique.technique_type_id))
      .then((technique_type) =>
        this.setState({
          technique_type: technique_type,
          isLoading: false,
          error: false,
        })
      );
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updatePostRequest = (event) => {
    console.log(event);
    Technique.update(this.state.technique.id, event).then((technique) => {
      console.log(technique);
      if (Technique.errors) {
        this.setState({ errors: technique.errors });
      } else {
        this.props.history.push(`/syllabus`);
      }
    });
      console.log(event);
      fetch(`/api/v1/techniques/${this.state.technique.id}`, {
        method: 'PATCH',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        alert('Post updated successfully');
        if (typeof window !== 'undefined') {
          window.location.href = `/techniques/${this.state.technique.id}`;
     }
      });
  };

  render() {
    return (
      <main>
        <div className="central">
          <h1>EDIT A TECHNIQUE</h1>
        </div>
        <br />

        <UpdateTechniqueForm
          technique={this.state.technique}
          technique_type={this.state.technique_type}
          key={this.state.id}
          onSubmit={this.updatePostRequest}
          onCancel={this.props.handleCancelClick}
          errors={this.state.errors}
        />
      </main>
    );
  }
}
