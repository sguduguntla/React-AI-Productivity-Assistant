import React, {Component} from 'react';
import { Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import {connect} from 'react-redux';
import * as actions from '../actions';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

class StartupScreen extends Component {

    constructor(props) {
        super(props);

        this.state = { isSignup: false, cardText: "Don't have an account?", linkText: "Sign Up." };
    }

    renderForm() {
        if (!this.state.isSignup) {
            return <LoginForm />
        } else {
            return <SignUpForm />
        }
    }

    renderSubText() {
        if (!this.state.isSignup) {
            return <CardText className="text-center">Don't have an account? &nbsp;<a href="#" onClick={() => this.setState({isSignup: !this.state.isSignup})}>Sign Up</a></CardText>
        } else {
            return <CardText className="text-center">Already have an account? &nbsp;<a href="#" onClick={() => this.setState({isSignup: !this.state.isSignup})}>Log In</a></CardText>
        }
    }

    render() {
        return (
                <div>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }}>
                            <img className="ai-animation" src="./assets/ai_animation.gif" />
                        </Col>
                    </Row>
                    <Row>
                      <Col md={{ size: 6, offset: 3 }}>
                        <Card className="loginCard" body>
                            <hr className="my-2" />
                            { this.renderForm() }
                            <br/>
                            <br/>
                            { this.renderSubText() }
                        </Card>
                      </Col>
                    </Row>
                </div>
        );
    }
}

export default StartupScreen;
