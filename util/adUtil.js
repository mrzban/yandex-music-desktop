const {
  session
} = require('electron');


function adManager() {
  var toFilter = ['facebook.com/tr', 'google', 'an.yandex.ru', 'adfox', 'awaps.yandex.ru', 'mc.yandex.ru',
    'yastatic.net/safeframe', 'yandex.ru/clck/click', 'lakla.ru', 'recreativ.ru', 'ymetrica.com', 'linama.ru', 'diksin.ru',
    'gfaro.ru', 'faradpo.ru', 'cloudfront.net/metrika', 'csp.yandex.net/csp', '101sloth', 'yastatic.net/pcode', 'awaps-ad',
    'vakla.ru', "sandbox.music.yandex.net/script/gtag", 'music.yandex.ru/blocks/footer-app-install', 'clck.yandex.ru/counter',
    'trabe.ru', 'gtag.js'

  ]

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36";
    callback({
      cancel: false,
      requestHeaders: details.requestHeaders
    });
  });



  session.defaultSession.webRequest.onBeforeRequest(['*://*./*'], function (details, callback) {
    var test_url = details.url;
    //var result = /google/.test(test_url);


    var result = test_url.hasElementOf(toFilter);
    if (result) {

      console.log("site blocked: " + test_url)
      callback({
        cancel: true
      });
    } else {
      callback({
        cancel: false
      })
    }


  });

}

module.exports.adManager = adManager;