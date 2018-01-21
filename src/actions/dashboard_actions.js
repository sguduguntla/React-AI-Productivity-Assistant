import firebase from 'firebase';
import moment from 'moment';
import { ADD_WEBSITE_VISITED_TIME, FETCH_VISITED_SITES_SUCCESS } from './types';
import { ipcRenderer } from 'electron';
import _ from 'lodash';
import { sites } from './unproductive_sites';

export const addWebsiteVisitedTime = ({ currentTab, visitTime }) => dispatch => {
    
        const { currentUser } = firebase.auth();

        const tabHashCode = currentTab.hashCode();
    
        const todayDate = moment().format('YYYY-MM-DD');
    
        const { unproductiveSites } = sites;
        
        let unproductive = false;
    
        unproductiveSites.forEach(site => {
            if (currentTab.includes(site)) {
               unproductive = true;
               return;
            }
        });
    
        let oldVisitTime = 0;
    
        firebase.database().ref(`/users/${currentUser.uid}/days/${todayDate}/visited/${tabHashCode}/visitTime`).once('value', snapshot => {
            oldVisitTime = snapshot.val()

            let totalTime = 0;

            firebase.database().ref(`/users/${currentUser.uid}/days/${todayDate}/visited/`).once('value', snapshot => {
                const visitedSitesList = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });

                visitedSitesList.forEach((site) => {
                    totalTime += site.visitTime;
                });

                const newVisitTime = oldVisitTime + visitTime;
                let percentage = 0;

                if (totalTime == 0) {
                    percentage = 100;
                } else {
                    percentage = Math.floor((newVisitTime / totalTime) * 100);
                }

                console.log("TOTAL TIME", totalTime);

                firebase.database().ref(`/users/${currentUser.uid}/days/${todayDate}/visited/${tabHashCode}`).set({ link: currentTab, visitTime: newVisitTime, unproductive, percentage  }).then(() => {
    
                    visitedSitesList.forEach((site) => {
                        const sitePercentage = Math.floor((site.visitTime / totalTime) * 100);

                        const siteHashCode = site.link.hashCode();

                        firebase.database().ref(`/users/${currentUser.uid}/days/${todayDate}/visited/${siteHashCode}/percentage`).set(sitePercentage);
                    });

                    dispatch({
                       type: ADD_WEBSITE_VISITED_TIME
                    });
                   
                    console.log("Added website visit time for: ", currentTab);
               });
            
            });
        });
    
};

export const fetchVisitedSites = ({ date }) => dispatch => {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref(`/users/${user.uid}/days/${date}/visited`).on('value', snapshot => {
                console.log("SNAPSHOT", snapshot.val());
                dispatch({ type: FETCH_VISITED_SITES_SUCCESS, payload: snapshot.val() || {} });
            });
        }
    });
}

export const updateVisitedSitesPercentage = () => dispatch => {
    const todayDate = moment().format('YYYY-MM-DD');



    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref(`/users/${user.uid}/days/${todayDate}/visited`).on('value', snapshot => {
                console.log("SNAPSHOT", snapshot.val());
                dispatch({ type: FETCH_VISITED_SITES_SUCCESS, payload: snapshot.val() || {} });
            });
        }
    });
}

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};