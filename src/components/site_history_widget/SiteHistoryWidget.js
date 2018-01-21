import React, { Component } from 'react';
import { Button, Input, Form, FormGroup, Label, Card, CardText, CardBody, CardTitle, Row, Col, Table } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import moment from 'moment';

class SiteHistoryWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visitedSites: []
        };
    }

    componentWillMount() {
        const date = moment().format('YYYY-MM-DD');
        this.props.fetchVisitedSites({ date });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visitedSites: nextProps.visitedSites });
    }

    renderAllRows() {

        const val = _.map(this.state.visitedSites, site => {
            return this.renderRow(site);
        });

        return val;
    }

    renderRow(site) {
        const displayTime = this.getDisplayTime(site.visitTime);
        
        return (
            <tr key={site.link}>
                <td>{site.percentage}</td>
                <td>{displayTime}</td>
                <td>{site.link}</td>
            </tr>
        );
    }

    getDisplayTime(seconds) {
        var sec_num = parseInt(seconds, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours > 0) {
            return hours + "h";
        } else if (minutes > 0) {
            return minutes + "m"
        } else if (seconds > 0) {
            return seconds + "s"
        }
    }

    render() {

        console.log("VISITED SITES", this.state.visitedSites);
        return (
            <Card className="widget site-history-widget">
                <p className="title">VISITED SITES</p>
                <p className="subtitle">Automatically track all your recent sites.</p>

                <CardBody>
                         <Table className="site-table" striped>
                            <col width="30px" />
                            <col width="60px" />
                            <col width="60%" />
                            <thead>
                                <tr>
                                    <th>%</th>
                                    <th>Time</th>
                                    <th>Activity</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                            {this.renderAllRows()}
                            </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const visitedSitesList = _.map(state.dashboard.visitedSites, (val, uid) => {
        return { ...val, uid };
    });

    return { visitedSites: visitedSitesList };
}

export default connect(mapStateToProps, actions)(SiteHistoryWidget);
