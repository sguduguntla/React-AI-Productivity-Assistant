import React, { Component } from "react";
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Button, Input, Form, FormGroup, Label, Card, CardText, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TodoParser from './TodoParser';

class TodoHeader extends Component {

	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			todoInput: ""
		}

		this.toggle = this.toggle.bind(this);
	}

	addTodo() {
		const projectName = this.props.headerText;

		console.log("HEADER:" + projectName);
      
        const todoParser = new TodoParser();

        const todo = todoParser.parseTodo(this.state.todoInput, projectName);

        this.props.addTodo({ projectName, todo });
		
	}

	toggle() {
        this.setState({
          modal: !this.state.modal
        });
	}
	
	render() {
		return (
			<div>
				 <li className="todoHeader">
					<div className="projectText">{this.props.headerText}</div>
					<input type="image" onClick={this.toggle} src="./assets/add.svg" className="addTodoButton"/>
           		 </li>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Create New Todo for {this.props.headerText}</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Input type="text" placeholder="New Todo" onChange={e => this.setState({...this.state, todoInput: e.target.value})} />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addTodo.bind(this)}>Create Todo</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                </Modal>
			</div>
           
        );
		
	}
}

export default connect(null, actions)(TodoHeader);