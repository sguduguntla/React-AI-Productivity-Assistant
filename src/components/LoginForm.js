import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Input, Form, FormGroup } from 'reactstrap';
import {connect} from 'react-redux';
import * as actions from '../actions';


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

    }

    loginUser() {
        const { email, password } = this.state;
        this.props.history.push("/dashboard");

        this.props.loginUser({ email, password }, () => {
            this.props.history.push("/dashboard");
        });
    }

    render() {
        return (
            <div>
                <Form>
                  <FormGroup>
                      <Input placeholder="user@example.com" type="email" onChange={e => this.setState({ email: e.target.value})} value={this.state.email} />
                  </FormGroup>
                  <FormGroup>
                      <Input placeholder="Password" type="password" onChange={e => this.setState({ password: e.target.value})} value={this.state.password} />
                  </FormGroup>
                </Form>
                <br/>
                <p className="lead text-danger">
                {this.props.error}
                </p>
                <Button onClick={this.loginUser.bind(this)} style={{ width: "30%", margin: "0 auto" }} color="primary">Log In</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.auth.user, error: state.auth.error, loading: state.auth.loading};
};

export default withRouter(connect(mapStateToProps, actions)(LoginForm));
