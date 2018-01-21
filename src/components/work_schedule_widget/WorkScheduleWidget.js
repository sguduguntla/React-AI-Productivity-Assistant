import React, { Component } from 'react';
import { Button, Input, Form, FormGroup, Label, Card, CardText, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';

class WorkScheduleWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sleepTime: "",
            hoursOfSleep: 0,
            startTime: "",
            endTime: "",
            modal: false
        };

        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        
    }

    createSchedule() {
        
       
    }

    render() {
        return (
            <Row className="vertical-center">
                <Col md={{ size: 6, offset: 3 }}>
                    <Card className="widget">
                        <CardBody>
                          <CardTitle>Work Schedule</CardTitle>
                            <FormGroup>
                                <Input className="todoInput" placeholder="New Todo" onChange={e => this.setState({...this.state, todoInput: e.target.value})} value={this.state.todoInput} type="text" />
                            </FormGroup>
                         <Button color="primary" onClick={this.toggle}>Create Schedule</Button>
                         <Modal isOpen={this.state.modal} toggle={this.toggle} className="scheduleModal">
                            <ModalHeader toggle={this.toggle}>Create Schedule</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Input className="todoInput" placeholder="Sleep Time (i.e. 10:00 PM)" onChange={e => this.setState({...this.state, sleepTime: e.target.value})} value={this.state.sleepTime} type="time" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input className="todoInput" placeholder="# of hours of sleep" onChange={e => this.setState({...this.state, hoursOfSleep: e.target.value})} value={this.state.hoursOfSleep} type="number" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input className="todoInput" placeholder="Start Time (i.e. 3:15 PM)" onChange={e => this.setState({...this.state, startTime: e.target.value})} value={this.state.startTime} type="time" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input className="todoInput" placeholder="End Time (i.e. 8:00 PM)" onChange={e => this.setState({...this.state, endTime: e.target.value})} value={this.state.endTime} type="time" />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.createSchedule.bind(this)}>Create Schedule</Button>{' '}
                                <Button color="danger" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default connect(null, actions)(WorkScheduleWidget);
