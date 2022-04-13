import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";
import AuthRoute from "./AuthRoute";
import { BrowserRouter, Route, Switch, Link, HashRouter } from "react-router-dom";
// import NotFoundPage from "./NotFoundPage";
import SignInPage from "./SignInPage";
import { SignUpPage } from "./SignUpPage";
import { User, Session, Technique } from "../requests";
import { Welcome } from "./Welcome";
// import { SyllabusIndexPage } from "./SyllabusIndexPage";
import { SyllabusShowPage } from "./SyllabusShowPage";
import SyllabusMindmapPage from "./SyllabusMindmapPage";
import TechniqueNewPage from "./TechniqueNewPage";
import TechniqueShowPage from "./TechniqueShowPage";
import { WhatIsJiuJitsu } from "./WhatIsJiuJitsu";
import { WhoAreWe } from "./WhoAreWe";
import TechniqueUpdatePage from "./TechniqueUpdatePage";
// import TechniqueGenerationEngine from "./TechniqueGenerationEngine";
import { AdminPage } from "./AdminPage";
import "react-datetime/css/react-datetime.css";
import '../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { userSlice, setUser } from '../slices/userSlice';
import jwtDecode from 'jwt-decode';
import AuthRote from './AuthRoute';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUser: null,
        loading: true
      };
      this.signIn = this.signIn.bind(this);
    }

    signOut = () => {
        Session.destroy().then(() => {
          this.setState({ currentUser: null });
        });
      };
      
      

      getUser = () =>  {
        User.current()
        .then(data => {
          console.log("This is the current user as data", data)
          if (typeof data.id !== "number") {
            this.setState({ loading: false });
          } else {
            this.props.setUser(data);
            // Try to implement the loading in the store
            this.setState({ loading: false });
          }
          return data;
          // console.log("This is the current user", data)
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
        });
      };

    componentDidMount() {
        this.getUser();
        this.signIn();
    }
    
    signIn(){
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        const payload = jwtDecode(jwt);
        this.setState({user: payload}); # Confirm how to set user here
      }
    }
    
    // isSignedIn(){
    //   return !!this.state.user.id
    // }
    
    render() {
        const { loading } = this.state;
        const { currentUser } = this.props;
        console.log("This is the current user from Redux", currentUser);
        if (loading) {
            return <div />;
        }

        return (
          <>
                <HashRouter>
                <BrowserRouter>
                <div className= "ui container segment">
                    <NavBar currentUser={currentUser} onSignOut={this.signOut}/>
                        <Switch>
                            <Route path="/" exact component={Welcome} />
                            {/* <Route path="/posts" exact component={Blog} /> */}
                            <Route path="/whatisjitsu" exact component={WhatIsJiuJitsu} />
                            <Route path="/profiles" exact component={WhoAreWe} />
                            <Route exact 
                            isAuthenticated={currentUser}
                            path="/techniques/:id/edit"
                            component={TechniqueUpdatePage}
                            />
                           <AuthRoute
                            isAuthenticated={currentUser}
                            path="/admin"
                            component={AdminPage}
                            />
                            {/* <AuthRoute
                            isAuthenticated={currentUser}
                            path="/syllabus"
                            component={SyllabusIndexPage}
                            /> */}
                            
                           <AuthRoute
                            isAuthenticated={currentUser}
                            path="/syllabus"
                            component={SyllabusShowPage}
                            />
                            <AuthRoute
                            isAuthenticated={currentUser}
                            path="/techniques/:id"
                            component={TechniqueShowPage}
                            />
                            <AuthRoute
                            isAuthenticated={currentUser}
                            path="/syllabi/:syllabus_id/mindmap"
                            component={SyllabusMindmapPage} 
                            />
                            {/* <AuthRoute
                            isAuthenticated={currentUser}
                            path="/syllabus/:id"
                            render={routeProps => (
                            <SyllabusShowPage {...routeProps} currentUser={currentUser} />
                            )} */}
                            {/* /> */}
                            
                            
                            {/* Ensure that only admin, and no other users, can see and do actions on this page  */}
                            <AuthRoute
                            isAuthenticated={currentUser}
                            path="/technique/new"
                            component={TechniqueNewPage}
                            />
                            {/* <Route exact 
                            isAuthenticated={currentUser}
                            path="?"
                            component={TechniqueGenerationEngine}
                            /> */}
                            {/* <AuthRoute
                            isAuthenticated={currentUser}
                            path="/videos(???)"
                            component={VideoIndexPage}
                            /> */}
                            {/*
                            <Route
                            path="/events"
                            component={EventsList}    
                            />*/}
                            <Route
                            exact
                            path="/sign_up"
                            render={routeProps => (
                                <SignUpPage {...routeProps} onSignUp={this.getUser} />
                            )}
                            />
                            
                            <Route
                            path="/sign_in"
                            render={routeProps => (
                                <SignInPage {...routeProps} onSignIn={this.getUser} />
                            )}
                            />
                            {/* <Route component={NotFoundPage} /> */}
                        </Switch>
                </div>
            </BrowserRouter>
            </HashRouter>
            <Footer />
                        </>
        );
    }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.user
});

const mapDispatchToProps = { setUser };

export default connect(mapStateToProps, mapDispatchToProps)(App);