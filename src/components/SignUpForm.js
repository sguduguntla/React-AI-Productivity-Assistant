import React, {Component} from 'react';
import { Button, Input, Form, FormGroup } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayName: "",
            email: "",
            password: ""
        }

    }

    signUpUser() {
        const { email, password, displayName } = this.state;

        this.props.createUser({ email, password, displayName }, () => {
            this.props.history.push("/dashboard");
        });
    }

    render() {
        return (
            <div>
                <Form>
                   <FormGroup>
                      <Input placeholder="Display Name" type="text" onChange={e => this.setState({ displayName: e.target.value})} value={this.state.displayName} />
                   </FormGroup>
                  <FormGroup>
                      <Input placeholder="user@example.com" type="email" onChange={e => this.setState({ email: e.target.value})} value={this.state.email} />
                  </FormGroup>
                  <FormGroup>
                      <Input placeholder="Password" type="password" onChange={e => this.setState({ password: e.target.value})} value={this.state.password} />
                  </FormGroup>
                </Form>
                <p className="lead text-danger">
                {this.props.error}
                </p>
                <br/>
                <Button onClick={this.signUpUser.bind(this)} style={{ width: "30%", margin: "0 auto" }} color="primary">Sign Up</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.auth.user, error: state.auth.error, loading: state.auth.loading};
};

export default withRouter(connect(mapStateToProps, actions)(SignUpForm));
