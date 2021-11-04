import React from "react";
import tuff_logo from '../img/tuff_logo.jpg'
export class Welcome extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      return (
        <main className="Welcome">
          <h1 className="grabber">
            Tuff City Jitsu Club
          </h1>
          <h1 className="grabber">
            Learn self defence and make some new friends
          </h1>
          <span className="clubLogo">
            {/* There is a full stop/period/bulletpoint next to the image there, how to remove it? */}
          <a href='/profiles'><img src={tuff_logo} alt="clublogo" /></a>
          </span>
        </main>
      );
    }
  }