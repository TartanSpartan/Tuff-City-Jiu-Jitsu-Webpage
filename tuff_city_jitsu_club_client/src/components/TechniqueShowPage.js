// Show an individual technique here, including it's video, and allow for an edit function
// Work in progress

import { Nav } from "react-bootstrap";
import React, { Component, Link } from "react";
import { Technique, User, Belt, Video, TechniqueType } from "../requests";
import { getUser } from "./AuthRoute.js";
import App from "./App.js";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "../App.scss";

function urlHandler(url) {
  console.log("This is the url", url);
  // This function is to parse YouTube URLs to be easy to embed (but be advised, not all URLs are set to permit this) and hence be compatible to show off in this page
  let watch = "watch?v=";
  let playlist = "&list="
  let embed = "embed/";
  let shortenedUrl = "https://youtu.be/";
  let extendedUrl = "https://www.youtube.com/embed/";
  let identifier = ""; // This is the unique identifying part of the URL, at the end of it
  let embeddedUrl = "";
  let startCheck = "?start=";
  let endCheck = "&end="
  let timeData = ""; // If time data is in the URL, do not strip it along with the rest of the extraneous parts
  // case https://www.youtube.com/watch?v=7wUL_tSqdP0&list=PLr0RY5UNadk0RCRKdju3nfohyhl_DaYjK&index=4?start=2&end=10
  if (url.includes(watch) === true) {
    // This condition is to instruct URLs with "watch" as a substring to use "embed" instead
    if (url.includes(playlist) === true){
      identifier = url.substring(url.indexOf("=") + 1, url.indexOf("&"));
      if ((url.includes(startCheck)) && (url.includes(endCheck))) {
        timeData = url.substring(url.lastIndexOf("?"), url.lastIndexOf(url.charAt(url.length-1)));
        console.log("Last character is", url.charAt(url.length-1))
        console.log("timeData is", timeData);
        embeddedUrl = extendedUrl.concat(identifier.concat(timeData));
      } else {
      embeddedUrl = extendedUrl.concat(identifier)}
    } else {
      embeddedUrl = url.replace(watch, embed);
    }
    return embeddedUrl;
  } else if (url.includes(shortenedUrl)) {
    // This condition grows a short "sharable" URL into an appropriate one for this purpose
    identifier = url.replace(shortenedUrl, "");
    embeddedUrl = extendedUrl.concat(identifier);
    return embeddedUrl;
  } else {
    // In this default case then the URL already works to be embedded and no changes are required
    return url;
  }
}

console.log("Do playlist urls work", urlHandler("https://www.youtube.com/watch?v=7wUL_tSqdP0&list=PLr0RY5UNadk0RCRKdju3nfohyhl_DaYjK&index=4?start=2&end=10"))

function textColour(integer) {
  let color = "";
  if (integer === 2 || integer === 4) {
    color = "white"; // This makes the dark blue's or purple's header text display better
    return color;
  } else {
    color = "black";
    return color;
  }
}

class TechniqueShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      technique: {},
      technique_type: {},
      belt: {},
      video: [],
      currentUser: null,
      isAdmin: false,
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    Technique.one(this.props.match.params.id)
      .then((technique) =>
        Promise.all([
          technique,
          TechniqueType.find(technique.technique_type_id),
          Belt.find(technique.belt_id),
          Video.find(technique.id),
        ])
      )

      .then(([technique, technique_type, belt, video]) => {
        this.setState({
          isLoading: false,
          technique: technique,
          technique_type: technique_type,
          belt: belt,
          video: video,
        });
        return technique_type;
      })
      .then((response) => {
        console.log("This is the response", response);
        console.log("This is the user", getUser);
      });

    // The following handler probably isn't required so can remove the commented block

    // Syllabus.one(2).then(syllabus => { // This is hardcoded for Canada in this version of the database, fine as it is the only syllabus we are showing
    //     console.log(syllabus)
    //     this.setState({
    //     technique_type: syllabus.technique_types,
    //     isLoading: false
    //     });
    // });
    // console.log(
    //   "Does the videourls array have a length?",
    //   this.state.technique
    // );
    // console.log(
    //   "Does it actually?",
    //   this.state.technique && this.state.technique.videourls?.length
    // );

    // Likewise this block can probably be removed
    //   Video.find(2).then(video => {
    //     this.setState({
    //       video: video,
    //     });
    //     console.log("This is the video", video)
    //     console.log("This is the props", this.props.match)
    // });
  }

  deleteTechnique(id) {
    Technique.destroy(id).then((data) => {
      if (data.status === 200) {
        this.props.history.push("/syllabus");
      } else {
        this.setState((state) => {
          return {
            error: true,
          };
        });
      }
    });
  }

  // Edit the following codeblock for updating a technique; never really did this in CodeCore

  // Modify this block to delete comments, if and only if comments are a feature to be implemented; discuss with David

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
    const { isLoading } = this.state;
    const currentUser = this.props.user;
    const isAdmin = this.props.user.is_admin;
    if (isLoading) {
      return <div />;
    }
    
    console.log("This is the state", this.state);
    // console.log("Do we have access to the technique?", this.state.technique);
    // console.log("Do we have access to the technique type?", this.state.technique_type);

    if (!this.state.video || this.state.video.length === 0) {
      return <div></div>;
    }

    const returnBeltBar = () => {
      // const belt.id = this.state.belt.id
      if (this.state.belt.id === 3) {
        return (
          <>
            <option
              className="gradeColor"
              style={{
                backgroundColor: this.state.belt.colour.replace(/ +/g, ""),
                color: textColour(this.state.belt.id),
                pointerEvents: "none",
              }}
            >
              3rd kyu (Light Blue){" "}
            </option>
          </>
        );
      } else if (this.state.belt.id === 2) {
        // Special case for dark blue belt with "nd" as a suffix
        return (
          <>
            <option
              className="gradeColor"
              style={{
                backgroundColor: this.state.belt.colour.replace(/ +/g, ""),
                color: textColour(this.state.belt.id),
                pointerEvents: "none",
              }}
            >
              2nd kyu (Dark Blue){" "}
            </option>
          </>
        );
      } else if (this.state.belt.id === 1) {
        // Special case for brown belt with "st" as a suffix
        return (
          <>
            <option
              className="gradeColor"
              style={{
                backgroundColor: this.state.belt.colour.replace(/ +/g, ""),
                color: textColour(this.state.belt.id),
                pointerEvents: "none",
              }}
            >
              {this.state.belt.id +
                "st kyu (" +
                this.state.belt.colour.charAt(0).toUpperCase() +
                this.state.belt.colour.slice(1) +
                ")"}{" "}
            </option>
          </>
        );
      } else {
        // Default case for all other grades with "th" as a suffix
        return (
          <>
            <option
              className="gradeColor"
              style={{
                backgroundColor: this.state.belt.colour.replace(/ +/g, ""),
                color: textColour(this.state.belt.id),
                pointerEvents: "none",
              }}
            >
              {this.state.belt.id +
                "th kyu (" +
                this.state.belt.colour.charAt(0).toUpperCase() +
                this.state.belt.colour.slice(1) +
                ")"}{" "}
            </option>
          </>
        );
      }
    };
    // const currentUser = this.props.currentUser;
    // const renderVideo = this.state.video[0]["canadian_version"];

    // asyncHandler(renderVideo);
    // console.log("This is the video", renderVideo);
    // console.log("This is the state's video", this.state.video);

    return (
      <main className="TechniqueShowPage">
        <br />
        <div className="central">
          <h2 className="techniqueTitle">TECHNIQUE</h2>
        </div>
        <br />
        <div
          className="ui list"
          style={{
            listStyle: "none",
            paddingLeft: 0,
          }}
        >
          {returnBeltBar()}
          <br />

          <div className="techniqueType">
            <text className="category" style={{ fontStyle: "italic" }}>
              {this.state.technique_type.category}
            </text>
            <br />
            <text className="subCategory">{this.state.technique.summary}</text>
          </div>

          <br />
          <br />
          {this.state.video?.map((video) => {
            return (
              <>
                <div class="container-fluid">
                  <div className="wideView" class="row wideView">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div class="row">
                        <div
                          className="iframeAndCaption"
                          class="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                        >
                          {/* test */}
                          <iframe
                            className="iframe"
                            src={
                              video.canadian_version
                                ? urlHandler(video.canadian_version)
                                : ""
                            }
                            height="200rem"
                            width="100%"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="video"
                          />

                          <div className="caTitle">
                            {video.canadian_version ? "Canadian Version" : ""}
                          </div>
                        </div>
                        {/* <div class="w-100"></div> */}
                        {isAdmin ? (
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                          <iframe
                            className="iframe"
                            src={
                              video.uk_version
                                ? urlHandler(video.uk_version)
                                : ""
                            }
                            height="200rem"
                            width="100%"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="video"
                          />
                          <div className="ukTitle">
                            {video.uk_version ? "British Version" : ""}
                          </div>
                        </div>) : (<></>)
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />

                <br />
              </>
            );
          })}

          <br />

          {/*{this.state.technique.videos_id}*/}
          <br />
          {isAdmin ? (
            <>
          {this.state.technique.is_different ? (
            <>
              {
                <text style={{ fontWeight: "bold" }}>
                  What's different to the UK syllabus?
                </text>
              }
              <br />
              {this.state.technique.difference_content}
              <br />
              <br />
            </>
          ) : (
            ""
          )}

              {this.state.technique?.created_at ? (
                <>
                  <p>
                    Posted on{" "}
                    {moment(this.state.technique.created_at).format(
                      "MMM Do, YYYY"
                    )}
                  </p>

                  <Button
                    variant="success"
                    key={this.state.technique.id}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    href={`/techniques/${this.state.technique.id}/edit`}
                  >
                    Edit
                  </Button>
                  <br />
                  <br />

                  {/* Delete button currently isn't working- fix! */}
                  <Button
                    variant="danger"
                    type="danger"
                    onClick={(id) =>
                      this.deleteTechnique(this.state.technique.id)
                    }
                  >
                    Delete
                  </Button>
                  {this.state.error ? <p>Cannot delete technique</p> : <></>}
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <></>
          )}
          {/* </> */}
        </div>
      </main>
    );
  }

  // If comments are a thing to be implemented, this block may be a useful guide
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
