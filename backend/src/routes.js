const version = require('./controller/version.js');
const callback = require('./controller/callback.js');
const contacts = require('./controller/contacts.js');

const event = require('./controller/event.js');
const jssdk = require('./controller/jssdk.js');
const authMini = require('./controller/authMini.js');

module.exports = app => {
  const routes = [
    // version
    { method: 'post', path: 'version/update', controller: version, middlewares: 'inner' },
    { method: 'post', path: 'version/init', controller: version, middlewares: 'inner' },
    { method: 'post', path: 'version/test', controller: version, middlewares: 'test' },
    // message
    { method: 'post', path: 'callback/index', controller: callback, middlewares: 'dingtalk', meta: { auth: { enable: false } } },
    { method: 'post', path: 'callback/registerList', controller: callback, middlewares: 'dingtalk', meta: { auth: { enable: false } } },
    // contacts
    { method: 'post', path: 'contacts/sync', controller: contacts, meta: { right: { type: 'function', name: 'contacts' } } },
    // queue
    { method: 'post', path: 'contacts/queue', controller: contacts, middlewares: 'inner,transaction,dingtalk',
      meta: { auth: { enable: false } },
    },

    // jsapi
    { method: 'post', path: 'jssdk/jsconfig', controller: jssdk, middlewares: 'wxwork' },
    { method: 'post', path: 'jssdk/jsconfigAgent', controller: jssdk, middlewares: 'wxwork' },
    // event
    { method: 'post', path: 'event/loginInfo', controller: event, middlewares: 'inner', meta: { auth: { enable: false } } },

    // authMini
    { method: 'post', path: 'authMini/login', controller: authMini, middlewares: 'wxwork', meta: { auth: { enable: false } } },

  ];
  return routes;
};
