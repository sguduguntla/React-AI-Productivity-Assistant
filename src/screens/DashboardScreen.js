import React, { Component } from 'react';
import { Button, Input, Form, FormGroup, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import TodoWidget from '../components/todo_widget/TodoWidget';
import AnalyticsWidget from '../components/analytics_widget/AnalyticsWidget';
import osascript from 'node-osascript';
import * as actions from '../actions';
import SiteHistoryWidget from '../components/site_history_widget/SiteHistoryWidget';
import WorkScheduleWidget from '../components/work_schedule_widget/WorkScheduleWidget';

import { ipcRenderer } from 'electron';

class DashboardScreen extends Component {

    constructor(props) {
        super(props);

        console.log("GFSGFGDF");
        ipcRenderer.send('start', "Hi");

        ipcRenderer.on('addWebsiteVisitedTime:data', (e, { currentTab, visitTime }) => {
            this.props.addWebsiteVisitedTime({ currentTab, visitTime });
        });
        //this.props.addWebsiteVisitedTime();
    }

    render() {
        return (
            <div>
                <TodoWidget />
                <SiteHistoryWidget />
            
               <AnalyticsWidget />
               <WorkScheduleWidget />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { dashboard: state.dashboard };
}

export default connect(mapStateToProps, actions)(DashboardScreen);
