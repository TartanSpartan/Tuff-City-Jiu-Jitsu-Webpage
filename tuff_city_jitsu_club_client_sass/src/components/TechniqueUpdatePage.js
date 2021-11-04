import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { Technique, Syllabus, Belt, TechniqueType } from "../requests";
import UpdateTechniqueForm from "./UpdateTechniqueForm";


// function UpdateTechnique() {
//   const [summary, setSummary] = useState("")
//   const [technique, setTechnique] = useState("")
//   const [technique_type, setTechniqueType] = useState("")


  // const [videos, setVideos] = useState([{canadianUrl: "", britishUrl: ""}]);
  // let truncatedVideos = JSON.stringify(videos).split(":").join(" : ").split(",").join(" , ").slice(2, -2);
  // Try to make these videos display on new lines for e.g. half width page, and correctly output for multiple entries
   
  // const [] = useState([{canadianUrl: "", britishUrl: ""}]);
      
    // const handleInputChange = (e, index) => {
    //   const { name, value } = e.target;
    //   const list = [...videos];
    //   list[index][name] = value;
    //   setVideos(list);
    // };

    // handle click event of the Remove button
    // const handleRemoveClick = index => {
    //   const list = [...videos];
    //   list.splice(index, 1);
    //   setVideos(list);
    // };

    // // handle click event of the Add button
    // const handleAddClick = () => {
    //   setVideos([...videos, { canadianUrl: "", britishURL: "" }]);
    // };
    // function handleSubmit(event) {
    //   event.preventDefault();
    //   const { currentTarget } = event;
    //   const formData = new FormData(currentTarget);


      // props.onSubmit({
      //     syllabus: formData.get("country").toLowerCase(),
      //     belt: formData.get("belt"),
      //     summary: formData.get("summary"),
      //     category: formData.get("category"),
      //     sub_category: formData.get("sub_category"),
      //     videos: formData.get("videos"), // This is an ID so need a different way to share e.g. YouTube URLs?
      //     is_different: formData.get("is_different") ==="No"?false:true,
      //     difference_content: formData.get("difference_content")
      // });

      // console.log("########", props);

      // currentTarget.reset();
        
    // }



// }


export default class TechniqueUpdatePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      technique: {
        summary:"",
        videos:{
          canadianUrl:"",
          britishUrl:""
        },
        technique_type_id: 0,
      },
      technique_type: [],
      belt : [],
      isLoading: true,
      error: false
    }
  }

  
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const {videos, setVideos, syllabus, belt, summary, category, sub_category, is_different, difference_content} = this.state;


    this.setState({
      isLoading: true
    });

    Technique.details(this.props.match.params.id).then((technique)=> {
      this.setState({
          technique: technique,
          isLoading: false,
      });
  });

    // TechniqueType.find(this.state.technique.technique_type_id).then((result)=> {
    //   console.log("This is the result", result);
    //   this.setState({
    //     technique_type: result,
    //     isLoading: false,
    //     error: false
    //   });
    // });



  }

    handleInputChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    updatePostRequest = (event) => {

      // Technique.create(params).then(technique => {
      //   console.log("$$$$$$$$$", technique)
      //   if (Technique.errors) {
      //     this.setState({ errors: technique.errors });
      //   } else {
      //     this.props.history.push(`/syllabus`);
      //   }
      //   console.log(params);
      // });
      console.log(event);
      Technique.update(this.state.technique.id, event).then(
        (technique) => {
          console.log(technique);

          if (Technique.errors) {
            this.setState({ errors: technique.errors });
          } else {
            this.props.history.push(`/syllabus`);
          }
        }
      )
      
    //   console.log(event);
    //   fetch(`/api/v1/techniques/${this.state.technique.id}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify(event),
    //     headers: { 'Content-Type': 'application/json' },
    //   }).then((response) => {
    //     alert('Post updated successfully');
    //     if (typeof window !== 'undefined') {
    //       window.location.href = `/techniques/${this.state.technique.id}`;
    //  }
    //   });
    };

  render() {
    return(
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
        errors={this.state.errors}
      />
    </main>
    );
  }
  
}