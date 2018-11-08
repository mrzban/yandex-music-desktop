const electron = require('electron');
const {
    ipcRenderer
} = require('electron');
const {
    dialog
} = require('electron').remote;
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
var popup;
var redirect = true;
var popNeedRefresh = false;
document.isLogged = false;
var myWindow;



var showError = console.error;
console.error = function (message, ...optionalparameters) {
    var mesg = "";
    if (message) mesg = message;
    if (optionalparameters.indexOf('adblock') >= 0) {
        console.log("No adblocker!")
    } else { //console.log("err")
        showError(mesg, optionalparameters);
    }
};




// On popUp close timer
var timerA = setInterval(function () {
    try {
        if (popup.closed) {
            popup = undefined;
            isLoggedIn();
            //clearInterval(timer); 
        }
    } catch (e) {}
}, 100);



var oldopen = window.open;
window.open = function (url, target, features, replace) {
    this.console.log(url);

    function applyMiddleware(win) {
        popup = win;
        popNeedRefresh = true;
        return win
    }

    return applyMiddleware(oldopen(url, target, features, replace));

};



window.sendToElectron = function (channel) {
    ipcRenderer.send(channel)
}



document.insertCSS = function (style) {
    var css = this.createElement("style");
    css.type = "text/css";
    css.innerHTML = style;
    this.body.appendChild(css);

}

document.tagsFromString = function (str) {
    const oldbody = document.body.innerHTML;
    document.body.innerHTML = str + oldbody;
};

document.refresh = function () {
    window.location.reload();
}

function isLoggedIn() {

    myWindow = oldopen("https://passport.yandex.ru/", '', "location=yes, status=no, width=4,height=10,left=20,top=40,visible=none");
    myWindow.blur();
}





document.addEventListener('DOMContentLoaded', () => {
    document.insertCSS("body::-webkit-scrollbar { width: 0 !important; }");
    var siteName = window.location.href;

    // Logged in hack
    if (siteName.includes('https://passport.yandex.ru/auth?retpath')) {
        window.close();
    }

    if (siteName.includes('https://passport.yandex.ru/profile')) {
        window.sendToElectron('set-logged-in');
        window.close();
    }
    // Logged in hack


    if (siteName.includes('https://music.yandex.ru')) {
        mainWindow = window;
        document.insertCSS(fs.readFileSync(path.join(__dirname, '/app/css/hack.css'), 'utf8'));
        document.insertCSS(fs.readFileSync(path.join(__dirname, '/app/css/style.css'), 'utf8'));
        document.insertCSS(fs.readFileSync(path.join(__dirname, '/app/css/images.css'), 'utf8'));
    }

});


