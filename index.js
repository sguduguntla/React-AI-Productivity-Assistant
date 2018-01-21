const electron = require('electron');
const firebase = require('firebase');
const osascript = require('node-osascript');
const _ = require('lodash');
const moment = require('moment');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
let currentTab = runAppleScript(true) || "";
let visitTime = 0;

app.on('ready', () => {
    const screen = electron.screen.getPrimaryDisplay();
    const {width, height} = screen.size;

    // const config = {
    //     apiKey: "AIzaSyD-wUQCtIdu3UCuSZI0IG8wyLiIvqetn6A",
    //     authDomain: "ai-productivity-assistant.firebaseapp.com",
    //     databaseURL: "https://ai-productivity-assistant.firebaseio.com",
    //     projectId: "ai-productivity-assistant",
    //     storageBucket: "ai-productivity-assistant.appspot.com",
    //     messagingSenderId: "412582784739"
    // };

    // firebase.initializeApp(config);

    mainWindow = new BrowserWindow({
        height,
        width,
        webPreferences: {
            backgroundThrottling: false
        }
    });

    mainWindow.setMinimumSize(Math.ceil(width / 2), Math.ceil(height / 1.2));

    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

});

ipcMain.on('start', () => calculateWebsiteTime());


function calculateWebsiteTime() {
    setInterval(() => {
        runAppleScript(false);
    }, 1000);
}

function runAppleScript(isFirstTime) {
   osascript.executeFile(`${__dirname}/src/applescripts/active_tab_script.scpt`, function(err, result, raw) {
       if (err) {
           return console.error("ERR", err)
       }

       visitTime++;
       console.log(result, currentTab, visitTime);

       if (result !== currentTab && !isFirstTime) {
          
           console.log("Tab changed", result);
           
           if (result && currentTab !== "") {
               mainWindow.webContents.send("addWebsiteVisitedTime:data", { currentTab, visitTime });
               //doFirebaseStuff({ currentTab, visitTime });
           }
           
           currentTab = result;
           visitTime = 0;
       }
   });
}

// function doFirebaseStuff({ currentTab, visitTime }) {
//         const { currentUser } = firebase.auth();

//         const tabHashCode = currentTab.hashCode();
    
//         const todayDate = moment().format('YYYY-MM-DD');
        
//         let unproductive = false;
    
//         unproductiveSites.forEach(site => {
//             if (currentTab.includes(site)) {
//                unproductive = true;
//                return;
//             }
//         });
    
//         let oldVisitTime = 0;
    
//         firebase.database().ref(`/users/${currentUser.uid}/days/${todayDate}/visited/${tabHashCode}/visitTime`).once('value', snapshot => {
//             oldVisitTime = snapshot.val()

//             let totalTime = 0;

//             firebase.database().ref(`/users/${currentUser.uid}/days/${todayDate}/visited/`).once('value', snapshot => {
//                 const visitedSitesList = _.map(snapshot.val(), (val, uid) => {
//                     let obj = { uid };
//                     obj.link = val.link;
//                     obj.percentage = val.percentage;
//                     obj.unproductive = val.unproductive;
//                     obj.visitTime = val.visitTime;
//                     return obj;
//                 });

//                 visitedSitesList.forEach((site) => {
//                     totalTime += site.visitTime;
//                 });

//                 const newVisitTime = oldVisitTime + visitTime;
//                 let percentage = 0;

//                 if (totalTime == 0) {
//                     percentage = 100;
//                 } else {
//                     percentage = Math.floor((newVisitTime / totalTime) * 100);
//                 }

//                 console.log("TOTAL TIME", totalTime);

//                 firebase.database().ref(`/users/${currentUser.uid}/days/${todayDate}/visited/${tabHashCode}`).set({ link: currentTab, visitTime: newVisitTime, unproductive, percentage  }).then(() => {
    
//                     visitedSitesList.forEach((site) => {
//                         const sitePercentage = Math.floor((site.visitTime / totalTime) * 100);

//                         const siteHashCode = site.link.hashCode();

//                         firebase.database().ref(`/users/${currentUser.uid}/days/${todayDate}/visited/${siteHashCode}/percentage`).set(sitePercentage);
//                     });

//                     dispatch({
//                        type: ADD_WEBSITE_VISITED_TIME
//                     });
                   
//                     console.log("Added website visit time for: ", currentTab);
//                });
            
//             });
//         });
// }


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