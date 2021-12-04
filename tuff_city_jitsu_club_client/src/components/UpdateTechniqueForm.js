import React, {useState} from "react";
// import FormErrors from "./FormErrors";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import isLoading from "./TechniqueUpdatePage";
import "../App.scss";

function secondConverter(time) {
    let fullTime = 0;
    /*pseudocode: 
    if start/end time is in min:sec format, parse it into seconds
    i.e. A:BB so time in seconds = A*60 + BB */
    if (time.includes(":")) {
      const timeArray = time.split(":");
      fullTime = (parseInt(timeArray[0] * 60) + parseInt(timeArray[1]));
    } else {
      fullTime = time;
    }
    return fullTime;
  }
  
  // console.log("secondConverter test", secondConverter("5:30"))
  // If this returns 330 then it works great
  
  function urlStartEndizer (url, startTime, endTime) {
    // console.log("This is the url, start time and end time", url, startTime, endTime)
    let outputUrl = "";
  
    let startSubStr = "?start=" + secondConverter(String(startTime));
    let endSubStr = "&end=" + + secondConverter(String(endTime));
    if (url === "") {
      return outputUrl;
    } else {
      outputUrl = url + startSubStr + endSubStr;
      return outputUrl;
    }
  }

  function urlStringGenerator (url) {
    let rootUrl = "";
    let startTime = "";
    let startCheck = "?start=";
    let endTime = "";
    let endCheck = "&end=";
    if ((url.includes(startCheck)) && (url.includes(endCheck))) {
      rootUrl = url.substring(url.indexOf("h"), url.indexOf("?"))
      // console.log("The root URL is", rootUrl)
      startTime = url.substring((url.lastIndexOf('=', url.lastIndexOf('=')-1) + 1), (url.lastIndexOf("&")))
      // console.log("The start time is", startTime)
      endTime = url.substring((url.lastIndexOf("=") + 1), url.lastIndexOf(url.charAt(url.length)))
      // console.log("The end time is", endTime)
      let stringArray = [rootUrl, startTime, endTime];
      return stringArray;
    } else {
      rootUrl = url;
      let stringArray = [rootUrl, "", ""];
      return stringArray;
    }
    
  }
  
  console.log("Test for urlStartEndizer", urlStartEndizer("https://www.youtube.com/watch?v=tLeu22wenlg", 12, 20))
  console.log("Test for urlStringGenerator", urlStringGenerator("https://www.youtube.com/embed/7wUL_tSqdP0?start=20&end=120"))

  // // Use outputUrl for the following one
  // function timeFormBuilder(url){
  //   let urlArray = [];

  // }

  // console.log("Test for timeFormBuilder", timeFormBuilder())

export default UpdateTechniqueForm;
function UpdateTechniqueForm(props){
    
    const [videos, setVideos] = useState([{canadianUrl: "", britishUrl: ""}]);
    let truncatedVideos = JSON.stringify(videos).split(":").join(" : ").split(",").join(" , ").split('l"').join("l ").slice(3, -2);
    let canadianVideo = truncatedVideos.substr(0, truncatedVideos.indexOf(","))
    let britishVideo = truncatedVideos.substr(truncatedVideos.indexOf("b"))

    // console.log("These are the videos", props);

    // console.log("These are the props", props);
    // Try to make these videos display on new lines for e.g. half width page, and correctly output for multiple entries
        
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...videos];
        list[index][name] = value;
        setVideos(list);
        console.log(props.technique)
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
        // console.log("This is e", e.target.value)
        // console.log("These are the belt id props", props.technique.belt_id)
        // this.setState({selectValue:e.target.value});
      }

    // function to handle the submission for an event
    function handleSubmit(event) {
        event.preventDefault();
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);

        
        videos[0]["canadianUrl"] = urlStartEndizer(videos[0]["canadianUrl"], formData.get("canadianStartTime"), formData.get("canadianEndTime"));
        videos[0]["britishUrl"] = urlStartEndizer(videos[0]["britishUrl"], formData.get("britishStartTime"), formData.get("britishEndTime"));

        console.log("Here are the videos to be submitted", videos)
        props.onSubmit({
            syllabus: formData.get("country").toLowerCase(),
            belt: parseInt(formData.get("belt")),
            summary: formData.get("summary"),
            category: formData.get("category"),
            sub_category: formData.get("sub_category"),
            videos: videos,
            is_different: formData.get("is_different") ==="No"?false:true,
            difference_content: formData.get("difference_content")
        });

    //     console.log("######## here's the props", props);

    //      console.log("Here's the video we're passing in", ("canadianUrl" + formData.get("canadianURL"),
    //      "britishUrl" + formData.get("britishUrl")));

        currentTarget.reset();
    }
    const { errors } = props;

    console.log("These are the props", props)

    return (
        // Page loading function isn't working so ask a TA
        // <div> { isLoading ? <p>Loading</p> 
        // : 
        // technique.map(
        <Form onSubmit={handleSubmit}>
                  {errors.length > 0 ? (
            <div className="ui negative message FormErrors">
              <Alert variant="danger">
              <div className="header">Access Denied</div>
              <p>{errors.map(err => err.message).join(",")}</p>
              </Alert>
            </div>
          ) : null}
             
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
            <Form.Control className="color-belt" name="belt" type="belt" as="select" value={props.technique.belt_id} onChange={props.changeSelectColorHandler}>
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
            <Form.Control name = "category" type="category" as="select" value={props.technique_type.category} onChange={props.changeSelectCategoryHandler}>
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
            // console.log("This is the Canadian Video default value", x)
        return (
            <>key={this.state.awayMessage ? 'notLoadedYet' : 'loaded'} 
            <Form.Label>Note: if you just want to show a segment of a video, you can optionally include the start and end time for that segment.</Form.Label>
            {/* Eventually need some sophisticated url-time-duration checking to prevent bad/trolling input! For now just test with sensible inputs */}
            {/* Need to do clever handling for the URLs to be saved in the update fields when this page loads- look into this */}
            <Form.Label>Provide the Canadian video URL (if available)</Form.Label>
            <Form.Control name = "canadianUrl"
            // value = {props.video[0].canadian_version}
            // value = {props.technique}
            value = {x.canadianUrl}
            defaultValue = {props.technique}
            type="primary_video"
            placeHolder={props.technique.videos}
            onChange={e =>handleInputChange(e, i)}/>
            <br />
            <Form.Label>Segment start time in minutes:seconds or just seconds (optional)</Form.Label>
            <Form.Control name = "canadianStartTime"
            value = {x.canadianStartTime}
            type="primary_video_start_time"
            placeholder="E.g. 0:23, or 72s"
            onChange={e =>handleInputChange(e, i)}/>
            
            <br />
            <Form.Label>Segment end time in minutes:seconds or just seconds (optional)</Form.Label>
            <Form.Control name = "canadianEndTime"
            value = {x.canadianEndTime}
            type="primary_video_End_time"
            placeholder="E.g. 2:52, or 210s"
            onChange={e =>handleInputChange(e, i)}/>
            <br />
            <Form.Label>If the UK technique is different, provide the UK video URL (if available)</Form.Label>
            <Form.Control name = "britishUrl" 
            value = {x.britishUrl}
            type="secondary_video"
            placeHolder="Try to source this from YouTube if possible."
            onChange={e =>handleInputChange(e, i)}/>
            
            <br />
            <Form.Label>Segment start time in minutes:seconds or just seconds (optional)</Form.Label>
            <Form.Control name = "britishStartTime"
            value = {x.britishStartTime}
            type="primary_video_start_time"
            placeholder="E.g. 0:31, or 46s"
            onChange={e =>handleInputChange(e, i)}/>
            
            <br />
            <Form.Label>Segment end time in minutes:seconds or just seconds (optional)</Form.Label>
            <Form.Control name = "britishEndTime"
            value = {x.britishEndTime}
            type="primary_video_End_time"
            placeholder="E.g. 7:02, or 307s"
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
        <Form.Control name="is_different" type="is_different" as="select" value={props.technique.is_different} onChange={props.changeSelectDifferentHandler}>
                <option value={0}>No </option>
                <option value={1}>Yes </option>
            </Form.Control>        
        </Form.Group>
        <Form.Group controlId="formBasicDifferenceContent">
        <Form.Label>If yes, describe the differences here</Form.Label>
        <Form.Control name="difference_content" type="difference_content" placeHolder={props.technique.difference_content} defaultValue={props.technique.difference_content}/>
        </Form.Group>
        <Button variant="primary" type="submit"> 
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