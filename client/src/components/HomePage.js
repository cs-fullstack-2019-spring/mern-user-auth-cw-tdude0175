import React, {Component} from 'react';
import {BrowserRouter as Router , Link , Route} from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import LogOut from "./LogOut";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logInfo: {
                username: null,
                loggedIn: false,
            },
        }
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <Router>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/register"}>Sign Up</Link>
                    <Link to={"/LogIn"}>Log In</Link>
                    <Link to={"/LogOut"}>Log Out</Link>
                    <Route path={"/register"} component={SignUp}/>
                    <Route path={"/LogIn"} component={LogIn}/>
                    <Route path={"/LogOut"} component={LogOut}/>
                </Router>

            </div>
        );
    }
}
