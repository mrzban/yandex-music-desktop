const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {

  //Setup minimise button
  var buttonBack = document.getElementById('btn-back')

  buttonBack.addEventListener('click', function() {

    // alert(webview.getURL())
    ipcRenderer.send('go-back');
  })

  //Setup minimise button
  var buttonForward = document.getElementById('btn-forward')

  buttonForward.addEventListener('click', function() {
    ipcRenderer.send('go-forward');
  })

  //Setup minimise button
  var buttonHide = document.getElementById('btn-hide')

  buttonHide.addEventListener('click', function() {
    ipcRenderer.send('button-press-hide');
  })

  //Setup close button
  var buttonClose = document.getElementById('btn-close')

  buttonClose.addEventListener('click', function() {
    // ipcRenderer.send('button-press-close', 'Close the app')
    ipcRenderer.send('button-press-close');
  })

  //Prevent menu bar from being selectable with mouse click + drag
  var unFocus = function() {
    if (document.selection) {
      document.selection.empty()
    } else {
      window.getSelection().removeAllRanges()
    }
  }

  document.getElementById('menu').onmousemove = function() {
    unFocus()
  }

  document.getElementById('menu').onmouseup = function() {
    unFocus()
  }

});
