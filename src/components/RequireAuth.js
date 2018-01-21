import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

export default(ComposedComponent) => {
    class Authentication extends Component {

        componentWillMount() {
            const myAuthClass = this;

            firebase.auth().onAuthStateChanged(function(user) {
                console.log("User", user);
                if (!user) {
                    alert("You must be signed in first!");
                    myAuthClass.props.history.push("/");
                } else {
                    console.log(myAuthClass);
                    myAuthClass.props.authenticateUser({ user }, () => {
                        console.log("User authenticated.");
                    });
                }
            });
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    return withRouter(connect(null, actions)(Authentication));
}
