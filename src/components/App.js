import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import firebase from 'firebase';
import { Container } from 'reactstrap';

import {ipcRenderer as ipc} from 'electron';

class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: "AIzaSyD-wUQCtIdu3UCuSZI0IG8wyLiIvqetn6A",
            authDomain: "ai-productivity-assistant.firebaseapp.com",
            databaseURL: "https://ai-productivity-assistant.firebaseio.com",
            projectId: "ai-productivity-assistant",
            storageBucket: "ai-productivity-assistant.appspot.com",
            messagingSenderId: "412582784739"
        };
    
        firebase.initializeApp(config);
    }
    
    render() {
        return (
            <Container className="app">
                {this.props.children}
            </Container>
        );
    }
}

export default App;
