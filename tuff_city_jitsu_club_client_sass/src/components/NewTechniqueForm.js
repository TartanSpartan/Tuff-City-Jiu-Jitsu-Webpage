import React, {useState} from "react";
// import FormErrors from "./FormErrors";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../App.scss";

// NOTE! Guard against using technique types for entry which will never be visible by removing them from the form, likewise for update form
function NewTechniqueForm(props) {
    const [videos, setVideos] = useState([{canadianUrl: "", britishUrl: ""}]);
    let truncatedVideos = JSON.stringify(videos).split(":").join(" : ").split(",").join(" , ").slice(2, -2);
    // Try to make these videos display on new lines for e.g. half width page, and correctly output for multiple entries
        
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...videos];
      list[index][name] = value;
      setVideos(list);
      console.log("This is the video list", list)
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...videos];
      list.splice(index, 1);
      setVideos(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
      setVideos([...videos, { canadianUrl: "", britishURL: "" }]);
    };

    // function to handle the submission for an event
    function handleSubmit(event) {
        event.preventDefault();
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);

      console.log("Here are the videos to be submitted", videos)
        props.onSubmit({
            syllabus: formData.get("country").toLowerCase(),
            belt: formData.get("belt"),
            summary: formData.get("summary"),
            category: formData.get("category"),
            sub_category: formData.get("sub_category"),
            videos: videos, // This is an ID so need a different way to share e.g. YouTube URLs?
            is_different: formData.get("is_different") ==="No"?false:true,
            difference_content: formData.get("difference_content")
        });

        console.log("######## here's the props", props);

        console.log("Here's the video we're passing in", formData.get("videos"))

        currentTarget.reset();
           
    }
    
    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicSyllabus">
        <Form.Control name = "country" type="country" as="select" defaultValue="Canada">
        <option id={1}>Canada </option> 
        </Form.Control>
        </Form.Group>
        <Form.Label id="top-label">Input new technique</Form.Label>
        <Form.Group controlId="formBasicSummary">
          <Form.Label>Name of the technique</Form.Label>
          <Form.Control name="summary" type="summary" placeholder="E.g. O-goshi"  required={true}/>
        </Form.Group>
        {/* Note: try to italicise options */}
        <Form.Group controlId="formBasicGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Control className="color-belt" name = "belt" type="belt" as="select" defaultValue={7}>
                <option className="gradecoloroption" style={{backgroundColor:"yellow"}} value={7} >Yellow </option>
                <option className="gradecoloroption" style={{backgroundColor:"orange"}} value={6}>Orange</option>
                <option className="gradecoloroption" style={{backgroundColor:"green"}} value={5}>Green</option>
                <option className="gradecoloroption" style={{backgroundColor:"purple"}} value={4}>Purple</option>
                <option className="gradecoloroption" style={{backgroundColor:"#add8e6", color:"black"}} value={3}>Light Blue</option>
                <option className="gradecoloroption" style={{backgroundColor:"#00008b"}} value={2}>Dark Blue </option>
                <option className="gradecoloroption" style={{backgroundColor:"#b5651d"}} value={1}>Brown</option>
            </Form.Control>
        </Form.Group>
        {/* Note: try to italicise options */}
        <Form.Group controlId="formBasicCategory">
            <Form.Label>Category of technique</Form.Label>
            <Form.Control name="category" type="category" as="select" defaultValue="Ukemi (breakfalling)">
                <option>Ukemi (breakfalling) </option>
                <option>Atemi (striking)</option>
                <option>Kansetsu (locks)</option>
                <option>Shime-waza (strangles)</option>
                <option>Ne-waza (groundwork)</option>
                <option>Nage-waza (throwing)</option>
                <option>Nage-no-kata (throwing form)</option>
                <option>Henka-waza (transition techniques)</option>
                <option>Kaeshi-waza (counter techniques)</option>
                <option>Bunkai (application for defence)</option>
                <option>Weapons (striking)</option>
                <option>Miscellaneous</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicSubCategory">
          <Form.Label>Sub Category</Form.Label>
          <Form.Control name = "sub_category" type="sub_category" placeholder="Can be blank if none comes to mind." />
        </Form.Group>
        <Form.Group controlId="formBasicVideos">
        {videos.map((x, i) => {
          return (
            <>
              <Form.Label>Canadian video URL</Form.Label>
              <Form.Control name = "canadianUrl"
              value = {x.canadianUrl}
              type="primary_video"
              placeholder="Try to source this from YouTube if possible."
              onChange={e =>handleInputChange(e, i)}/>
              
              <br />
              <Form.Label>If the UK technique is different, provide the UK video URL if present</Form.Label>
              <Form.Control name = "britishUrl" 
              value = {x.britishUrl}
              type="secondary_video"
              placeholder="Try to source this from YouTube if possible."
              onChange={e =>handleInputChange(e, i)}/>
              <div className="btn-box">
              {videos.length !== 1 && 
              
              <button className="mr10"
              onClick={() => handleRemoveClick(i)}>Remove</button>}
              <br/>
              {videos.length - 1 === i &&         
              <Button onClick={handleAddClick} variant="success" type="add">Add Another Pair Of URLs</Button>}
            </div>
          </>
          );
        })}
        <div style={{ marginTop: 20 }}>{truncatedVideos}</div>

        
          {/* This should be a form which permits multiple URL inputs with a plus button causing new input fields to appear, with an onChange handler, and groups the URLs into an array (print this on the console, and also on the TechniqueShowPage) */}
        </Form.Group>
        <Form.Group controlId="formBasicDifferenceCheck">
          <Form.Label>Is this different from the UK syllabus?</Form.Label>
          <Form.Control name = "is_different" type="is_different" as="select" defaultValue="Maybe it's on a different belt or is done differently in the UK" defaultValue="No">
                <option>No </option>
                <option>Yes </option>
            </Form.Control>        
        </Form.Group>
        <Form.Group controlId="formBasicDifferenceContent">
          <Form.Label>If yes, describe the differences here</Form.Label>
          <Form.Control name = "difference_content" type="difference_content" placeholder="E.g. transitions aren't present for the UK syllabus"/>
        </Form.Group>
        <Form.Group controlId="formBasicSecondaryVideo">
          <Form.Label>If different, provide the UK video URL if present</Form.Label>
          <Form.Control name = "secondary_video" type="secondary_video" placeholder="Try to source this from YouTube if possible."/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
}

export default NewTechniqueForm;