// Show an individual technique here, including it's video, and allow for an edit function
// Work in progress
import { Nav } from 'react-bootstrap'
import React, { Component, Link } from "react";
import { Technique, Syllabus, Belt  } from "../requests";
import moment from "moment";
import Button from "react-bootstrap/Button";


class TechniqueShowPage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        technique: {},
        technique_type: [],
        belt : [],
        isLoading: true,
        error: false
      };
    }


    componentDidMount() {
        Technique.one(this.props.match.params.id).then(technique=> {
            this.setState({
                technique: technique,
                isLoading: false,
                error: false
            });
        });

        Belt.all().then(belt => {
            this.setState({
              belt: belt,
            });
          });

        Syllabus.one(2).then(syllabus => { // This is hardcoded for Canada in this version of the database, fine as it is the only syllabus we are showing
            console.log(syllabus)
            this.setState({
            technique_type: syllabus.technique_types,
            isLoading: false
            });
        });
    }

    deleteTechnique(id) {
      Technique.destroy(id).then(data =>{
        if (data.status === 200){
          this.props.history.push("/syllabus")
        }
        else {
          this.setState((state)=>{
            return{
            error: true
        }})}
      })
        
    }

    // Edit the following codeblock for updating a technique; never really did this in CodeCore

    updateTechnique(id, params) {
      console.log(id);
        // console.log("These are the params", params)
        // console.log("These is the id", id)

        return fetch(`${process.env.REACT_APP_BASE_URL}/techniques/${id}`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        }).then(res => {
          // console.log(res.json());
        });
    }
    // Modify this block to delete comments

    // deleteBid(id) {
    // this.setState({
    //     auction: {
    //     ...this.state.auction,
    //     bids: this.state.auction.bids.filter(a => a.id !== id)
    //     }
    // });
    // }
    // const technique = this.state.technique;
    render() {
        const currentUser = this.props.currentUser;
        return (
            <main className="TechniqueShowPage">
            <br />
            <div className="central">
            <h2>TECHNIQUE</h2>
            </div>
            <br />
                <div
                    className="ui list"
                    style={{
                        listStyle: "none",
                        paddingLeft: 0
                    }}
                    >
                        
                        <>

                        {this.state.belt.map(belt => {
                             if(belt.id === this.state.technique.belt_id) // Here we need to match the main belt.id with the technique.belt_id which has many different values based on which technique it is
                              if(belt.id === 3){ // Special case for light blue belt with "rd" as a suffix
                                return(
                                  <>
                                  <option className="gradecoloroption" style={{backgroundColor:"lightblue", pointerEvents:"none"}}>3rd kyu (Light Blue) </option>
                                  </>
                                )}
                              else if(belt.id === 2){ // Special case for dark blue belt with "nd" as a suffix
                                return(
                                  <>
                                  <option className="gradecoloroption" style={{backgroundColor:"#00008b", color:"white", pointerEvents:"none"}}>2nd kyu (Dark Blue) </option>
                                  </>
                                )}
                              else if(belt.id === 1){ // Special case for brown belt with "st" as a suffix
                                return(
                                  <>
                                  <option className="gradecoloroption" style={{backgroundColor:belt.colour, pointerEvents:"none"}}>{belt.id + "st kyu (" + belt.colour.charAt(0).toUpperCase() + belt.colour.slice(1) + ")"} </option>
                                  </>
                                )}
                              else {
                                  return(
                                    <>
                                    <option className="gradecoloroption" style={{backgroundColor:belt.colour, pointerEvents:"none"}}>{belt.id + "th kyu (" + belt.colour.charAt(0).toUpperCase() + belt.colour.slice(1) + ")"} </option>
                                    </>
                                  )}
                        })}
                        <br />

                         
                        {this.state.technique_type.map(type => {

                        console.log("Testing 1 2 3"); 
                        console.log("LHS " + type.id + "RHS " + this.state.technique.technique_type_id);
                         if(type.id === this.state.technique.technique_type_id){
                         return(
                             <>
                                {<text style={{fontStyle:"italic"}}>{type.category}</text> }
                                <br />
                                {type.sub_category}
                                </>
                           )}
                        })}
                        <br />
                        {this.state.technique.summary}
                        <br />
                        <br />
                        {/* Hardcoded video URL for now */}
                        <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
                        frameBorder='0'
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        title='video'
                         />
                        <br />


                        {/*{this.state.technique.videos_id}*/}
                        <br />
                        {this.state.technique.is_different ? 
                         <>
                             {<text style={{fontWeight:"bold"}}>What's different to the UK syllabus?</text> }
                             <br />
                             {this.state.technique.difference_content}
                             <br />
                             <br />
                         </>
                         
                        : ""

                        }
                        <>
                        { this.state.technique?.created_at? 
                        <>
                             <p>Posted on {moment(this.state.technique.created_at ).format("MMM Do, YYYY")}</p>
                             <Button variant="danger" type="danger" onClick={id => this.deleteTechnique(this.state.technique.id)}>
                             Delete
                           </Button>
                           {this.state.error ? 
                             <p>Cannot delete technique</p>
                              :<></>}
                           <br />
                           <br />
                           <br />
                           </>
                         : ""
                         }
                         </>

                         <Nav.Link key = {this.state.technique.id} style={{ paddingLeft: 0, paddingTop: 0 }} href={`/techniques/${this.state.technique.id}/edit`}>Edit</Nav.Link>
                        
                         {/* <Link to={`/techniques/edit/${this.state.technique.id}`}>
                          Edit
                          <Button variant="info" type="info" onClick={(id) =>
                          // this.updateTechnique(this.props.technique.id, this.props.technique)
                          {  }
                          }>
                             Edit
                           </Button>
                        </Link> */}
                         

                        </>
              </div>
        </main>
    );}
                        

            // <main>
            //     <AuctionDetails {...this.state.auction} />
            
            //     {currentUser ? (
            //         <>
            //             <NewBidForm
            //                 auction={this.state.auction}
            //                 onSubmit={this.createBid}
            //                 errors={this.state.errors}
            //             />
            //         </>
            //     ) : (
            //         <React.Fragment></React.Fragment>
            //     )}
            //     <br />
            //      <p><u>Previous Bids</u> {userIsOwner()}</p>

            //         <BidList bids={bids} onBidDeleteClick={id => this.deleteBid(id)} />
            // </main>

}


export default TechniqueShowPage;