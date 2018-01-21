import React, { Component } from 'react';
import { Button, Input, Form, FormGroup, Label, Card, CardText, CardBody, CardTitle, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ReactHighcharts from 'react-highcharts'; // Expects that Highcharts was loaded in the code.
import _ from 'lodash';
import moment from 'moment';
import classnames from 'classnames';
import { productivityPieChart } from './productivity_piechart_config';
import { visitedSitesPieChart } from './visited_sites_piechart_config';

class AnalyticsWidget extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            numUnproductive: 0,
            numProductive: 0,
            visitedSitesMinutes: [],
            activeTab: '1'
        };

       
    }

    componentWillMount() {
        const date = moment().format('YYYY-MM-DD');
        this.props.fetchVisitedSites({ date });
    }

    componentWillReceiveProps(nextProps) {
                
        let numProductive = 0;
        let numUnproductive = 0;

        let totalVisitedSitesTime = 0;

        nextProps.visitedSites.forEach(site => {
            totalVisitedSitesTime += site.visitTime;

            if (site.unproductive) {
                numUnproductive++;
            } else {
                numProductive++;
            }
        });

        let { visitedSites } = nextProps;

        visitedSites.sort((a, b) => {
            return b.visitTime - a.visitTime;
        });

        const maxSites = 5;

        let visitedSitesMinutes = [];

        let topVisitedSitesTime = 0;

        for(var i = 0; i < visitedSites.length; i++) {

            if (i < maxSites) {
                const site = visitedSites[i];

                topVisitedSitesTime += site.visitTime;

                const httpIndex = site.link.indexOf("://");
                
                let dotIndex = site.link.indexOf(".com");
                let ext = ".com";

                if (dotIndex == -1) {
                    dotIndex = site.link.indexOf('.org');
                    ext = "org";

                    if (dotIndex == -1) {
                        dotIndex = site.link.indexOf(".io");
                        ext = ".io";
                    }
                }
    
                const shortenedLink = site.link.substring(httpIndex + 3, dotIndex) + ext;
                
                if (i == 0) {
                   visitedSitesMinutes.push({
                        name: shortenedLink,
                        y: site.visitTime,
                        sliced: true,
                        selected: true
                   });
                } else {
                    visitedSitesMinutes.push({
                        name: shortenedLink,
                        y: site.visitTime
                    });
                }
                
            } else {
                visitedSitesMinutes.push({
                    name: "Other",
                    y: totalVisitedSitesTime - topVisitedSitesTime
                });

                break;
            }
           
        }

        this.setState({ ...this.state, numUnproductive, numProductive, visitedSitesMinutes });

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    
    render() {
        productivityPieChart.series[0].data[0].y = this.state.numProductive;
        productivityPieChart.series[0].data[1].y = this.state.numUnproductive;

        visitedSitesPieChart.series[0].data = this.state.visitedSitesMinutes;

        return (
            
                    <div>
                        <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            >
                            Productivity Levels
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            >
                            Visited Sites
                            </NavLink>
                        </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Card className="widget">
                                    <CardBody>
                                        <CardTitle>Productivity Levels</CardTitle>
                                        <ReactHighcharts config={productivityPieChart} ref="chart"></ReactHighcharts>               
                                    </CardBody>
                                 </Card>
                            </TabPane>
                            <TabPane tabId="2">
                                <Card className="widget">
                                    <CardBody>
                                        <CardTitle>Top Visited Sites</CardTitle>
                                        <ReactHighcharts config={visitedSitesPieChart} ref="chart"></ReactHighcharts>               
                                    </CardBody>
                                </Card>
                            </TabPane>
                        </TabContent>
                    </div>
        );
    }
}

const mapStateToProps = state => {
    const visitedSitesList = _.map(state.dashboard.visitedSites, (val, uid) => {
        return { ...val, uid };
    });

    return { visitedSites: visitedSitesList };
}

export default connect(mapStateToProps, actions)(AnalyticsWidget);
