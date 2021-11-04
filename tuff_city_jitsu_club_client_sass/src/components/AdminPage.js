// import React from 'react';
// import { Form } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';


// // Need admin/authentication working to have this functional
// // Page of forms to modify user attributes e.g. belt grades
// // Work in progress so currently commented out


// function AdminPage(props) {
//     function handleSubmit(event) {
//         event.preventDefault();
//         const { currentTarget } = event;
//         const formData = new FormData(currentTarget);

//         props.onSubmit({
//             syllabus: formData.get("country").toLowerCase(),
//             belt: formData.get("belt"),
//             summary: formData.get("summary"),
//             category: formData.get("category"),
//             sub_category: formData.get("sub_category"),
//             // videos: formData.get("videos"), This is an ID so need a different way to share e.g. YouTube URLs?
//             is_different: formData.get("is_different") ==="No"?false:true,
//             difference_content: formData.get("difference_content")
//         });

        

//         currentTarget.reset();
        
        
//     }
//     return (
//         <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formBasicUser">
//         <Form.Label id="top-label">Edit user attributes</Form.Label>
//         <Form.Label>User's name</Form.Label>
//         <Form.Control name = "user" type="user" required={true}/>
//         </Form.Group>
//         <Form.Group controlId="formBasicGrade">
//             <Form.Label>Change their grade</Form.Label>
//             <Form.Control className="color-belt" name = "belt" type="belt" as="select" defaultValue="Yellow">
//                 <option className="gradecoloroption" style={{backgroundColor:"yellow"}}>Yellow </option>
//                 <option className="gradecoloroption" style={{backgroundColor:"orange"}} >Orange</option>
//                 <option className="gradecoloroption" style={{backgroundColor:"green"}}>Green</option>
//                 <option className="gradecoloroption" style={{backgroundColor:"purple"}}>Purple</option>
//                 <option className="gradecoloroption" style={{backgroundColor:"#add8e6", color:"black"}}>Light Blue</option>
//                 <option className="gradecoloroption" style={{backgroundColor:"#00008b"}}>Dark Blue</option>
//                 <option className="gradecoloroption" style={{backgroundColor:"#b5651d"}}>Brown</option>
//             </Form.Control>
//         </Form.Group>
//         <Form.Group controlId="formBasicGrade">
//             <Form.Label>Change their instructor qualification</Form.Label>
//             <Form.Control className="instructor-qualification" name = "ins-qual" type="ins-qual" as="select" defaultValue="Assistant Instructor">
//                 <option className="instructoroption">Assistant Instructor </option>
//                 <option className="instructoroption">Instructor </option>
//                 <option className="instructoroption">Club Instructor </option>
//             </Form.Control>
//         </Form.Group>
//         {/* Note: italicise options */}
//         <Form.Group controlId="formBasicDues">
//             <Form.Label>Are their dues paid?</Form.Label>
//             <Form.Control name = "duespaid" type="duespaid" as="select" defaultValue="No">
//                 <option>No</option>
//                 <option>Yes</option>
//             </Form.Control>
//         </Form.Group>
//         <Form.Group controlId="formBasicGi">
//             <Form.Label>Do they have a gi?</Form.Label>
//             <Form.Control name = "gi" type="gi" as="select" defaultValue="No">
//                 <option>No</option>
//                 <option>Yes</option>
//             </Form.Control>
//         </Form.Group>
//         <Form.Group controlId="formBasicFirstAid">
//             <Form.Label>Do they know first aid?</Form.Label>
//             <Form.Control name = "firstaid" type="firstaid" as="select" defaultValue="No">
//                 <option>No</option>
//                 <option>Yes</option>
//             </Form.Control>
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     );
// }

// export default AdminPage;