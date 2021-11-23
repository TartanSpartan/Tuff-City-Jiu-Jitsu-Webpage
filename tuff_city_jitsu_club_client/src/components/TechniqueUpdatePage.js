import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Technique, Syllabus, Belt, TechniqueType } from "../requests";
import UpdateTechniqueForm from "./UpdateTechniqueForm";
import "../App.scss";

export default class TechniqueUpdatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technique: {
        summary: "",
        is_different: false,
        difference_content: "",

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
        console.log("Is the video inside the technique?", technique)
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

  updateColorBox = (event) => {
    this.setState(state => {
      state.technique.belt_id = event.target.value;
    })
    this.forceUpdate()
  }

  updateCategoryBox = (event) => {
    this.setState(state => {
      state.technique_type.category = event.target.value;
    })
    this.forceUpdate()
  }

  updateDifferentBox = (event) => {
    this.setState(state => {
      state.technique.is_different = event.target.value;
    })
    this.forceUpdate()
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  simpleStringify = (object) => {
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

  // Fix this one to remove fetch request and avoid duplication of work
  updatePostRequest = (data) => {
    // console.log("this is the technique.id", this.state.technique.id)
    // console.log(this.simpleStringify(event));
    // console.log("This is the event", event);
    // console.log("This is the event's current target", event.currentTarget);
    // console.log("This is the event.target", event.target)    
    // const formData = new FormData(event.target)
    // console.log("This is the formData", formData)
    // const formDataObj = Object.fromEntries(formData.entries())
    // console.log("New test", formDataObj)

    Technique.update(this.state.technique.id, data)
    .then((technique) => {
      console.log(technique);
      this.props.history.push(`/syllabus#/`);
      if (technique.errors) {
        this.setState({ errors: technique.errors });
      } else {
        // console.log("This is the history", this.props.history)
        this.props.history.push(`/syllabus`);
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
          video={this.state.video}
          key={this.state.id}
          onSubmit={this.updatePostRequest}
          onCancel={this.props.handleCancelClick}
          errors={this.state.errors}
          changeSelectColorHandler={this.updateColorBox.bind(this)}
          changeSelectCategoryHandler={this.updateCategoryBox.bind(this)}
          changeSelectDifferentHandler={this.updateDifferentBox.bind(this)}

        />
      </main>
    );
  }
}
