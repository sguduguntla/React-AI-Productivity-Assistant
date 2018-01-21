import React, { Component } from 'react';
import { Button, Input, Form, FormGroup, Label, Card, CardText, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TodoList from './TodoList';
import TodoParser from './TodoParser';
import TodoHeader from './TodoHeader';
import Todo from './Todo';
import ProjectList from './ProjectList';
import _ from 'lodash';

class TodoWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectName: "",
            todoInput: "",
            projects: [],
            modal: false
        };

        this.toggle = this.toggle.bind(this);

    }

    componentWillMount() {
        this.props.fetchProjects();

    }

    componentWillReceiveProps(nextProps) {
        console.log("WOWOW", nextProps.projects);
        this.setState({ projects: nextProps.projects });
    }

    addProject() {
        const { todoInput, projectName } = this.state;
      
        const todoParser = new TodoParser();

        const todo = todoParser.parseTodo(todoInput, projectName);

        this.props.addTodo({ projectName, todo });
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    render() {
        return (
          
                    <div className="todoWidget">
                        <div>
                            <p className="title">PROJECTS</p>
                            <input type="image" onClick={this.toggle} src="./assets/add.svg" className="addProjectButton"/>
                        </div>
                        <p className="subtitle">Automatically manage the stuff you have to do.</p>
                        <ul>
                            <ProjectList projects={this.state.projects} />
                            
                        </ul>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Create New Project</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Input type="text" placeholder="Project Name" onChange={e => this.setState({...this.state, projectName: e.target.value})} />
                                    <Input type="text" placeholder="New Todo" onChange={e => this.setState({...this.state, todoInput: e.target.value})} />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addProject.bind(this)}>Create Project</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                        </Modal>
                    </div>
                   
              
        );
    }
}

const mapStateToProps = state => {

    const projectList = _.map(state.todo.todos, (val, uid) => {
        const list = _.map(val, (val2, uid2) => {
            return { ...val2, uid: uid2 };
        });
        return { ...list, uid };
    });

    console.log("UID", projectList);

    let projects = [];

    if (projectList.length > 0) {
        projects = _.map(projectList, (todos) => {

            const newList = _.filter(todos, todo => {
                console.log("NEWLIST TODO", todo);
                if (!todo.completed) {
                    return todo;
                }
            });
    
            console.log("NEW", newList);
    
            return { ...newList, uid: projectList[0].uid};
               
        });
    }

    console.log("COOL PROJECTS", projects);

    return { user: state.auth.user, projects };
};

export default connect(mapStateToProps, actions)(TodoWidget);
