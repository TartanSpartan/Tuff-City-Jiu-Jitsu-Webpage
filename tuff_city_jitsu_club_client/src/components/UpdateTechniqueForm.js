import React, {useState} from "react";
// import FormErrors from "./FormErrors";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import isLoading from "./TechniqueUpdatePage";
import "../App.scss";

// Find out how to override defaults if this means a technique can't have a field written into it


// Add onChange handler to change value for each select-based menu input

export default UpdateTechniqueForm;
function UpdateTechniqueForm(props){
    
    const [videos, setVideos] = useState([{canadianUrl: "", britishUrl: ""}]);
    let truncatedVideos = JSON.stringify(videos).split(":").join(" : ").split(",").join(" , ").split('l"').join("l ").slice(3, -2);
    let canadianVideo = truncatedVideos.substr(0, truncatedVideos.indexOf(","))
    let britishVideo = truncatedVideos.substr(truncatedVideos.indexOf("b"))

    console.log("These are the props", props);
    // Try to make these videos display on new lines for e.g. half width page, and correctly output for multiple entries
        
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...videos];
        list[index][name] = value;
        setVideos(list);
        // console.log("This is the video list", list)
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

    const handleChange = (e) => {
        console.log("This is e", e.target.value)
        console.log("These are the belt id props", props.technique.belt_id)
        // this.setState({selectValue:e.target.value});
      }

    // function to handle the submission for an event
    // function handleSubmit(event) {
    //     console.log(event);
    //     event.preventDefault();
    //     const { currentTarget } = event;
    //     const formData = new FormData(currentTarget);

    //     console.log("Here are the videos to be submitted", videos)
    //     props.onSubmit({
    //         syllabus: formData.get("country").toLowerCase(),
    //         belt: parseInt(formData.get("belt")),
    //         summary: formData.get("summary"),
    //         category: formData.get("category"),
    //         sub_category: formData.get("sub_category"),
            
    //         // Following commented block is probably a candidate for removal- redundant
    //         // videourls: [
    //         //     {
    //         //         "type":"canadianUrl",
    //         //         "url":formData.get("canadianUrl")
    //         //     },
    //         //     {
    //         //         "type":"britishUrl",
    //         //         "url":formData.get("britishUrl")
    //         //     },
    //         // ],
    //         videos: videos,
    //         is_different: formData.get("is_different") ==="No"?false:true,
    //         difference_content: formData.get("difference_content")
    //     });

    //     console.log("######## here's the props", props);

    //     // console.log("Here's the video we're passing in", ("canadianUrl" + formData.get("canadianURL"),
    //     // "britishUrl" + formData.get("britishUrl")));

    //     currentTarget.reset();
    // }

    return (
        // Page loading function isn't working so ask a TA
        // <div> { isLoading ? <p>Loading</p> 
        // : 
        // technique.map(
        <Form onSubmit={props.onSubmit}>
             
        <Form.Group controlId="formBasicSyllabus">
        <Form.Label id="top-label">Edit existing technique</Form.Label>
        <br/>
        <br/>
        <Form.Label name="syllabus">Syllabus associated with the technique</Form.Label>
        <Form.Control name = "country" type="country" as="select" defaultValue="Canada">
        <option id={1}>Canada </option> 
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicSummary">
        <Form.Label>Name of the technique </Form.Label>
        <Form.Control defaultValue={props.technique.summary} placeHolder={props.technique.summary} name="summary" type="text" required={true}/>
        </Form.Group>
        {/* Note: italicise options */}
        <Form.Group controlId="formBasicGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Control className="color-belt" name="belt" type="belt" as="select" value={props.technique.belt_id} defaultValue={props.technique.belt_id} onChange = {props.changeSelectHandler}>
                <option className="gradecoloroption" style={{backgroundColor:"yellow"}} value={7} >Yellow </option>
                <option className="gradecoloroption" style={{backgroundColor:"orange"}} value={6}>Orange</option>
                <option className="gradecoloroption" style={{backgroundColor:"green"}} value={5}>Green</option>
                <option className="gradecoloroption" style={{backgroundColor:"purple"}} value={4}>Purple</option>
                <option className="gradecoloroption" style={{backgroundColor:"#add8e6", color:"black"}} value={3}>Light Blue</option>
                <option className="gradecoloroption" style={{backgroundColor:"#00008b"}} value={2}>Dark Blue </option>
                <option className="gradecoloroption" style={{backgroundColor:"#b5651d"}} value={1}>Brown</option>
            </Form.Control>
        </Form.Group>
        {/* Note: italicise options */}
        <Form.Group controlId="formBasicCategory">
            <Form.Label>Category of technique</Form.Label>
            <Form.Control name = "category" type="category" as="select" defaultValue={props.technique_type.category}>
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
        <Form.Control name = "sub_category" type="sub_category" placeHolder="Can be blank if none comes to mind." defaultValue={props.technique_type.sub_category} />
        </Form.Group>
        <Form.Group controlId="formBasicVideos">
        {videos.map((x, i) => {
            console.log("This is the Canadian Video default value", x)
        return (
            <>
            {/* Need to do clever handling for the URLs to be saved in the update fields when this page loads- look into this */}
            <Form.Label>Provide the Canadian video URL (if available)</Form.Label>
            <Form.Control name = "canadianUrl"
            value = {x.canadianUrl}
            type="primary_video"
            defaultValue={x.canadianUrl}
            placeHolder="Try to source this from YouTube if possible."
            onChange={e =>handleInputChange(e, i)}/>
            
            <br />
            <Form.Label>If the UK technique is different, provide the UK video URL (if available)</Form.Label>
            <Form.Control name = "britishUrl" 
            value = {x.britishUrl}
            type="secondary_video"
            placeHolder="Try to source this from YouTube if possible."
            onChange={e =>handleInputChange(e, i)}/>
            <div className="btn-box">
            {videos.length !== 1 && 
            
            <button className="mr10"
            onClick={() => handleRemoveClick(i)}>Remove</button>}
            <br/>
            {videos.length - 1 === i &&         
            <Button onClick={handleAddClick} variant="success" type="add">
                Add Another Pair Of URLs
            </Button>}
            </div>
        </>
        );
        })}
        <div style={{ marginTop: 20 }}>{canadianVideo}</div>
        <div style={{ marginTop: 20 }}>{britishVideo}</div>

        
        {/* This should be a form which permits multiple URL inputs with a plus button causing new input fields to appear, with an onChange handler, and groups the URLs into an array (print this on the console, and also on the TechniqueShowPage) */}
        </Form.Group>
        <Form.Group controlId="formBasicDifferenceCheck">
        <Form.Label>Is this technique different, or separate, from the UK syllabus?</Form.Label>
        <Form.Control name="is_different" type="is_different" as="select" placeHolder="Please select" defaultValue={props.technique.is_different} value={props.technique.is_different}>
                <option value={0}>No </option>
                <option value={1}>Yes </option>
            </Form.Control>        
        </Form.Group>
        <Form.Group controlId="formBasicDifferenceContent">
        <Form.Label>If yes, describe the differences here</Form.Label>
        <Form.Control name="difference_content" type="difference_content" placeHolder={props.technique.difference_content} defaultValue={props.technique.difference_content}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={props.onSubmit}> 
            Update
        </Button>
        <br/>
        <br/>
        <Button href={`/techniques/${props.technique.id}`} variant="secondary" type="cancel" onClick={props.onCancel}> 
            Cancel
        </Button>
    </Form>
    //     )
    // }</div>
    );
}